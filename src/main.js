const hashJs = require("hash.js");

class Transaction {
	constructor(fromAdress, toAdress, amount) {
		this.fromAdress = fromAdress;
		this.toAdress = toAdress;
		this.amount = amount;
	}
}

class Block {
	constructor(timestamp, transactions, previousHash = "") {
		this.previousHash = previousHash;
		this.transactions = transactions;
		this.timestamp = timestamp;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return hashJs
			.sha256()
			.update(
				this.previousHash +
					this.timestamp +
					JSON.stringify(this.transactions) +
					this.nonce
			)
			.digest("hex");
	}

	mineBlock(difficulty) {
		while (
			this.hash.substring(0, difficulty) !==
			Array(difficulty + 1).join("0")
		) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
	}
}
class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock() {
		return new Block("2020-02-29", [], "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(miningRewardAdress) {
		let block = new Block(Date.now(), this.pendingTransactions);
		block.mineBlock(this.difficulty);
		console.log("block successfully mined");
		this.chain.push(block);
		this.pendingTransactions = [
			new Transaction(null, miningRewardAdress, this.miningReward),
		];
	}

	createTransaction(transaction) {
		this.pendingTransactions.push(transaction);
	}

	getBalanceOfAdress(address) {
		let balance = 0;
		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAdress === address) {
					balance -= trans.amount;
				}
				if (trans.toAdress === address) {
					balance += trans.amount;
				}
			}
		}
		return balance;
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
hipcoin.createTransaction(new Transaction("hipmaze", "sterben", 100));
hipcoin.createTransaction(new Transaction("sterben", "hipmaze", 50));

console.log("\nStart the mining ...");
console.log(hipcoin.pendingTransactions);
hipcoin.minePendingTransactions("winner");
console.log("balance of hipmaze : " + hipcoin.getBalanceOfAdress("hipmaze"));
console.log("balance of sterben : " + hipcoin.getBalanceOfAdress("sterben"));
console.log("balance of winner  : " + hipcoin.getBalanceOfAdress("winner"));
console.log("\nis Blockchain valid?" + hipcoin.isChainValid());
