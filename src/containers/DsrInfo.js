import React from 'react';

import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getDsrData, getChiData } from '../utils/web3Utils'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        minHeight: 52
    },
})

class DsrInfoContainer extends React.Component {

    async componentDidMount() {
        // update data periodically
        this.watchDsrData()
        this.watchChiData()
    }

    async watchDsrData() {
        await getDsrData.bind(this)();
        setInterval(() => {
            getDsrData.bind(this)();
        }, 10 * 1000);
    }

  async watchChiData() {
        await getChiData.bind(this)();
        setInterval(() => {
            getChiData.bind(this)();
        }, 10 * 1000);
    }


    render() {
        const {store} = this.props
        const dsr = store.get('dsr')
        const chi = store.get('chi')
        const dsrPercent = dsr;

        return <Grid item="item" xs={12}>
                 <p>The Dai Savings Rate is: {dsrPercent ? `${dsrPercent}%` : '-'}</p>
                 <p>1 CHAI = {chi ? `${chi}` : '?'} DAI
                </p>
               </Grid>
    }
}

export default withStyles(styles)(withStore(DsrInfoContainer))
