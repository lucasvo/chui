import React from 'react';
import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'
import { join, draw } from '../actions/main'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = () => ({
   input: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    actionButton: {
        marginTop: theme.spacing(2),
        margin: '0px auto'
    },
    accountBalance: {
        float: 'right',
    },
})

class JoinDrawContainer extends React.Component {
    async componentDidMount() {
        // update data periodically
        this.watchData()

    }

    async watchData() {
        await getData.bind(this)();
        setInterval(() => {
            getData.bind(this)();
        }, 10 * 1000);
    }

    join() {
        join.bind(this)()
    }

    draw() {
        draw.bind(this)()
    }

    render() {
        const {classes, store} = this.props

        const walletAddress = store.get('walletAddress')
        const daiBalance = store.get('daiBalance')
        const chaiBalance = store.get('chaiBalance')
        const joinAmount = store.get('joinAmount');
        const drawAmount = store.get('drawAmount');
        const isSignedIn = walletAddress && walletAddress.length

        const canJoin = joinAmount && (Number(joinAmount) <= Number(daiBalance))
        const canDraw = drawAmount && (Number(drawAmount) <= Number(chaiBalance))

        return <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <Card><CardContent>
                    <Typography variant='h4'>Convert Dai to Chai</Typography>
                        <Typography variant='subtitle2'>Start saving by converting your Dai to Chai</Typography>
                        <Typography variant="subtitle2" className={classes.accountBalance}>{daiBalance ? `Balance: ${daiBalance} DAI` : '-'}</Typography>
                        <TextField label="DAI Amount" placeholder='0' className={classes.input} margin="normal" variant="outlined" onChange={(event) => {
                                store.set('joinAmount', event.target.value)
                            }} InputProps={{
                                endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                            }} />
                        <Button color='primary'
                            size='large'
                            onClick={() => {
                                this.join()
                            }} variant="contained" disabled={!isSignedIn || !canJoin} className={classes.actionButton}>
                            Convert
                        </Button>
                  </CardContent></Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.panel}>
                  <Card><CardContent>
                    <Typography variant='h4'>Convert Chai to Dai</Typography>
                    <Typography variant='subtitle2'>Convert your Chai to the Dai ERC20</Typography>
                    <Typography variant="subtitle2" className={classes.accountBalance}>{chaiBalance? `Balance: ${chaiBalance} DAI` : '-'}</Typography>
                    <TextField label="DAI Amount" placeholder='0' className={classes.input} margin="normal" variant="outlined" onChange={(event) => {
                            store.set('drawAmount', event.target.value)
                        }} InputProps={{
                            endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                        }} />
                    <Button color='primary'
                        size='large'
                        onClick={() => {
                            this.draw()
                        }} variant="contained" disabled={!isSignedIn || !canDraw} className={classes.actionButton}>
                       Convert
                    </Button>
              </CardContent></Card>
          </Grid>
        </Grid>
    }
}

export default withStyles(styles)(withStore(JoinDrawContainer))
