import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { createChat } from '../../redux/chats/chats.actions';

import { withBaseLayout } from '../../layout/base';

import db from '../../js/firebase/firebase';

const NewChat = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const [err, setErr] = useState(null);

  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      dispatch(createChat({ name, description, image }, user.uid));
      history.push('/home');
    } catch (error) {
      return setErr(error);
    }
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit} className="centered-container-form">
          <div className="header">Create a chat</div>
          <div className="form-container">
            {/* r1 */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                aria-describedby="name"
                placeholder="e.g cool chat"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* r2 */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                placeholder="e.g best framework"
                name="description"
                id="description"
                cols="30"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* r3 */}
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                name="image"
                id="image"
                aria-describedby="image"
                placeholder="image url"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {err && <div className="alert alert-danger small">{err}</div>}
            <button type="submit" className="btn btn-outline-primary float-right">New Chat</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBaseLayout(NewChat, { canGoBack: true });
