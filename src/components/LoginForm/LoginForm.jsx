import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { login, getUserProfile } from '../../js/api/auth';

import { useSetRecoilState } from 'recoil';
import { user, profile } from '../../recoil/user/atom';

const LoginForm = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [err, setErr] = useState(null)

  const setCurrentUser = useSetRecoilState(user)
  const setProfile = useSetRecoilState(profile);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = { email, password }
      const res = await login(data)
      const profileRes = await getUserProfile(res.uid)

      setCurrentUser(res.uid)
      setProfile(profileRes)
      localStorage.setItem('uid', res.uid);
      history.push('/home')
    } catch (error) {
      return setErr(error.message)
    }
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
        {err && <div className="alert alert-danger small">{err}</div>}
        <button type="submit" className="btn btn-outline-primary">Login</button>
      </div>
    </form>
  )
};

export default LoginForm;