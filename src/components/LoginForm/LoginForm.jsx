import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/auth.actions';

import Loading from '../shared/Loading.js'

const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const error = useSelector(({auth}) => auth.login.error);
  const isChecking = useSelector(({auth}) => auth.login.isChecking);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = { email, password }
      dispatch(login(data))

    } catch (error) {
      return setErr(error.message)
    }
  }

  if (isChecking) {
    return <Loading />
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
        {error && <div className="alert alert-danger small">{error.message}</div>}
        <button type="submit" className="btn btn-outline-primary">Login</button>
      </div>
    </form>
  )
};

export default LoginForm;