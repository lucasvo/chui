import React from 'react';
import { withStore } from '@spyna/react-store'
import { withStyles } from '@material-ui/styles';
import theme from '../theme/theme'
import { initBrowserWallet } from '../utils/web3Utils'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = () => ({
    navContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(9),
        minHeight: 120
    },
    logo: {
        height: 22,
        width: 25,
        marginRight: theme.spacing(1)
    },
    accountButton: {
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
    return <div>
              <Dialog
                 open={
                   //kovan set up
                   network !== 42}
              >
              <DialogTitle id="alert-dialog-title">{"Wrong network"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <p>Switch to the Kovan network to interact with the current deployment</p>
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
      <Grid item xs={12}>
            {<Grid className={classes.navContainer} container alignItems='center'>
              <Grid item xs={6}>
                  <Grid container alignItems='center'>
                          <Typography variant='h1'>chai.money</Typography>
                          <Typography variant='subtitle1'>
                          Accrue interest on your Dai by turning it into Chai.
                        </Typography>
                  </Grid>
              </Grid>
              <Grid item xs={6}>
                  <Grid container justify='flex-end'>
                  <Button color='primary' onClick={initBrowserWallet.bind(this)} variant={walletAddress ? 'text' : "contained"} className={classes.accountButton}>
                    {walletAddress ? (walletAddress.slice(0,7) + '...' + walletAddress.slice(walletAddress.length - 5)) : 'Connect wallet'}
                  </Button>
                  </Grid>
              </Grid>
            </Grid>}
        </Grid>
      </div>
    }
}

export default withStyles(styles)(withStore(NavContainer))
