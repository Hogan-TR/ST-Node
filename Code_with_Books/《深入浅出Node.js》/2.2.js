// 模块路径
console.log(module.paths);

// 文件模块对象
function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if (parent && parent.children) {
        parent.children.push(this);
    }

    this.filename = null;
    this.loaded = false;
    this.children = [];
}

// 原生对 .json 文件的加载
Module._extensions['.json'] = function (module, filename) {
    var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
    try {
        module.exports = JSON.parse(stripBOM(content));
    } catch (err) {
        err.message = filename + ': ' + err.message;
        throw err;
    }
};
// Module._extensions -> require.extensions属性
console.log(require.extensions);

// Node对模块的包装 防止污染 作用域隔离
// exports, require, ... 未定义却存在
(function (exports, require, module, __filename, __dirname) {
    // 模块中的内容
    var math = require('math');
    exports.area = function (radius) {
        return math.pi * radius * radius;
    }
});