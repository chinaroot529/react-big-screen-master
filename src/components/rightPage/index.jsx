import React, { PureComponent } from 'react';
import { BorderBox13 } from '@jiaminghi/data-view-react';
import BrowseCategories from './charts/BrowseCategories';
import UserIdentityCategory from './charts/UserIdentityCategory';
import OfflinePortal from './charts/OfflinePortal';
import { ModuleTitle } from '../../style/globalStyledSet';
import { connect } from 'dva';
import {
  RightPage,
  RightTopBox,
  RightCenterBox,
  RightBottomBox,
} from './style';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLeftTopComponent: true, // 默认显示上部组件
      selectedItem: null, // 初始时没有选中的项目
    };
  }
  render() {
    const { offline, browseCategories, userIdentityCategory, showLeftTopComponent } = this.props;
    return (
      <RightPage>
        {showLeftTopComponent && (<RightTopBox>
          <div className='right-top'>
            <ModuleTitle>
              <i className='iconfont'>&#xe7f7;</i>
              <span>关联数据类别分布</span>
            </ModuleTitle>
            <div className='right-top-content'>
              <BrowseCategories
                browseCategories={browseCategories}></BrowseCategories>
              <img
                alt='地球'
                className='earth-gif'
                src={require('../../assets/images/earth-rotate.gif')}
              />
            </div>
          </div>
        </RightTopBox>)}


        {showLeftTopComponent && (<RightCenterBox>
          <ModuleTitle>
            <i className='iconfont'>&#xe7fd;</i>
            <span>平均用户类别排布</span>
          </ModuleTitle>
          <UserIdentityCategory
            userIdentityCategory={userIdentityCategory}></UserIdentityCategory>
        </RightCenterBox>)}


        {showLeftTopComponent && (<RightBottomBox>
          <BorderBox13 className='right-bottom-borderBox13'>
            <div className='right-bottom'>
              <ModuleTitle>
                <i className='iconfont'>&#xe790;</i>
                <span>今日新增文书数量</span>
              </ModuleTitle>
              {/* 反馈 */}
              {/* <div className='feedback-box'>
                {offline
                  ? offline.feedback.map((item, index) => {
                    return (
                      <div className='feedback-box-item' key={index}>
                        <Feedback FeedbackData={item}></Feedback>
                        <span className='dis-text'>{item.title}</span>
                      </div>
                    );
                  })
                  : ''}
              </div> */}
              {/* 门店 */}
              <div className='offline-portal-box'>
                {offline ? (
                  <OfflinePortal
                    offlinePortalData={offline.offlinePortalData}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </BorderBox13>
        </RightBottomBox>)}

      </RightPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    browseCategories: state.rightPage.browseCategories,
    userIdentityCategory: state.rightPage.userIdentityCategory,
    offline: state.rightPage.offline,
    showLeftTopComponent: state.global.showLeftTopComponent,
    selectedItem: state.global.selectedItem, // 从全局状态中获取选中的项目数据
  };
};

// const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps)(index);
