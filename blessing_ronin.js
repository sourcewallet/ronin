//const { ethers } = require('ethers');
import { ethers } from "ethers";

const apikey = 'xxxx'
const provider = new ethers.providers.JsonRpcProvider('https://api-gateway.skymavis.com/rpc?apikey=xxxx');


const contractAddress = '0x9d3936dbd9a794ee31ef9f13814233d435bd806c';
const senderAddress = 'your_address';

const privateKey = 'your_privatekey';
const wallet = new ethers.Wallet(privateKey, provider);


//const functionName = 'activateStreak(address,uint256)';this contract doesn’t provide a public abi, you need to build the data by yourself
const recipientAddress = 'your_address'; // 接收者地址
const amount = ethers.utils.parseUnits('0', 'ether'); // 转账金额

const methodId = '0x31711309'

const abiCoder = new ethers.utils.AbiCoder();
const encodedParams = abiCoder.encode(['address', 'uint256'], [recipientAddress, amount]);


const data = methodId + encodedParams.substring(2);
console.log(data);


const tx = {
    from: senderAddress,
    to: contractAddress,
    value: ethers.utils.parseEther('0'), 
    data: data,
    
};


async function sendTransaction() {
    try {
        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        const receipt = await txResponse.wait();
        console.log(receipt);
    } catch (error) {
        console.error(error);
    }
}

sendTransaction();