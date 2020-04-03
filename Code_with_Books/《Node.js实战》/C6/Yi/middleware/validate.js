function parseField(field) {
    return field
        .split(/\[|\]/)
        .filter((s) => s); // 解析entry[name]符号
}
function getField(req, field) {
    let val = req.body;
    field.forEach((prop) => {
        val = val[prop]; // 基于parseField()的结果查找属性
    });
    return val;
}

exports.required = (field) => {
    field = parseField(field); // 解析输入域一次
    return (req, res, next) => {
        if (getField(req, field)) { // 检查输入域是否有值
            next(); // 有，进入下一个中间件
        } else {
            console.error(`${field.join(' ')} is required`); // 没有，显示错误
            res.redirect('back');
        }
    };
};
exports.lengthAbove = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (getField(req, field).length > len) {
            next();
        } else {
            const fields = field.join(' ');
            console.error(`${fields} must have more than ${len} characters`);
            res.redirect('back');
        }
    };
};