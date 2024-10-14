import React from 'react';

const AppInfoViewContext = React.lazy(() => import('./ContextView'));
const AppInfoViewRedux = React.lazy(() => import('./ReduxView'));

const AppInfoView = ({ type }) => {

  if (type === 'context') {
    return <AppInfoViewContext />;
  }
  return <AppInfoViewRedux />;
};

export default AppInfoView;
