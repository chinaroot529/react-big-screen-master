import styled from 'styled-components';

export const CenterPage = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledBorderBox12 = styled.div`
  width: 11.725rem;
  height: 8.025rem;
  border-radius: 10px; // 圆角边框
  overflow: hidden; // 防止内容溢出
  color: #c0c9d2; // 文本颜色
  margin-top: 0.275rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-bottom {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(19, 25, 47, 0.6);
    overflow-y: auto; // 添加滚动条
    box-sizing: border-box;
    padding: 20px;
    margin-left:-10px;
    margin-right:-10px;
  }
`;


export const CenterBottom = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
  margin-top: 0.875rem;
  width: 100%;
  height: 3.25rem;
  .detail-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;
    justify-content: space-around;
    width: 100%;
    &-item {
      display: flex;
      align-items: center;
      position: relative;
      height: 1.5625rem;
      padding: 0 0.125rem;
      width: 32%;
      border-radius: 5px;
      border: 1px solid #343f4b;
      background-color: rgba(19, 25, 47, 0.8);
      img {
        width: 1.25rem;
        height: 1.25rem;
      }
      .detail-item-text {
        margin-left: 0.125rem;
        h3 {
          color: #bcdcff;
          font-size: 16px;
          margin-bottom: 0.25rem;
        }
        span {
          font-weight: 500px;
          font-size: 0.25rem;
          font-weight: bolder;
          background: linear-gradient(to bottom, #fff, #4db6e5);
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .unit {
          font-size: 0.2rem;
          margin-left: 0.125rem;
        }
      }
    }
  }
`;
