import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/auth.actions';

import BackBtn from '../shared/BackBtn';

const Navbar = ({ canGoBack, view }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      history.push('/');
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          {canGoBack && <BackBtn />}
          {view !== 'Setting' && (
            <Link to="/settings" className="btn btn-outline-success ml-2">
              Settings
            </Link>
          )}
        </div>
        <div className="chat-navbar-inner-right">
          {user && (
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger ml-3"
            >
              logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

// {currentUser && (
//   <>
//     <img
//       className="avatar rounded-circle mr-2"
//       style={{
//         width: '40px',
//       }}
//       src={userProfile.avatar}
//       alt="avatar"
//     />
//     <span className="logged-in-user">Hi {userProfile.username}</span>

//     <button
//       onClick={handleLogout}
//       className="btn btn-outline-danger ml-3"
//     >
//       logout
//     </button>
//   </>
// )}
