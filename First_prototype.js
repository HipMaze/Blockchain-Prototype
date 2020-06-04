const crypto = require('crypto');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).digest('hex');
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, '2020-02-29', [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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

//the rest of the code is for demonstration and testing purposes
let hipcoin = new Blockchain();
console.log("Mining block....")
hipcoin.addBlock(new Block(1, "2020-02-30", { amount: 10 }));

console.log("voici ma blockchain " + JSON.stringify(hipcoin, null, 4));
console.log("mining block 2")
hipcoin.addBlock(new Block(1, "2020-02-30", { amount: 20 }));
hipcoin.chain[1].data={amount : 100};
hipcoin.chain[1].hash = hipcoin.chain[1].calculateHash();

console.log("is Blockchain valid?" + hipcoin.isChainValid())
