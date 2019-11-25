import React from 'react';
import Web3 from 'web3';

import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { approve } from '../actions/main'

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
    actionButton: {
      backgroundColor:'red'
    }
})

class RequestContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
    }

    approve() {
      approve.bind(this)()
    }

    render() {
        const {classes, store} = this.props
        const Available = store.get('allowanceAvailable')
        const walletAddress = store.get('walletAddress')
        console.log(Available)
        if (walletAddress == '' || Available) return null;
        return <Grid item="item" xs={12}>
            <p>Approval required
                      <Button color='primary'
                          size='large'
                          onClick={() => {
                              this.approve()
                          }} variant="contained" className={classes.actionButton}>
                          Approve
                      </Button>
            </p>
        </Grid>
    }
}

export default withStyles(styles)(withStore(RequestContainer))
