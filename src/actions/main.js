import { } from '../utils/web3Utils';

export const draw = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const drawAmount = web3.utils.toWei(store.get('drawAmount'), 'ether')
    const walletAddress = store.get('walletAddress')
    return chai.methods.draw(walletAddress, drawAmount).send({from: walletAddress})
}

export const save = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const dai = store.get('daiObject')
    const saveAmount = web3.utils.toWei(store.get('saveAmount'), 'ether')
    const walletAddress = store.get('walletAddress')
    const allowance = store.get('daiAllowance')
    if (Number((allowance) < Number(saveAmount))) {
      return dai.methods.approve(chai.options.address, "-1")
        .send({from: walletAddress})
        .then(function () {
          return chai.methods.join(walletAddress, saveAmount).send({from: walletAddress})
        });
    }
    return chai.methods.join(walletAddress, saveAmount).send({from: walletAddress})
}

export const move = async function() {
    const { store } = this.props
    const web3 = store.get('web3')
    const chai = store.get('chaiObject')
    const moveAmount = web3.utils.toWei(store.get('moveAmount'), 'ether')
    const moveAddress = store.get('moveAddress')
    const walletAddress = store.get('walletAddress')
    return chai.methods.move(walletAddress, moveAddress, moveAmount).send({from: walletAddress})
}

export default {
    save,
    draw,
    move,
}
