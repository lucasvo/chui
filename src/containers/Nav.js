import React from 'react';
import { withStore } from '@spyna/react-store'
import { withStyles } from '@material-ui/styles';
import theme from '../theme/theme'
import { initBrowserWallet } from '../utils/web3Utils'
import config from '../config.json';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import logostill from '../assets/logostill.png'

const styles = () => ({
    navContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(9),
        minHeight: 120
    },
    title: {
      fontStyle: 'italic',
      lineHeight: '0.8em',
      display:'block',
      fontSize: '40pt'
    },
    subtitle: {
      marginTop: '0px',
      fontStyle: 'regular',
      fontSize: '12pt'
    },
    logo: {
        height: 150,
        display:'inline-block',
        float:'left',
        marginTop:'-50px',
        marginRight: theme.spacing(1)
    },
    accountItem: {
      float: 'right',
    },
    accountButton: {
      float: 'right',
      '& svg': {
        marginRight: theme.spacing(1)
      }
    }
})

class NavContainer extends React.Component {
    async componentDidMount() {
    }

  render() {
        const {
            classes,
            store
        } = this.props

        const walletAddress = store.get('walletAddress')
        const web3Failure = store.get('web3Failure')
        const network = store.get('network')
    return <Grid item sm={12}>
              <Dialog
                 open={
                   network !== config.network}
              >
              <DialogTitle id="alert-dialog-title">{"Wrong network"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <p>Switch to mainnet to interact with this app</p>
                </DialogContentText>
              </DialogContent>
            </Dialog>
              <Dialog
                  open={web3Failure}
                  onClose={(event) => {store.set('web3Failure', false)}}
              >
              <DialogTitle id="alert-dialog-title">{"Failed to connect to web3"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <p>Unable to connect to wallet.</p>
                   <a target="_blank" href="https://metamask.io/" rel="noopener noreferrer">Install metamask</a>
                </DialogContentText>
              </DialogContent>
            </Dialog>
        <Grid container className={classes.navContainer} alignItems='center'>
          <Grid item sm={12} md={8}>
            <img src={logostill} className={classes.logo} />
            <div className={classes.title}>
              <span className={classes.title}>chai.money</span>
              <span className={classes.subtitle}>
                 Accrue interest on your Dai by turning it into Chai.
              </span>
            </div>
          </Grid>
          <Grid item sm={12} md={4} className={classes.accountItem}>
            <Button color='primary' onClick={initBrowserWallet.bind(this)} variant={walletAddress ? 'text' : "contained"} className={classes.accountButton}>
                      {walletAddress ? (walletAddress.slice(0,7) + '...' + walletAddress.slice(walletAddress.length - 5)) : 'Connect wallet'}
            </Button>
          </Grid>
        </Grid>
    </Grid>
    }
}

export default withStyles(styles)(withStore(NavContainer))
