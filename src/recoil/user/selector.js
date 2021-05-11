import { selector } from 'recoil';
import { user } from './atom';

export const verifedUser = selector({
  key: 'isLoggedIn',
  get: ({ get }) => {
    const currentUser = get(user);
    if (currentUser) return true;

    return false;
  },
});
