import { } from '../utils/web3Utils';

export const draw = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const drawAmount = web3.utils.toWei(store.get('drawAmount'), 'ether')
    const walletAddress = store.get('walletAddress')
    return chai.methods.draw(walletAddress, drawAmount).send({from: walletAddress})
}

export const join = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const joinAmount = web3.utils.toWei(store.get('joinAmount'), 'ether')
    const walletAddress = store.get('walletAddress')
    return chai.methods.join(walletAddress, joinAmount).send({from: walletAddress})
}

export const approve = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const dai = store.get('daiObject')
    const chai = store.get('chaiObject')
    const walletAddress = store.get('walletAddress')
    return dai.methods.approve(chai.options.address, "-1").send({from: walletAddress})
}


export default {
    join,
    draw,
    approve
}
