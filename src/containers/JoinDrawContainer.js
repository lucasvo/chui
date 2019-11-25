import React from 'react';
import Web3 from 'web3';
import AddressValidator from 'wallet-address-validator';

import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'
import { join, draw } from '../actions/main'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = () => ({
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        minHeight: 52
    },
    actionsContainer: {
        // marginTop: theme.spacing(3)
    },
    accountButton: {
        '& svg': {
            marginRight: theme.spacing(1)
        }
    },
    input: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    account: {},
    panel: {
        padding: theme.spacing(3),
        border: '1px solid #eee',
        borderRadius: theme.spacing(1),
        minHeight: '100%'
    },
    accountItem: {
        marginBottom: theme.spacing(2)
    },
    actionButton: {
        marginTop: theme.spacing(2),
        margin: '0px auto'
        // [theme.breakpoints.down('sm')]: {
        //     marginTop: theme.spacing(1)
        // },
        // [theme.breakpoints.up('md')]: {
        //     textAlign: 'right'
        // }
    },
    actionButtonContainer: {
        width: '100%',
        textAlign: 'center'
    },
    accountBalance: {
        float: 'right'
    },
})

class JoinDrawContainer extends React.Component {

    constructor(props) {
        super(props);
    }

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
        // const daiBalance = '1000'
        const joinAmount = store.get('joinAmount');
        const drawAmount = store.get('drawAmount');
        const isSignedIn = walletAddress && walletAddress.length

        const canJoin = joinAmount && (Number(joinAmount) <= Number(daiBalance))
        const canDraw = drawAmount && (Number(drawAmount) <= Number(chaiBalance))

        return <Grid item="item" xs={12}>
            {
                <Grid className={classes.container} container="container" alignItems='center'>
                        <Grid className={classes.actionsContainer} spacing={4} container="container">
                            <Grid item="item" xs={12} sm={12} md={6}>
                                <div className={classes.panel}>
                                    <Typography variant='h6'>Convert Dai to Chai</Typography>
                                    <br/>
                                    <div>
                                        <Typography variant='subtitle2'>Start saving by converting your Dai to Chai</Typography>
                                    </div>
                                    <div>
                                        <Typography variant='subtitle2'>DAI Amount <span className={classes.accountBalance}>{daiBalance ? `Balance: ${daiBalance} DAI` : '-'}</span></Typography>
                                        <TextField placeholder='0' className={classes.input} margin="normal" variant="outlined" onChange={(event) => {
                                                store.set('joinAmount', event.target.value)
                                            }} InputProps={{
                                                endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                                            }} inputProps={{
                                                'aria-label' : 'bare'
                                            }}/>
                                    </div>
                                    <div className={classes.actionButtonContainer}>
                                        <Button color='primary'
                                            size='large'
                                            disabled={!canJoin}
                                            onClick={() => {
                                                this.join()
                                            }} variant="contained" disabled={!isSignedIn || !canJoin} className={classes.actionButton}>
                                            Convert
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item="item" xs={12} sm={12} md={6}>
                                <div className={classes.panel}>
                                    <Typography variant='h6'>Convert Chai to Dai</Typography>
                                    <br/>
                                    <div>
                                        <Typography variant='subtitle2'>Convert your Chai to the Dai ERC20</Typography>
                                    </div>
                                    <div>
                                        <Typography variant='subtitle2'>DAI Amount <span className={classes.accountBalance}>{chaiBalance? `Balance: ${chaiBalance} DAI` : '-'}</span></Typography>
                                        <TextField placeholder='0' className={classes.input} margin="normal" variant="outlined" onChange={(event) => {
                                                store.set('drawAmount', event.target.value)
                                            }} InputProps={{
                                                endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                                            }} inputProps={{
                                                'aria-label' : 'bare'
                                            }}/>
                                    </div>
                                    <div className={classes.actionButtonContainer}>
                                        <Button color='primary'
                                            size='large'
                                            disabled={!canDraw}
                                            onClick={() => {
                                                this.draw()
                                            }} variant="contained" disabled={!isSignedIn || !canDraw} className={classes.actionButton}>
                                           Convert
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                      </Grid>
              </Grid>
            }
        </Grid>
    }
}

export default withStyles(styles)(withStore(JoinDrawContainer))
