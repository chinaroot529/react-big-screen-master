import React, { PureComponent } from 'react';
import { LeftPage, LeftTopBox, LeftBottomBox, LeftBottom } from './style';
import { ModuleTitle } from '../../style/globalStyledSet';
import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
import TrafficSituation from './charts/TrafficSituation';
import { connect } from 'dva';
import RecommendList from './charts/RecommendList';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLeftTopComponent: true, // 默认显示上部组件
      selectedItemContent: props.showLeftTopComponent[1], // 初始时没有选中的项目
    };
  }

  render() {
    const { recommendSitua, trafficSitua, accessFrequency, peakFlow } = this.props;
    const { showLeftTopComponent, showDetails, selectedItem } = this.props; // 从状态中获取控制变量
    return (
      <LeftPage>
        {showLeftTopComponent && (
          <LeftTopBox>
            {/* 顶部图表 */}
            <BorderBox12 className='left-top-borderBox12'>
              <div className='left-top'>
                <ModuleTitle>
                  <i className='iconfont'>&#xe78f;</i>
                  <span>今日平台访问流量态势</span>
                </ModuleTitle>
                <div className='title-dis'>
                  <span>
                    平均访问次数(小时):
                    <span className='title-dis-keyword'>{accessFrequency}次</span>
                  </span>
                  <span>
                    流量峰值:
                    <span className='title-dis-keyword'>{peakFlow}M</span>
                  </span>
                </div>
                {/* 图表 */}
                <TrafficSituation trafficSitua={trafficSitua}></TrafficSituation>
              </div>
            </BorderBox12>
          </LeftTopBox>
        )}
        {/* 底部图表 */}
        {showDetails ? (
          <LeftBottom showDetails={!this.props.showLeftTopComponent}>
            <BorderBox13 className='left-bottom-borderBox13'>
              <div className='left-bottom'>
                <ModuleTitle>
                  <i className='iconfont'>&#xe88e;</i>
                  <span>{selectedItem.title}</span>
                </ModuleTitle>
                {/* 图表 */}
                <RecommendList recommendSitua={recommendSitua}></RecommendList>
              </div>
            </BorderBox13>
          </LeftBottom>
        ) : (
          <LeftBottomBox showDetails={!this.props.showLeftTopComponent}>
            <BorderBox13 className='left-bottom-borderBox13'>
              <div className='left-bottom'>
                <ModuleTitle>
                  <i className='iconfont'>&#xe88e;</i>
                  <span>经典案例推送</span>
                </ModuleTitle>
                {/* 图表 */}
                <RecommendList recommendSitua={recommendSitua}></RecommendList>
              </div>
            </BorderBox13>
          </LeftBottomBox>
        )}




      </LeftPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessFrequency: state.leftPage.accessFrequency,
    peakFlow: state.leftPage.peakFlow,
    recommendSitua: state.leftPage.recommendSitua,
    trafficSitua: state.leftPage.trafficSitua,
    showLeftTopComponent: state.global.showLeftTopComponent,
    showDetails: state.global.showDetails,
    selectedItem: state.global.selectedItem, // 从全局状态中获取选中的项目数据
    selectedItemContent: state.global.selectedItemContent, // 从全局状态获取选中项内容
  };
};

// const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps)(index);
