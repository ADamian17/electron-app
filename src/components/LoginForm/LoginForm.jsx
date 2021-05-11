import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '../../js/api/auth';

import { useSetRecoilState } from 'recoil';
import { user } from '../../recoil/user/atom';

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { email, password }
    debugger
    login(data)
  }

  return (
    <form onSubmit={handleSubmit} className="centered-container-form">
      <div className="header">Welcome here!</div>
      <div className="subheader">Login and chat with other people!</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        {false && <div className="alert alert-danger small">Some error</div>}
        <button type="submit" className="btn btn-outline-primary">Login</button>
      </div>
    </form>
  )
};

export default LoginForm;