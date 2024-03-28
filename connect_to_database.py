#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar  1 10:44:26 2024

@author: zhuidexiaopengyou
"""

from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)
CORS(app)

def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='xjhxjhxjh520',
            database='hjai',
        )
        return connection
    except Error as e:
        print(f"The error '{e}' occurred")

def preprocess_titles(titles,keywords_to_remove):
    """
    预处理标题列表，移除特定的关键词
    """
    # 定义要移除的关键词列表
    # remove_keywords = ['最高法院发布', '最高人民法院发布','案例','典型案例']
    
    # 移除关键词
    processed_titles = []
    for title in titles:
        for keyword in keywords_to_remove:
            title = title.replace(keyword, '')
        processed_titles.append(title.strip())
    
    return processed_titles

def calculate_similarity_tfidf(input_title, titles):
    """
    使用TF-IDF和余弦相似度计算相似度
    input_title: 用户点击的标题
    titles: 数据库中的所有标题列表
    """
    # 预处理输入标题和所有标题以移除特定的关键词
    keywords_to_remove = ['最高法院发布', '最高人民法院发布','案例','典型案例']
    titles = preprocess_titles(titles, keywords_to_remove)
    input_title = preprocess_titles([input_title], keywords_to_remove)[0]
    
    # 添加输入标题到标题列表中，以便它也被向量化
    titles_with_input = titles + [input_title]
    
    # 计算TF-IDF矩阵
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(titles_with_input)
    
    # 计算余弦相似度
    cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix)
    
    # 获取最相似的标题的索引（除了最后一个，因为它是输入标题本身）
    similar_indices = cosine_similarities.argsort()[0][-2::-1]  # 修改处：取相似度最高的前十个结果
    
    # 获取相似度得分
    similar_scores = np.sort(cosine_similarities[0])[-2::-1]  # 修改处：取相似度最高的前十个相似度得分
    
    # 提取相似的标题和相应的相似度得分
    similar_titles_scores = [(titles_with_input[i], similar_scores[i]) for i in similar_indices]
    
    return similar_titles_scores[:10]  # 修改处：确保只返回前十个结果


@app.route('/api/leftPageData', methods=['GET'])
def get_left_page_data():
    connection = create_db_connection()
    if connection is not None:
        cursor = connection.cursor(dictionary=True)
        try:
            # 查询标题和对应的内容
            cursor.execute("SELECT Title, Content FROM Cases")  # 'Cases' 是你的表名
            rows = cursor.fetchall()
            # 从数据库中提取所有标题和内容
            titles_and_contents = [{'title': row['Title'], 'content': row['Content']} for row in rows]
        except Error as e:
            print(f"An error occurred: {e}")
            titles_and_contents = []  # 如果查询失败，使用空列表作为回退
        finally:
            cursor.close()
            connection.close()
    else:
        titles_and_contents = []  # 如果数据库连接失败，也使用空列表作为回退

    # 构建和返回期望的JSON结构，包括静态数据和动态查询到的标题及内容数据
    return jsonify({
        'accessFrequency': 1500,
        'peakFlow': 500,
        'trafficSitua': {
            'timeList': ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
            'outData': [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
            'inData': [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
        },
        'recommendSitua': {
            'data': [{'title': row['Title'], 'content': row['Content']} for row in rows]  # 包含标题和内容的列表
        }
    })

@app.route('/api/getRecommendations', methods=['POST'])
def get_recommendations():
    input_title = request.json.get('title')  # 从请求体中获取标题
    
    # 获取数据库中的所有标题
    titles = []  # 假设这是一个从数据库获取的标题列表
    connection = create_db_connection()
    if connection is not None:
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT Title FROM Cases")  # 只选择Title
            rows = cursor.fetchall()
            titles = [row[0] for row in rows]  # 提取标题
        except Error as e:
            print(f"An error occurred: {e}")
        finally:
            cursor.close()
            connection.close()
    
    # 计算相似度并获取推荐列表
    recommendations = calculate_similarity_tfidf(input_title, titles)
    
    return jsonify({'recommendations': recommendations})


# 为了简化示例，省略了更新和删除接口的实现

if __name__ == '__main__':
    app.run(debug=True)
