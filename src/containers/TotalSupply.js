import React from 'react';

import {withStore} from '@spyna/react-store'

class TotalSupplyContainer extends React.Component {
    render() {
      const {store} = this.props
      const chaiTotalSupply = store.get('chaiTotalSupply')
      if (chaiTotalSupply) {
        return (<p>Dai locked in Chai: {chaiTotalSupply.toFormat(5)} DAI</p>)
      } else {
        return ""
      }
    }
}

export default withStore(TotalSupplyContainer)
