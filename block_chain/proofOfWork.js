// 初试 sha256
const sha256 = require('crypto-js/sha256');

console.log(sha256('hogan1').toString());
console.log(sha256('hogan2').toString());


// 计算 开头值为 0 的哈希值及 x
// 计算 开头n位为 0 的哈希值及 x
function proofOfWork() {
    let data = 'hogan';
    let x = 1;
    while (true) {
        if (sha256(data + x).toString().substring(0, 1) !== '0') {
            x = x + 1;
        } else {
            console.log('Hash: ' + sha256(data + x).toString());
            console.log('x: ' + x);
            break;
        }
    }
}
proofOfWork();