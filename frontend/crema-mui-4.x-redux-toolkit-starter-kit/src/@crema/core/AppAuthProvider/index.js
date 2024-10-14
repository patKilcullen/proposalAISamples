import React from 'react';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

import JWTAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';

const AppAuthProvider = ({children}) => {
  const {fetchStart, fetchSuccess, fetchError, showMessage} =
    useInfoViewActionsContext();

  return (
    <JWTAuthProvider
      fetchStart={fetchStart}
      fetchError={fetchError}
      fetchSuccess={fetchSuccess}
      showMessage={showMessage}
    >
      {children}
    </JWTAuthProvider>
  );
};

export default AppAuthProvider;