const crypto = require('crypto');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.data)).digest('hex');
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '2020-06-02', [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }

        }
        return true;
    }
}
let hipcoin = new Blockchain();
hipcoin.createGenesisBlock();
hipcoin.addBlock(new Block(1, "2020-06-02", { amount: 10 }));

console.log("voici ma blockchain " + JSON.stringify(hipcoin, null, 4));

hipcoin.chain[1].data = { amount: 100 };

hipcoin.chain[1].hash = hipcoin.chain[1].calculateHash();
console.log("voici ma blockchain " + JSON.stringify(hipcoin, null, 4));
console.log("is Blockchain valid?" + hipcoin.isChainValid())
