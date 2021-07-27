import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/auth.actions';

import Loading from '../shared/Loading.js'

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector(({auth}) => auth.register.error);
  const isChecking = useSelector(({auth}) => auth.register.isChecking);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = { email, password, username, avatar }
      dispatch(register(data))

    } catch (error) {
      console.log({ error });
      return setErr(error);
    }
  }

  if (isChecking) {
    return <Loading />
  }

  return (
    <form onSubmit={handleSubmit} className="centered-container-form">
      <div className="header">Create an account</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            name="avatar"
            className="form-control"
            id="avatar"
            aria-describedby="emailHelp"
            onChange={(e) => setAvatar(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger small">{error.message}</div>}
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </div>
    </form>
  )
};

export default RegisterForm;
