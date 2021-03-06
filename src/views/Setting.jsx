import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../redux/setting/setting.actions';

import { withBaseLayout } from '../layout/base';

const Setting = () => {
  const dispatch = useDispatch();
  const {
    isDarkTheme,
    playSound,
    showNotifications,
  } = useSelector(({ settings }) => settings);

  const handleChange = ({ target: { checked, name } }) => {
    dispatch(updateSettings(name, checked));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form className="centered-container-form">
          <div className="header">Adjust application settings</div>
          <div className="form-container">

            <div className="my-3">
              <div className="form-check">
                <input
                  checked={isDarkTheme}
                  onChange={handleChange}
                  id="darkTheme"
                  name="isDarkTheme"
                  type="checkbox"
                  className="form-check-input"
                />
                <label htmlFor="darkTheme" className="form-check-label">Dark Theme</label>
              </div>

              <div className="form-check">
                <input
                  checked={showNotifications}
                  onChange={handleChange}
                  name="showNotifications"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Enable Notification</label>
              </div>

              <div className="form-check">
                <input
                  checked={playSound}
                  onChange={handleChange}
                  name="playSound"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Sound notification</label>
              </div>
            </div>

            <button
              type="button"
              // eslint-disable-next-line no-undef
              onClick={() => electron.appApi.quitApp()}
              className="btn btn-danger"
            >
              Quit App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBaseLayout(Setting, { canGoBack: true });
