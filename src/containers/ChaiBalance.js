import React from 'react';

import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { toDai } from '../utils/web3Utils';

import logogif from '../assets/logo.gif'
import logostill from '../assets/logostill.png'

const styles = () => ({
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        minHeight: 52
    },
})

class ChaiBalanceContainer extends React.Component {

    async componentDidMount() {
        // update data periodically
        this.watchDsrData()
    }

    async watchDsrData() {
        await getData.bind(this)();
        setInterval(() => {
            getData.bind(this)();
        }, 10 * 1000);
    }

    render() {
        const {store} = this.props
        const dsr = store.get('dsr')
        const chi = store.get('chi')
        const dsrPercent = dsr;
        const chaiBalance = store.get('chaiBalance')
        const chaiBalanceRaw = store.get('chaiBalanceRaw')
        const daiEquiv = chaiBalanceRaw ? toDai.bind(this)(chaiBalanceRaw) : undefined
      return <Card ><CardContent>
        <h2>You have {chaiBalance ? daiEquiv : '0'} Dai brewing</h2>
                 <CardMedia
         component="img"
                  style={{resizeMode: 'contain',     width: 100, float: 'right', paddingRight: 52
}}
        src={chaiBalance > 0 ? logogif : logostill}
         />

        <p>Chai balance: {chaiBalance ? `${chaiBalance}` : '-'}</p>
        <p>1 CHAI = {chi ? `${chi}` : '?'} DAI</p>
        <p>Dai Savings Rate: {dsrPercent ? `${dsrPercent}% APR` : '-'}</p>
        <a target="_blank" href="https://about.chai.money" rel="noopener noreferrer">Learn more</a>
        </CardContent></Card>
    }
}

export default withStyles(styles)(withStore(ChaiBalanceContainer))
