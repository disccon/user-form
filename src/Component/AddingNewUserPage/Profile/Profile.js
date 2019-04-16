import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import styles from './Profile.scss'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {forwardBackProfile} from '../../../Actions'
import DatePicker from 'react-date-picker';
// import DatePicker from 'react-date-picker/dist/entry.nostyle'
import {ReactComponent as CalendarIcon} from '../../../img/icon/calendar.svg'
import PropTypes from "prop-types";


const cx = classNames.bind(styles)

const renderFieldInput = ({label, input, type, meta: {touched, error}, className}) => (
    <label className={cx('profile__label')}>
        <h4>{label}</h4>
        <span>*</span>
        <input {...input} type={type} className={className}/>
        {touched && error && <p>{error}</p>}
    </label>
)

const renderFieldRadio = ({label, input, type, name, meta: {touched, error},}) => (
    <Fragment>
        <label>
            <input {...input} type={type} name={name}
            />
            <span>{label}</span>
        </label>
        {input.value === 'female' && touched && error && <p>{error}</p>}
    </Fragment>
)

const renderDateTimePicker = ({input, meta: {touched, error}}) => (
    <Fragment>
        <div className={cx('profile__birthDate')}>
            <h4>Birth date</h4>
            <span className={cx('profile__birthDateSpan')}>*</span>
            <DatePicker clearIcon='' calendarIcon={<CalendarIcon/>}
                        className={cx('profile__datePicker')}
                        isOpen={true}
                        locale='en'
                        {...input}
                        onBlur={() => input.onBlur()}
                        onChange={input.onChange}
                        value={input.value}
                        calendarClassName='profile__react-calendar'/>
            {touched && error && <p className={cx('birthDate__error')}>{error}</p>}
        </div>
    </Fragment>
)


class Profile extends Component {
    onSubmit = values => {
        const {forwardBackProfile} = this.props;
        forwardBackProfile('forward', values.firstName, values.lastName, values.birthDate, values.email, values.address, values.gender)
    }

    backProfile = () => {
        const {firstNameForm, lastNameForm, birthDateForm, emailForm, addressForm, forwardBackProfile, maleGender} = this.props;
        forwardBackProfile('back', firstNameForm, lastNameForm, birthDateForm, emailForm, addressForm, maleGender)
    }

    render() {
        const {handleSubmit} = this.props
        return (
            <div className={cx('profile')}>
                <form className={cx('profile__form')} onSubmit={handleSubmit(this.onSubmit)}>
                    <div className={cx('profile__sideLeft')}>
                        <Field component={renderFieldInput} type="text"
                               label='First name' name="firstName"/>
                        <Field component={renderFieldInput} type="text"
                               label='Last name' name="lastName"/>
                        <Field name='birthDate' component={renderDateTimePicker}/>
                    </div>
                    <div className={cx('profile__sideRight')}>
                        <Field component={renderFieldInput} type="text"
                               label='Email' name="email"/>
                        <Field component={renderFieldInput} type="text"
                               label='Address' name="address"/>
                        <h5>Gender</h5>
                        <div className={cx('wrapperGender')}>
                            <Field component={renderFieldRadio} type="radio"
                                   label='Male' name="gender" value='male'/>
                            <Field component={renderFieldRadio} type="radio"
                                   label='Female' name="gender" value='female'/>
                        </div>
                        <div className={cx('wrapperButton')}>
                            <button type='button' onClick={this.backProfile} className={cx('profile__back')}>Back
                            </button>
                            <button type='submit' className={cx('profile__forward')}>Forward</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

Profile.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    gender: PropTypes.string,
    birthDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ])

}


Profile = reduxForm({
    validate: values => {
        const errors = {}

        if (!values.birthDate) {
            errors.birthDate = 'Missing Birth Date'
        } else if ((new Date().getFullYear() - values.birthDate.getFullYear()) < 18) {
            errors.birthDate = 'Sorry, you must be at least 18 years old'
        }

        if (!values.gender) {
            errors.gender = 'Missing Gender'
        }

        if (!values.firstName) {
            errors.firstName = 'Missing First name'
        } else if (values.firstName.length <= 2) {
            errors.firstName = 'Must be 3 characters or more'
        }
        if (!values.lastName) {
            errors.lastName = 'Missing Last name'
        } else if (values.lastName.length <= 2) {
            errors.lastName = 'Must be 3 characters or more'
        }

        if (!values.address) {
            errors.address = 'Missing Address'
        }
        if (!values.email) {
            errors.email = 'Missing Email'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        return errors;
    },
    form: 'Profile',
})(Profile)


const mapStateToProps = state => {
    const selector = formValueSelector('Profile')
    const firstNameForm = selector(state, 'firstName')
    const lastNameForm = selector(state, 'lastName')
    const emailForm = selector(state, 'email')
    const addressForm = selector(state, 'address')
    const maleGender = selector(state, 'gender')
    const birthDateForm = selector(state, 'birthDate')
    const {firstName, lastName, email, address, gender, birthDate,} = state.newUser
    return {
        initialValues: {
            firstName, lastName, birthDate, email, address, gender,
        },
        firstNameForm, lastNameForm, birthDateForm, emailForm, addressForm, maleGender,
    }
}

export default Profile = connect(
    mapStateToProps,
    {forwardBackProfile}
)(Profile)



