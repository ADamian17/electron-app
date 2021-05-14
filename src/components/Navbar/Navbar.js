import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import { user, profile } from '../../recoil/user/atom';

import { logout, getUserProfile } from '../../js/api/auth';

import BackBtn from '../shared/BackBtn';

const Navbar = ({ canGoBack, view }) => {
  const history = useHistory();

  const currentUser = useSelector((state) => state.auth.userId);

  const resetProfile = useResetRecoilState(profile);
  const [userProfile, setUserProfile] = useRecoilState(profile);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await getUserProfile(currentUser);
    // setUserProfile(res);
    console.log('%c currentUser', 'color: green', currentUser);
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      resetProfile();
      resestUser();
      await logout();
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
          {userProfile && (
            <>
              <img
                className="avatar rounded-circle mr-2"
                style={{
                  width: '40px',
                }}
                src={userProfile.avatar}
                alt="avatar"
              />
              <span className="logged-in-user">Hi {userProfile.username}</span>

              <button
                onClick={handleLogout}
                className="btn btn-outline-danger ml-3"
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
