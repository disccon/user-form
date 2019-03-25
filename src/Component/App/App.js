import React, { Component } from 'react'
import { connect } from 'react-redux'
import './reset.css'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import NodFound from '../NodFound/NodFound'
import Header from '../Header/Header'
import classNames from 'classnames'
import styles from './App.scss'

const cx = classNames.bind(styles)

class App extends Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <div className={cx('container')}>
          {/*<Switch>*/}
            {/*<Route path='/NodFound' component={NodFound} />*/}
            {/*<Route path='/' component={AddingNewUser} />*/}
            {/*<Redirect to='/NodFound' />*/}
          {/*</Switch>*/}
          <Header/>
        </div>
      </ConnectedRouter>
    )
  }
}

App.propTypes = {
}

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
)(App)
