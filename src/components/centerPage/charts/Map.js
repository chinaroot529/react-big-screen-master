import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { mapOptions } from './options';
import { connect } from 'dva';

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
    };
  }

  render() {
    const { renderer } = this.state;
    const { mapData } = this.props;
    // // 判断是否有内容要显示
    // if (selectedItemContent) {

    //   return (
    //     <div style={{
    //       width: '10.625rem',
    //       height: '8.125rem',
    //     }}
    //       dangerouslySetInnerHTML={{ __html: selectedItemContent }} />

    //   );
    // }
    return (
      <div
        style={{
          width: '10.625rem',
          height: '8.125rem',
        }}>
        {
          mapData ? <Chart renderer={renderer} option={mapOptions(mapData)} /> : ''
        }
      </div>
    );
  }


}

const mapStateToProps = state => {
  return {
    showDefaultMap: state.global.showDefaultMap,
    selectedItemContent: state.global.selectedItemContent, // 从全局状态获取选中项内容
  };
};

export default connect(mapStateToProps)(Map);
