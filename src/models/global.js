// models/global.js
export default {
    namespace: 'global', // 模型的命名空间，确保唯一
    state: {
        showLeftTopComponent: true, // 初始状态
    },
    reducers: {
        // 处理action的函数
        // 在models/global.js中的reducers部分
        TOGGLE_LEFT_TOP_COMPONENT(state, { payload }) {
            return {
                ...state,
                showLeftTopComponent: !state.showLeftTopComponent,
                selectedItem: payload // 假设我们添加一个新的state属性来存储这个数据
            };
        },

    },
    effects: {
        // 可以定义异步操作的effects
    },
    subscriptions: {
        // 可以定义subscriptions
    },
};
