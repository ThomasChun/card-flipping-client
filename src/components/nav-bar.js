import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import requiresLogin from './requires-login';

export class NavBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <div></div>
            )
        }
        // Only render the log out button if we are logged in
        let logOutButton;
        logOutButton = (<Link className='text' to='/' onClick={() => this.logOut()}>Log out</Link>);
        return (
            <div className='nav-bar'>
                <div className='gray-logo'> </div>
                <div className='nav-menu'>
                    <ul>
                        <li>Account: {this.props.currentUser.username}</li>
                        <li><i className='fa fa-home'></i> <Link className='text' to='/'>Home</Link></li>
                        <li><Link className='text' to='/link1'>Link 1</Link></li>
                        <li><Link className='text' to='/link2'>Link 2</Link></li>
                        <li><Link className='text' to='/link3'>Link 3</Link></li>
                        <li><Link className='text' to='/link4'>Link 4</Link></li>
                        <li><i className='fas fa-sign-out-alt'></i> {logOutButton}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(NavBar));