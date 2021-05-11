import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'

import { register, onAuthChange } from '../../js/api/auth';

import { useSetRecoilState } from 'recoil'
import { user } from '../../recoil/user/atom';

const RegisterForm = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')

  const setCurrentUser = useSetRecoilState(user)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = { email, password, username, avatar }
      await register(data)

      onAuthChange(authUser => {
        if (authUser) {
          setCurrentUser(authUser.uid)
          electron_methods.setLocalStorageItem('uid', authUser.uid);
          history.push('/home')
        } else {
          electron_methods.print('we are NOT authenticated')
        }
      });

    } catch (error) {
      return electron_methods.print(error);
    }

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
        {false && <div className="alert alert-danger small">Some Error</div>}
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </div>
    </form>
  )
};

export default RegisterForm;
