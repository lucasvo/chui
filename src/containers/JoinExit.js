import React from 'react';
import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData, toChai, toDai } from '../utils/web3Utils'
import { join, exit } from '../actions/main'

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = () => ({
   card: {
        marginBottom: theme.spacing(6)
   },
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

class JoinExitContainer extends React.Component {
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

    exit() {
        exit.bind(this)()
    }

    handleChange (event, newValue) {
      const {store} = this.props
      store.set('joinexitAction',  newValue)
    }

    render() {
        const {classes, store} = this.props

        const walletAddress = store.get('walletAddress')
        const daiBalance = store.get('daiBalance')
        const chaiBalance = store.get('chaiBalance')
        const joinAmount = store.get('joinAmount');
        const exitAmount = store.get('exitAmount');
        const web3 = store.get('web3');
        const isSignedIn = walletAddress && walletAddress.length

        const canJoin = joinAmount && (Number(joinAmount) <= Number(daiBalance))
        const canExit = exitAmount && (Number(exitAmount) <= Number(chaiBalance))
        const joinexitAction = store.get('joinexitAction')

        return <Card className={classes.card}>
                    <Tabs value={joinexitAction} onChange={this.handleChange.bind(this)} centered>
                      <Tab label="Convert" id="join-tab" />
                      <Tab label="Withdraw" id="exit-tab" />
                    </Tabs>
                  <CardContent>

                  <Box hidden={joinexitAction !== 0}> <Typography variant='subtitle2'>Start saving by converting Dai to Chai</Typography>
        <Button variant="subtitle2" className={classes.accountBalance}
      style={{textTransform: 'none'}}
      onClick={() => {store.set('joinAmount', daiBalance)}}
        >{daiBalance ? `Balance: ${daiBalance} DAI` : '-'}</Button>
        <TextField label="DAI Amount" placeholder='0' className={classes.input} value={joinAmount ? joinAmount : ''} margin="normal" variant="outlined" type="number" onChange={(event) => {
                                store.set('joinAmount', event.target.value)
                       }} InputProps={{ inputProps: { min: 0 },
                                endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                            }}
      helperText={joinAmount ? "You will receive: " + toChai.bind(this)(web3.utils.toWei(String(joinAmount))) + " Chai": ""}
        />
                        <Button color='primary'
                            size='large'
                            onClick={() => {
                                this.join()
                            }} variant="contained" disabled={!isSignedIn || !canJoin} className={classes.actionButton}>
                            Convert
                        </Button>
                  </Box>
                  <Box hidden={joinexitAction !== 1}>
                    <Typography variant='subtitle2'>Convert Chai back to Dai</Typography>
        <Button variant="subtitle2" className={classes.accountBalance}
      style={{textTransform: 'none'}}
      onClick={() => {store.set('exitAmount', chaiBalance)}}
        >{chaiBalance? `Balance: ${chaiBalance} CHAI` : '-'}</Button>
        <TextField label="CHAI Amount" placeholder='0' className={classes.input} margin="normal" variant="outlined" value={exitAmount ? exitAmount : ''} type="number" onChange={(event) => {
                            store.set('exitAmount', event.target.value)
            }} InputProps={{ inputProps: { min: 0 },
                            endAdornment: <InputAdornment className={classes.endAdornment} position="end">CHAI</InputAdornment>
                        }}
      helperText={exitAmount ? "You will receive: " + toDai.bind(this)(web3.utils.toWei(String(exitAmount))) + " Dai": ""}
        />
                    <Button color='primary'
                        size='large'
                        onClick={() => {
                            this.exit()
                        }} variant="contained" disabled={!isSignedIn || !canExit} className={classes.actionButton}>
                       Convert
                    </Button>
              </Box>
          </CardContent></Card>

    }
}

export default withStyles(styles)(withStore(JoinExitContainer))
