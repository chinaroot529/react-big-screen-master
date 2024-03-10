import request from '../utils/request';
import staticData from '../../mock/staticData'; // 导入静态数据
// 获取左侧界面数据请求
// export const getLeftPageData = async () => {
//   return request('/api/leftPageData').then(response => {
//     console.log(response.data);
//     return response.data;
//   });
// };


export const getLeftPageData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/leftPageData');
    if (!response.ok) { // 如果响应状态码不在200-299范围
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // 等待数据转换完成
    console.log(data);
    return data; // 返回获取到的数据
  } catch (error) {
    console.error("Failed to fetch left page data from backend, using static data instead.", error);
    return staticData['GET /api/leftPageDatas']; // 使用静态数据作为备份
  }
};




// 获取中间界面数据请求
export const getCenterPageData = async () => {
  return request('/api/centerPageData').then(response => {
    return response.data;
  });
};

// 获取右侧界面数据请求
export const getRightPageData = async () => {
  return request('/api/rightPageData').then(response => {
    return response.data;
  });
};
