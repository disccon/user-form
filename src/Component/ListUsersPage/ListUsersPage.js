import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './ListUsersPage.scss'


const cx = classNames.bind(styles)


class ListUsersPage extends Component {
  render() {
    return (
      <Fragment>
        <h2>List of users</h2>
        <table>
          <thead>
          <tr>
            <th>name</th>
            <th>company</th>
            <th>contacts</th>
            <th>last update</th>
          </tr>
          </thead>
          <tbody>
          <tr></tr>
          <tr>
            <td>
              <div className={cx('wrapperUserName')}>
                <img/>
                <div>
                  <h4>Maxim Morozov</h4>
                  <span>username</span>
                </div>
              </div>
            </td>
            <td><div className={cx('wrapperUserName')}>Company name</div></td>
            <td><div className={cx('wrapperUserName')}>my_email233123123123@gmail.com</div></td>
            <td><div className={cx('wrapperUserName')}>3 month ago</div></td>
          </tr>
          <tr>
            <td>
              <div className={cx('wrapperUserName')}>
                <img/>
                <div>
                  <h4>Maxim Morozov</h4>
                  <span>username</span>
                </div>
              </div>
            </td>
            <td><div className={cx('wrapperUserName')}>Company name</div></td>
            <td><div className={cx('wrapperUserName')}>my_email233123123123@gmail.com</div></td>
            <td><div className={cx('wrapperUserName')}>3 month ago</div></td>
          </tr>
          <tr>
            <td>
              <div className={cx('wrapperUserName')}>
                <img/>
                <div>
                  <h4>Maxim Morozov</h4>
                  <span>username</span>
                </div>
              </div>
            </td>
            <td><div className={cx('wrapperUserName')}>Company name</div></td>
            <td><div className={cx('wrapperUserName')}>my_email233123123123@gmail.com</div></td>
            <td><div className={cx('wrapperUserName')}>3 month ago</div></td>
          </tr>
          <tr>
            <td>
              <div className={cx('wrapperUserName')}>
                <img/>
                <div>
                  <h4>Maxim Morozov</h4>
                  <span>username</span>
                </div>
              </div>
            </td>
            <td><div className={cx('wrapperUserName')}>Company name</div></td>
            <td><div className={cx('wrapperUserName')}>my_email233123123123@gmail.com</div></td>
            <td><div className={cx('wrapperUserName')}>3 month ago</div></td>
          </tr>
          </tbody>
        </table>
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
)(ListUsersPage)