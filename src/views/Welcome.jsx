import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/ResgisterForm/ResgisterForm';

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true);
  const user = useSelector(({ auth }) => auth.user);

  const ctaObj = isLogin
    ? { text: 'Not registered yet', btnText: 'Register' }
    : { text: 'Already registered?', btnText: 'login' };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        {
          isLogin ? (
            <>
              <LoginForm />

            </>
          ) : (
            <RegisterForm />
          )
        }
        <small className="form-text text-muted mt-2">
          {ctaObj.text}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="btn-link ml-2"
          >
            {ctaObj.btnText}

          </span>
        </small>
      </div>
    </div>
  );
};

export default Welcome;
