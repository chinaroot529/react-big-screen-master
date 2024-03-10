import React, { PureComponent } from 'react';
import { recommendOptions } from './options';
import { ScrollBoard } from '@jiaminghi/data-view-react';

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
  };

  showModalWithContent = () => {
    // 显示模态框的逻辑，展示this.state.selectedContent
    console.log(111);
  };

  render() {
    const { recommendSitua } = this.props;
    const config = {
      ...this.state.config,
      ...recommendOptions(recommendSitua),
    };
    console.log(this.props.recommendSitua); // 打印以检查值
    return (
      <div>
        {recommendSitua ? (
          <ScrollBoard
            config={config}
            style={{
              width: '5.475rem',
              height: '6.875rem',
            }}>
            <button onClick={this.showModalWithContent}>查看选中内容</button>
          </ScrollBoard>
        ) : (
          ''
        )}
      </div>
    );
  }
}


export default RecommendList;
