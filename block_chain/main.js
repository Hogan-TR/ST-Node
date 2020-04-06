// 区块链
// block
// chain

const sha256 = require("crypto-js/sha256");

// 区块
// data
// previousHash
// self的哈希值，决定于区块中的信息(data + previousHash)
class Block {
    constructor(data, previousHash) {
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
    }

    computeHash() {
        return sha256(this.data + this.previousHash).toString();
    }
}

// 链
class Chain {
    constructor() {
        this.chain = [this.bigBang()];
    }

    // 生成祖先区块
    bigBang() {
        const genesisBlock = new Block('Genesis Block.', '');
        return genesisBlock;
    }

    // 获取当前链中的最后区块
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // 添加区块到区块链上
    addBlockToChain(newBlock) {
        // data
        // 找到最近一个block的hash
        // 计算此block的最终hash
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.chain.push(newBlock);
    }

    // 验证当前区块链是否合法
    // 1. 当前区块的 hash
    // 2. 当前区块的 previousHash 与前区块的 hash
    validateChain() {
        // 链中仅祖先区块
        if (this.chain.length === 1) {
            if (this.chain[0].hash !== this.chain[0].computeHash()) {
                console.log('祖先区块篡改');
                return false;
            }
            return true;
        }
        // 从第二个区块开始验证
        for (let i = 1; i < this.chain.length; i++) {
            const blockToValidate = this.chain[i];
            // 当前数据是否被篡改
            if (blockToValidate.hash !== blockToValidate.computeHash()) {
                console.log('数据篡改');
                return false;
            }
            // 区块的 previousHash 是否等于 previousBlock 的 hash
            const previousBlock = this.chain[i - 1];
            if (blockToValidate.previousHash !== previousBlock.hash) {
                console.log('前后区块链接断裂');
                return false;
            }
        }
        return true;
    }
}

const trChain = new Chain();
// console.log(trChain.validateChain());

const block1 = new Block('test1', '');
trChain.addBlockToChain(block1);
const block2 = new Block('test2', '');
trChain.addBlockToChain(block2);
console.log(trChain);
console.log(trChain.validateChain());

// 尝试篡改区块链
trChain.chain[1].data = 'error insert'; // 数据篡改 false
trChain.chain[1].hash = trChain.chain[1].computeHash(); // 前后区块链接断裂 false
console.log(trChain);
console.log(trChain.validateChain());