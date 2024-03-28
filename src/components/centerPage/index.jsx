import React, { PureComponent } from 'react';
import { CenterPage, CenterBottom, StyledBorderBox12 } from './style';
import Map from './charts/Map';
import { connect } from 'dva';
import { BorderBox12 } from '@jiaminghi/data-view-react';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initshow: props.selectedItemContent
    };
  }

  // 定义点击事件处理函数
  handleItemClick = (item) => {
    // 在这里执行点击后的逻辑
    console.log(item.title + ' clicked');
    // 或者，你可以根据项目需求进行其他操作，比如状态更新、页面跳转等
    // 触发action来切换显示状态
    this.props.dispatch({
      type: 'global/TOGGLE_LEFT_TOP_COMPONENT',
      payload: item, // 这里的item是被点击的项目数据
      initshow: this.state.selectedItemContent,
    });
  };

  render() {
    const { detailsList, mapData, selectedItemContent } = this.props;
    let contentToDisplay;
    if (selectedItemContent) {
      contentToDisplay = (
        <BorderBox12>
          <StyledBorderBox12>
            <div className='center-bottom' style={{
              width: '11.725rem',
              height: '8.025rem',
            }}
              dangerouslySetInnerHTML={{ __html: selectedItemContent }} />
          </StyledBorderBox12>
        </BorderBox12>

      );
    } else {
      // Otherwise, render the Map
      contentToDisplay = <Map mapData={mapData} />;
    }
    return (
      <CenterPage>
        {contentToDisplay}
        <CenterBottom>
          <div className='detail-list'>
            {detailsList
              ? detailsList.map((item, index) => {
                return (
                  <div
                    className='detail-list-item'
                    key={index}
                    onClick={() => this.handleItemClick(item)} // 添加点击事件处理器
                  >
                    <img
                      src={require(`../../assets/images/center-details-data${index + 1
                        }.png`)}
                      alt={item.title}
                    />
                    <div className='detail-item-text'>
                      <h3>{item.title}</h3>
                      <span>{item.number}</span>
                      <span className='unit'>{item.unit}</span>
                    </div>
                  </div>
                );
              })
              : ''}
          </div>
        </CenterBottom>

      </CenterPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    detailsList: state.centerPage.detailsList,
    mapData: state.centerPage.mapData,
    showLeftTopComponent: state.global.showLeftTopComponent,
    selectedItemContent: state.global.selectedItemContent, // 从全局状态获取选中项内容
  };
};

// const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps)(index);
