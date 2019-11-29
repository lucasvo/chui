import React from 'react';

import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { DsrDecimal } from '../utils/web3Utils';

import logo from '../assets/logo.gif'

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
      const chaiDecimal = chaiBalanceRaw ? new DsrDecimal(chaiBalanceRaw).div('1e18') : new DsrDecimal(0)
        const chiDecimal = chi ? new DsrDecimal(chi) : new DsrDecimal(0)
      const daiEquiv = chiDecimal.mul(chaiDecimal).toPrecision(5)
      return <Card ><CardContent>
                <h2>{chaiBalance ? `${chaiBalance} CHAI` : ''}</h2>
        <h5>{chaiBalance ? `~${daiEquiv} DAI` : ''}</h5>
        {chaiBalance > 0 ? 
        <CardMedia
         component="img"
         style={{resizeMode: 'contain',     width: 80
}}
         src={logo}
         /> : null}
         <p>1 CHAI = {chi ? `${chi}` : '?'} DAI
                 <p>Dai Savings Rate: {dsrPercent ? `${dsrPercent}%` : '-'}</p>
         </p>
               </CardContent></Card>
    }
}

export default withStyles(styles)(withStore(ChaiBalanceContainer))
