import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useRecoilValue, useResetRecoilState } from 'recoil';
import { user } from '../../recoil/user/atom';

import { logout } from '../../js/api/auth';

const Navbar = () => {
  const history = useHistory();
  const currentUser = useRecoilValue(user);
  const resestUser = useResetRecoilState(user);
  electron_methods.print({ currentUser });

  const handleLogout = () => {
    electron_methods.clearLocalStorage();
    logout();
    resestUser();
    history.push('/');
  };

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button
            className="btn btn-outline-primary"
            onClick={() => history.goBack()}
          >
            Back
          </button>
          <Link to="/settings" className="btn btn-outline-success ml-2">
            Settings
          </Link>
        </div>
        <div className="chat-navbar-inner-right">
          {!currentUser ? (
            <Link to="/" className="btn btn-outline-success ml-2">
              Login
            </Link>
          ) : (
            <>
              <span className="logged-in-user">Hi User</span>
              <button
                to="/"
                onClick={handleLogout}
                className="btn btn-outline-danger ml-2"
              >
                logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
