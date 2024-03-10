import echarts from 'echarts/lib/echarts';

// 关联数据类别
export const BrowseCategoriesOptions = params => ({
  radar: {
    center: ['50%', '50%'],
    radius: '70%',
    name: {
      formatter: function (name) {
        let arr;
        arr = ['{a|' + name + '}'];
        return arr.join('\n');
      },
      textStyle: {
        rich: {
          //根据文字的组设置格式
          a: {
            color: '#BCDCFF',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Source Han Sans CN',
          },
        },
      },
    },
    // 名字和图形的距离
    nameGap: 5,
    indicator: params.indicator,
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitArea: {
      areaStyle: {
        color: [
          'rgba(84,136,255, 0.05)',
          'rgba(84,136,255, 0.1)',
          'rgba(84,136,255, 0.2)',
          'rgba(84,136,255, 0.3)',
          'rgba(84,136,255, 0.4)',
          'rgba(84,136,255, 0.5)',
        ].reverse(),
        shadowColor: 'rgba(0, 0, 0, .5)',
        shadowBlur: 5,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
      },
    },
  },
  series: [
    {
      name: '用户浏览类别',
      type: 'radar',
      data: [params.data],
      label: {
        show: false,
        formatter: function (params) {
          return params.value + '万';
        },
        color: '#9ae8ac',
        distance: 10,
        align: 'right',
      },
      symbol: 'none',
      symbolSize: [6, 6],
      // 边缘颜色
      lineStyle: {
        color: 'rgba(160,159,246, 0.6)',
        width: 2,
      },
      areaStyle: {
        color: 'rgba(114,113,233,.4)',
        opacity: 0.8,
        shadowColor: 'rgba(115,149,255,1)',
        shadowBlur: 10,
      },
    },
  ],
});

// 反馈
export const FeedbackOptions = params => ({
  title: {
    text: `${params.number}%`,
    left: '45%',
    top: '40%',
    textAlign: 'center',
    textStyle: {
      fontSize: '16',
      fontWeight: '500',
      color: '#909dff',
      textAlign: 'center',
    },
  },
  series: [
    {
      type: 'pie',
      startAngle: 0,
      radius: ['80%', '70%'],
      center: ['50%', '50%'],
      data: [
        {
          value: params.number,
          name: params.title,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#5a8bfa',
                },
                {
                  offset: 1,
                  color: '#831bdb',
                },
              ]),
              shadowColor: 'rgba(175,143,230,.5)',
              shadowBlur: 10,
            },
          },
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 0,
              },
            },
          },
          hoverAnimation: false,
        },
        {
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 0,
              },
            },
          },
          value: 100 - params.number,
          hoverAnimation: true,
          itemStyle: {
            color: 'rgba(79,76,192, 0.3)',
          },
        },
      ],
    },
  ],
});

//  新增文书数量
export const OfflinePortalOptions = params => ({
  color: ['#73A0FA', '#73DEB3', '#32C5E9', '#67E0E3'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  grid: {
    left: '15',
    right: '15',
    bottom: '15', // Increase bottom margin to make space for x-axis labels
    top: '30',
    containLabel: true,
  },
  legend: {
    data: ['裁判文书网', '最高人民法院', '法律服务网'],
    show: true,
    textStyle: {
      color: '#BCDCFF',
    },
  },
  xAxis: {
    type: 'category',
    data: params.xData,
    axisLabel: {
      color: '#BCDCF0',
      textStyle: {
        fontSize: 12,
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: true,
    },
    axisLine: {
      show: false,
    },
    boundaryGap: true,
  },
  yAxis: [
    {
      type: 'value',
      nameTextStyle: {
        color: '#BCDCFF',
      },
      axisLabel: {
        color: '#BCDCF0',
        textStyle: {
          fontSize: 12,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#252938',
        },
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
      },
    },
    {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      // name: '密度',
      //网格样式
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#94b5ca',
        },
      },
    },
  ],
  series: [
    {
      name: '裁判文书网',
      type: 'line',
      data: params.data1,
    },
    {
      name: '最高人民法院',
      type: 'line',
      data: params.data2,
    },
    {
      name: '法律服务网',
      type: 'line',
      data: params.data3,
    },
    {
      name: '额度',
      type: 'bar',
      yAxisIndex: 1, // Associate with the right y-axis
      data: params.barData,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(34,224,214,.8)',
            },
            {
              offset: 0.5,
              color: 'rgba(5,137,186,1)',
            },
            {
              offset: 1,
              color: 'rgba(11,12,31,1)',
            },
          ]),
          barBorderRadius: 7.5,
        },
      },
      barMaxWidth: 15,
    },
  ],
});

export const ContrastOptions = () => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // type: 'cross',
      lineStyle: {
        type: 'dashed',
      },
    }
  },
  legend: {
    data: ['实增文书数量', '应增文书数量'],
    show: true,
    textStyle: {
      color: '#BCDCFF',
    },
  },
  grid: [
    {
      left: '3%',
      right: '50%',
      bottom: '3%',
      top: '35', // 取消上方距离
    },
    {
      left: '50%',
      right: '3%',
      bottom: '3%',
      top: '35', // 取消上方距离
    }
  ],
  xAxis: [
    {
      type: 'value',
      inverse: true,
      gridIndex: 0,
      axisLabel: {
        show: false,  // 不显示标签
        color: '#BCDCF0',
        textStyle: {
          fontSize: 12,
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      boundaryGap: true,
    },
    {
      type: 'value',
      gridIndex: 1,
      axisLabel: {
        show: false,  // 不显示标签
        color: '#BCDCF0',
        textStyle: {
          fontSize: 12,
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      boundaryGap: true,
    }
  ],
  yAxis: [
    {
      type: 'category',
      gridIndex: 0,
      nameTextStyle: {
        color: '#BCDCFF',
      },
      axisLabel: {
        show: false,  // 不显示标签
        color: '#BCDCF0',
        textStyle: {
          fontSize: 12,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#252938',
        },
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
      },
      data: ['裁判文书网', '最高人民法院', '法律服务网']
    },
    {
      type: 'category',
      gridIndex: 1,
      nameTextStyle: {
        color: '#BCDCFF',
      },
      axisLabel: {
        show: false,  // 不显示标签
        color: '#BCDCF0',
        textStyle: {
          fontSize: 12,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#252938',
        },
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
      },
      data: ['裁判文书网', '最高人民法院', '法律服务网']
    }
  ],
  series: [
    {
      name: '实增文书数量',
      type: 'bar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [300, 352, 225],
      barMaxWidth: 14, // 调整柱子宽度
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#006FFF' },    // 渐变起始颜色
          { offset: 1, color: '#00F' }        // 渐变结束颜色
        ]),
        barBorderRadius: [5, 0, 0, 5],  // 设置柱子的圆角，依次为左上、右上、右下、左下
      },

    },
    {
      name: '应增文书数量',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [280, 330, 220],
      barMaxWidth: 14, // 调整柱子宽度
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#00C7B3' },    // 渐变起始颜色
          { offset: 1, color: '#00766C' }     // 渐变结束颜色
        ]),
        barBorderRadius: [0, 5, 5, 0],  // 设置柱子的圆角，依次为左上、右上、右下、左下
      },

    }
  ]
});
