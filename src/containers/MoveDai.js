import React from 'react';
import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'
import { move } from '../actions/main'

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
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
    actionButtonContainer: {
        width: '100%',
        textAlign: 'center'
    },
    accountBalance: {
        float: 'right',
    },
})

class MoveDaiContainer extends React.Component {
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

    move() {
        move.bind(this)()
    }

    render() {
        const {classes, store} = this.props

        const walletAddress = store.get('walletAddress')
        const chaiBalance = store.get('chaiBalance')
        const moveAmount = store.get('moveAmount');
        const isSignedIn = walletAddress && walletAddress.length

        const canMove = moveAmount && (Number(moveAmount) <= Number(chaiBalance))

        return <Grid container spacing={3}>
               <Grid item xs={12}><Card><CardContent>
                <Typography variant='h4'>Move Chai</Typography>
                <Typography variant='subtitle2'>Send Dai worth of Chai to an address</Typography>
                <Grid container alignItems="flex-end" spacing={3}>
                  <Grid item xs={12} md={6} spacing={3}>
                    <Typography variant='subtitle2' className={classes.accountBalance}>{chaiBalance ? `Balance: ${chaiBalance} DAI` : '-'}</Typography>
                    <TextField label="DAI Value" placeholder='0' className={classes.input} margin="normal" variant="outlined" onChange={(event) => {
                            store.set('moveAmount', event.target.value)
                        }} InputProps={{
                            endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                        }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label='Address' placeholder='0x' className={classes.input} margin="normal" variant="outlined" onChange={(event) => {
                            store.set('moveAddress', event.target.value)
                        }} />
                  </Grid>
               </Grid>
               <Box className={classes.actionButtonContainer}>
                  <Button color='primary'
                    size='large'
                    onClick={() => {
                        this.move()
                    }} variant="contained" disabled={!isSignedIn || !canMove} className={classes.actionButton}>
                    Convert
                </Button>
              </Box>
            </CardContent></Card></Grid>
        </Grid>
    }
}

export default withStyles(styles)(withStore(MoveDaiContainer))
