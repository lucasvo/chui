import React from 'react';
import { createStore } from '@spyna/react-store'
import Web3 from 'web3';

import config from './config.json';
import daiABI from './abi/Dai.abi.json';
import potABI from './abi/Pot.abi.json';
import chaiABI from './abi/Chai.abi.json';

import NavContainer from './containers/Nav'
import SaveDrawContainer from './containers/JoinExit'
import ChaiBalanceContainer from './containers/ChaiBalance'
import MoveDaiContainer from './containers/MoveDai'
import {setupContracts, getData} from './utils/web3Utils'

import theme from './theme/theme'

import { withStyles, ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'


const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
  },
  navContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    minHeight: 52
  },
  contentContainer: {
      // boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.05)',
      borderRadius: theme.shape.borderRadius,
      padding: 0,
      marginBottom: theme.spacing(3)
  }
})

const web3 = new Web3(new Web3.providers.HttpProvider(config.defaultWeb3Provider));
const initialState = {
    web3: web3,
    web3Failure: false,
    network: 1,
    potObject: new web3.eth.Contract(potABI, config.MCD_POT),
    daiObject: new web3.eth.Contract(daiABI, config.MCD_DAI),
    chaiObject: new web3.eth.Contract(chaiABI, config.CHAI),
    walletAddress: '',
    walletConnecting: false,
    walletType: '',
    daiBalance: '',
    daiAllowance: '',
    allowanceAvailable: false,
    chaiBalance: '',
    chaiBalanceRaw: '',
    dsrRaw: '',
    dsr: '',
    chi: '',
    chiRaw:'',
    joinexitAction: 0,
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    render() {
        const classes = this.props.classes
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid item xs={12}><br/></Grid>
                        <NavContainer />

                        <Grid item xs={12} md={6}>
                            <SaveDrawContainer />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ChaiBalanceContainer />

                        </Grid>
                        <Grid item xs={12}>
                          <MoveDaiContainer />
                        </Grid>
                        <Grid item xs={12}>
                          Interacting with the Chai contract at: <a target="_blank" href={"https://etherscan.io/token/" + config.CHAI} rel="noopener noreferrer">{config.CHAI}</a>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        );
    }
}

export default createStore(withStyles(styles)(App), initialState)
