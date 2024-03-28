import styled from 'styled-components';

export const LeftPage = styled.div`
  width: 6.25rem;
  height: auto;
  padding: 0.2rem;
  padding-bottom: 0px;
`;

export const LeftTopBox = styled.div`
  position: relative;
  height: 4.375rem;
  width: 100%;
  .left-top-borderBox12 {
    width: inherit;
    height: inherit;
    padding: 0.1875rem;
    .left-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .title-dis {
        margin-top: 0.1875rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.2rem;
        color: #c0c9d2;
        &-keyword {
          padding-left: 0.125rem;
          color: #47dae8;
        }
      }
    }
  }
`;

export const LeftBottomBox = styled.div`
  position: relative;
  margin-top: 0.25rem;
  height: ${({ showDetails }) => (showDetails ? 'auto' : '7.75rem')}; // 这里使用auto来自动适应内容的高度
  width: 100%;
  overflow: hidden; // 可能需要隐藏溢出的内容

  .left-bottom-borderBox13 {
    width: 100%; // 使用100%代替inherit来避免继承问题
    height: 100%; // 同上
    border: none; // 确保没有额外的边框
    padding: 0.25rem; // 移除padding
    box-sizing: border-box;

    .left-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      overflow-y: auto; // 添加滚动条
      box-sizing: border-box;
    }
  }
`;


export const LeftBottom = styled(LeftBottomBox)`
  margin-top: -0.05rem;
  width: 5.75rem;
  height: 12.35rem; // 如果您想要一个固定的高度
`;


export const TitleStyle = styled.div`
  position: relative;
  font-size: 0.2rem;
  color: #c0c9d2;
  width: 5.75rem;
  height: auto;
  padding: 0.25rem;
  color: #c0c9d2; // 假设文字颜色，根据需要调整
  
  &:nth-child(odd) {
    background-color: #09184F; // 奇数行背景色
  }
  &:nth-child(even) {
    background-color: #070C34; // 偶数行背景色
  }
`;