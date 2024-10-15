import dynamic from 'next/dynamic';
import React from 'react';
import AppLoader from '../AppLoader';

const AppAsyncComponent = (importComponent) => {
  return dynamic(importComponent, {
    loading: () => <AppLoader />,
  });
};
export default AppAsyncComponent;
