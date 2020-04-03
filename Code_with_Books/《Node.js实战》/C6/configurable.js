function setup(options) {
    // 设置逻辑 - 初始化
    return function (req, res, next) {
        // 中间件逻辑
        // 即使被外部函数返回，依然可以访问options
    }
}
// 使用
// 放入的为function的引用，不直接调用
app.use(setup({ some: 'options' }));