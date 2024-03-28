import React, { PureComponent } from 'react';
import { recommendOptions } from './options';
import { ScrollBoard } from '@jiaminghi/data-view-react';
import { connect } from 'dva';
import { TitleStyle, LeftBottom } from '../style';

class RecommendList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedContent: null, // 存储选中的内容
      config: {
        // 表头背景色
        headerBGC: '#443dc5',
        // 奇数行背景色
        oddRowBGC: '#09184F',
        // 偶数行背景色
        evenRowBGC: '#070C34',
        // 行号
        index: true,
        // 行号表头
        // indexHeader: '序号',
        // 宽度
        columnWidth: [78, 450],
        // 对其方式
        align: ['center'],
        // 表行数
        rowNum: 10,
      },
    };
  }

  handleSelectTitle = (selectedItem) => {
    // 假设selectedItem是被选中的项目对象，包含title和content
    this.setState({ selectedContent: selectedItem.content });
    console.log(selectedItem.title);
    // 发送POST请求到后端
    fetch('http://127.0.0.1:5000/api/getRecommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: selectedItem.title }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Recommendations:', data.recommendations);
        // 可以根据需要做进一步处理，比如更新状态以显示推荐列表
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.props.dispatch({
      type: 'global/TOGGLE_LEFT_DETAIL_COMPONENT',
      payload: selectedItem, // 这里的item是被点击的项目数据
    });
  };

  showModalWithContent = () => {
    // 显示模态框的逻辑，展示this.state.selectedContent
    console.log(111);
  };



  render() {
    const { recommendSitua, showDetails } = this.props;

    // 安全检查recommendSitua及其data属性
    const safeData = recommendSitua && recommendSitua.data ? recommendSitua.data : [];

    // 根据showDetails的状态决定渲染逻辑
    return (
      <div>
        {showDetails ? (
          // 当showDetails为true时，渲染一个可以滚动的内容列表
          <LeftBottom >
            <div className="left-bottom">
              {safeData.map((item, index) => (
                <TitleStyle key={index} onClick={() => this.handleSelectTitle(item)}>
                  <h6>{item.title}</h6>
                  {/* 其他需要渲染的内容 */}
                </TitleStyle>
              ))}
            </div>
          </LeftBottom>
        ) : (
          // 当showDetails为false时，使用ScrollBoard组件
          <ScrollBoard
            config={{
              ...this.state.config,
              // 根据recommendOptions转换recommendSitua为需要的配置
              ...recommendOptions(recommendSitua),
            }}
            style={{
              width: '5.475rem',
              height: '6.875rem',
            }}>
          </ScrollBoard>
        )}
      </div>
    );
  }

  // return (
  //   <div>
  //     {recommendSitua ? (
  //       <ScrollBoard
  //         config={config}
  //         style={{
  //           width: '5.475rem',
  //           height: '6.875rem',
  //         }}>
  //         <button onClick={this.showModalWithContent}>查看选中内容</button>
  //       </ScrollBoard>
  //     ) : (
  //       ''
  //     )}
  //   </div>
  // );

}

const mapStateToProps = (state) => ({
  showDetails: state.global.showDetails,
  showLeftTopComponent: state.global.showLeftTopComponent,
  selectedItem: state.global.selectedItem, // 从全局状态中获取选中的项目数据
  // 其他状态...
});

export default connect(mapStateToProps)(RecommendList);


// export default RecommendList;
