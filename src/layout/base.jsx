import React from 'react';

import { useRecoilValue } from 'recoil'
import { verifedUser } from '../recoil/user/selector';

import Navbar from '../components/Navbar/Navbar';

const BaseLayout = ({ children, ...rest }) => {
  const isVerify = useRecoilValue(verifedUser);

  return (
    <>
      {
        isVerify ? <Navbar {...rest} /> : ''
      }
      {children}
    </>
  )
}

export default BaseLayout;
