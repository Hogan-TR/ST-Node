// 区块链
// block
// chain

const sha256 = require("crypto-js/sha256");

// 转账
class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
}

// 区块
// data
// previousHash
// self的哈希值，决定于区块中的信息(data + previousHash)
class Block {
    constructor(transactions, previousHash) {
        // data -> transactions(array) <-> need to stringify
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.timestamp = Date.now(); // 块生成时间戳
        this.nonce = 1; // 用于一起计算hash的随机数
        this.hash = this.computeHash();
    }

    computeHash() {
        return sha256(JSON.stringify(this.transactions) + this.previousHash + this.nonce + this.timestamp).toString();
    }

    // 根据difficulty决定需要的hash开头
    getAnswer(difficulty) {
        // 开头为n位0的hash
        let answer = '';
        for (let i = 0; i < difficulty; i++) {
            answer += '0';
        }
        return answer;
    }

    // 计算符合区块链难度要求的hash
    mine(difficulty) {
        this.hash = this.computeHash();
        while (true) {
            if (this.hash.substring(0, difficulty) !== this.getAnswer(difficulty)) {
                this.nonce += 1;
                this.hash = this.computeHash();
            } else {
                break;
            }
        }
        console.log('挖矿结束', this.hash);
    }
}

// 链
class Chain {
    constructor() {
        this.chain = [this.bigBang()];
        this.transactionPool = [];
        this.minerReward = 50; // 挖矿奖励额
        this.difficulty = 5; // 挖空难度 Proof of Work
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

    // 向Pool中添加转账记录
    addTransaction(transaction) {
        this.transactionPool.push(transaction);
    }

    mineTransactionPool(minerRewardAddress) {
        // 创建奖励
        const mineRewardTransaction = new Transaction('', minerRewardAddress, this.minerReward);
        this.transactionPool.push(mineRewardTransaction);

        // 挖矿
        const newBlock = new Block(this.transactionPool, this.getLatestBlock().hash);
        newBlock.mine(this.difficulty);

        // 添加区块到区块链
        // 清空 transactionPool
        // 此处以简化挖矿过程，将Pool中所有transactions的手续费挖走
        this.chain.push(newBlock);
        this.transactionPool = [];
    }

    // 添加区块到区块链上 (外部)
    addBlockToChain(newBlock) {
        // data
        // 找到最近一个block的hash
        // 计算此block的最终hash
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.computeHash();
        newBlock.mine(this.difficulty); // 挖矿
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

// const trChain = new Chain();
// console.log(trChain.validateChain());

// const block1 = new Block('test1', '');
// trChain.addBlockToChain(block1);
// const block2 = new Block('test2', '');
// trChain.addBlockToChain(block2);
// console.log(trChain);
// console.log('result of validate:', trChain.validateChain());

// 尝试篡改区块链
// trChain.chain[1].data = 'error insert'; // 数据篡改 false
// trChain.chain[1].hash = trChain.chain[1].computeHash(); // 前后区块链接断裂 false
// console.log(trChain);
// console.log(trChain.validateChain());

const trCoin = new Chain();
// 两笔转账记录
const t1 = new Transaction('Alex', 'Jose', 11);
trCoin.addTransaction(t1);
const t2 = new Transaction('Hobo', 'Go', 2);
trCoin.addTransaction(t2);
// console.log(trCoin);
// 第三方挖矿者
trCoin.mineTransactionPool('Hogan');
console.log(trCoin.chain[1]);