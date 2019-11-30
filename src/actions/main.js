import { } from '../utils/web3Utils';

export const exit = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const exitAmount = web3.utils.toWei(store.get('exitAmount'), 'ether')
    const walletAddress = store.get('walletAddress')
    return chai.methods.exit(walletAddress, exitAmount).send({from: walletAddress})
}

export const join = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const dai = store.get('daiObject')
    const joinAmount = web3.utils.toWei(store.get('joinAmount'), 'ether')
    const walletAddress = store.get('walletAddress')
    const allowance = store.get('daiAllowance')
    if (Number((allowance) < Number(joinAmount))) {
      return dai.methods.approve(chai.options.address, "-1")
        .send({from: walletAddress})
        .then(function () {
          return chai.methods.join(walletAddress, joinAmount).send({from: walletAddress})
        });
    }
    return chai.methods.join(walletAddress, joinAmount).send({from: walletAddress})
}

export const transfer = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const transferAmount = web3.utils.toWei(store.get('transferAmount'), 'ether')
    const transferAddress = store.get('transferAddress')
    const walletAddress = store.get('walletAddress')
    return chai.methods.transfer(transferAddress, transferAmount).send({from: walletAddress})
}

export default {
    join,
    exit,
    transfer,
}
