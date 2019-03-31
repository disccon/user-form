import React, { Component } from 'react'
import { connect } from 'react-redux'
import './reset.css'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import NodFound from '../NodFound/NodFound'
import Header from '../Header/Header'
import classNames from 'classnames'
import styles from './App.scss'
import { ReactComponent as LogoIcon } from "../../img/icon/logo.svg";
import { ReactComponent as AddUserIcon } from "../../img/icon/addUser.svg";
import { ReactComponent as LoginIcon } from "../../img/icon/login.svg";
import AddingNewUserPage from "../AddingNewUserPage/AddingNewUserPage";

const cx = classNames.bind(styles)

class App extends Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <div className={cx('container')}>
          <header>
            <a className={cx('logoA')}><LogoIcon className={cx('logoIcon')} alt='logoIcon'/></a>
            <a className={cx('addUserA')}><AddUserIcon className={cx('addUserIcon')} alt='addUserIcon'/><span>Add new user</span></a>
            <a className={cx('loginA')}><LoginIcon className={cx('loginIcon')} alt='loginIcon'/><span>List of users</span></a>
          </header>
          <Switch>
            <Route path='/NodFound' component={NodFound} />
            <Route path='/' component={AddingNewUserPage} />
            <Redirect to='/NodFound' />
          </Switch>
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
