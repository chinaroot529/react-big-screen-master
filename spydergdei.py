import requests
from bs4 import BeautifulSoup

def fetch_urls(url):
    # 发送请求并获取网页内容
    try:
        response = requests.get(url)
        response.raise_for_status()  # 确保请求成功
    except requests.RequestException as e:
        print(f"请求错误: {e}")
        return
    
    # 使用BeautifulSoup解析网页
    soup = BeautifulSoup(response.text, 'html.parser')

    # 查找所有的<a>标签
    links = soup.find_all('a')

    # 提取链接
    urls = [link.get('href') for link in links if link.get('href') is not None]
    
    # 打印链接
    for url in urls:
        print(url)

# 使用示例
if __name__ == "__main__":
    target_url = "https://www.gdei.edu.cn/"  # 替换成你想要爬取的网页地址
    fetch_urls(target_url)
