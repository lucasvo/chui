import React from 'react';
import { withStore } from '@spyna/react-store'
import { withStyles } from '@material-ui/styles';
import theme from '../theme/theme'
import { initBrowserWallet } from '../utils/web3Utils'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = () => ({
    navContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        minHeight: 52
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
        return <Grid item xs={12}>
            {<Grid className={classes.navContainer} container alignItems='center'>
              <Grid item xs={6}>
                  <Grid container alignItems='center'>
                        <Typography variant='h6'>
                          chai.stablecoin.services<br />
                          <Typography variant='subtitle1'>
                          Accrue interest on your Dai by turning it into Chai.
                        </Typography></Typography>
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
    }
}

export default withStyles(styles)(withStore(NavContainer))
