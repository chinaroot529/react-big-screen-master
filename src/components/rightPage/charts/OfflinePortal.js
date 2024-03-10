import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { OfflinePortalOptions, ContrastOptions } from './options';

class OfflinePortal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
    };
  }

  render() {
    const { renderer } = this.state;
    const { offlinePortalData } = this.props;
    return (
      <div>
        <div
          style={{
            width: '5.375rem',
            height: '2.875rem',
            // 添加 Chart1 的样式
          }}
        >
          <Chart renderer={renderer} option={OfflinePortalOptions(offlinePortalData)} />
        </div>
        <div
          style={{
            width: '5.375rem',
            height: '2.0rem',
            // 添加 Chart2 的样式
          }}
        >
          <Chart renderer={renderer} option={ContrastOptions(offlinePortalData)} />
        </div>
      </div>

    );
  }
}

export default OfflinePortal;
