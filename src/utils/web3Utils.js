import Web3 from "web3";
import daiABI from '../abi/Dai.abi.json';
import config from '../config.json';
import potABI from '../abi/Pot.abi.json';
import chaiABI from '../abi/Chai.abi.json';
import { Decimal } from 'decimal.js-light';

const daiAddress = config.MCD_DAI;
const potAddress = config.MCD_POT;
const chaiAddress = config.CHAI;

export const getData = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const walletAddress = store.get('walletAddress')

    if (!web3 || !walletAddress) return

    const dai = new web3.eth.Contract(daiABI, daiAddress);
    const daiBalanceRaw = await dai.methods.balanceOf(walletAddress).call();
    const daiBalance = parseFloat(web3.utils.fromWei(daiBalanceRaw)).toFixed(2);
    const daiAllowance = await dai.methods.allowance(walletAddress, chaiAddress).call();
    if (daiAllowance != "0") { store.set('allowanceAvailable', true) }

    const chai = new web3.eth.Contract(chaiABI, chaiAddress);
    const chaiBalanceRaw = await chai.methods.balanceOf(walletAddress).call();
    const chaiBalance = parseFloat(web3.utils.fromWei(chaiBalanceRaw)).toFixed(2);

    store.set('daiObject', dai)
    store.set('daiBalance', daiBalance)
    store.set('daiAllowance', daiAllowance)

    store.set('chaiObject', chai)
    store.set('chaiBalance', chaiBalance)
}

const DsrDecimal = Decimal.clone({
  precision: 30,
  toExpNeg: -7,
  toExpPos: 29,
});

const secondsInYear = DsrDecimal(60 * 60 * 24 * 365);

export const getDsrData = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const walletAddress = store.get('walletAddress')

    if (!web3 || !walletAddress) return
    const pot = new web3.eth.Contract(potABI, potAddress)
    const dsrRaw = await pot.methods.dsr().call()

    if (dsrRaw == store.get('dsrRaw')) return
    store.set('dsrRaw', dsrRaw)
    let dsr = new DsrDecimal(dsrRaw).div('1e27').pow(secondsInYear).minus(1).mul(100).toPrecision(5)
    store.set('dsr', )
}

export const signData = async function(web3, fromAddress, data) {
    return new Promise(function(resolve, reject) {
        web3.currentProvider.sendAsync({
                method: "eth_signTypedData_v3",
                params: [fromAddress, data],
                from: fromAddress
            },
            function(err, result) {
                if (err) {

                } else {
                    const r = result.result.slice(0,66)
                    const s = '0x' + result.result.slice(66,130)
                    const v = Number('0x' + result.result.slice(130,132))
                    resolve({
                        v,
                        r,
                        s
                    })
                }
            }
        );
    });
}


export const initBrowserWallet = async function() {
    const store = this.props.store

    store.set('walletLoading', true)

    let web3Provider;

    // Initialize web3 (https://medium.com/coinmonks/web3-js-ethereum-javascript-api-72f7b22e2f0a)
    // Modern dApp browsers...
    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
            // Request account access
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access...
            console.error("User denied account access")
        }

        window.ethereum.on('accountsChanged', (accounts) => {
            initBrowserWallet.bind(this)()
        })
    }
    // Legacy dApp browsers...
    else if (window.web3) {
        web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, display err
    else {
        this.log("Please install MetaMask!");
    }

    const web3 = new Web3(web3Provider);
    const walletType = 'browser'
    const accounts = await web3.eth.getAccounts()

    // await window.ethereum.enable();
    store.set('walletLoading', false)
    store.set('walletAddress', accounts[0])
    store.set('web3', web3)
    store.set('walletType', walletType)

    getData.bind(this)()
}

export default {
    initBrowserWallet,
}
