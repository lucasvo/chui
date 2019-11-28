import React from 'react';
import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'
import { save, draw } from '../actions/main'

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

class SaveDrawContainer extends React.Component {
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

    save() {
        save.bind(this)()
    }

    draw() {
        draw.bind(this)()
    }

    handleChange (event, newValue) {
      const {store} = this.props
      store.set('savedrawAction',  newValue)
    }

    render() {
        const {classes, store} = this.props

        const walletAddress = store.get('walletAddress')
        const daiBalance = store.get('daiBalance')
        const chaiBalance = store.get('chaiBalance')
        const saveAmount = store.get('saveAmount');
        const drawAmount = store.get('drawAmount');
        const isSignedIn = walletAddress && walletAddress.length

        const canSave = saveAmount && (Number(saveAmount) <= Number(daiBalance))
        const canDraw = drawAmount && (Number(drawAmount) <= Number(chaiBalance))
        const savedrawAction = store.get('savedrawAction')

        return <Card className={classes.card}>
                    <Tabs value={savedrawAction} onChange={this.handleChange.bind(this)} centered>
                      <Tab label="Save" id="save-tab" />
                      <Tab label="Draw" id="draw-tab" />
                    </Tabs>
                  <CardContent>

                  <Box hidden={savedrawAction !== 0}>                        <Typography variant='subtitle2'>Start saving by converting your Dai to Chai</Typography>
                        <Typography variant="subtitle2" className={classes.accountBalance}>{daiBalance ? `Balance: ${daiBalance} DAI` : '-'}</Typography>
                        <TextField label="DAI Amount" placeholder='0' className={classes.input} margin="normal" variant="outlined" onChange={(event) => {
                                store.set('saveAmount', event.target.value)
                            }} InputProps={{
                                endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                            }} />
                        <Button color='primary'
                            size='large'
                            onClick={() => {
                                this.save()
                            }} variant="contained" disabled={!isSignedIn || !canSave} className={classes.actionButton}>
                            Convert
                        </Button>
                  </Box>
                  <Box hidden={savedrawAction !== 1}>
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
              </Box>
          </CardContent></Card>

    }
}

export default withStyles(styles)(withStore(SaveDrawContainer))
