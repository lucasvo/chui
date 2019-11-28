import React from 'react';

import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
        return <Card><CardContent>
                 <h1>{chaiBalance ? `${chaiBalance} DAI` : ''}</h1>
                 <p>1 CHAI = {chi ? `${chi}` : '?'} DAI
                 <p>Dai Savings Rate: {dsrPercent ? `${dsrPercent}%` : '-'}</p>
               </p>
               </CardContent></Card>
    }
}

export default withStyles(styles)(withStore(ChaiBalanceContainer))
