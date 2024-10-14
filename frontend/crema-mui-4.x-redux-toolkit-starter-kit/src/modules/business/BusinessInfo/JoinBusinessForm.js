import React from 'react'
import ComingSoon from '../../errorPages/ComingSoon'
const JoinBusinessForm = () => {
  return (
    <>
      <div>This option is currently unavailable. Please create a business.</div>
      <ComingSoon removeAppInfoView={true} removeNotifyMe={true} />
    </>
  );
}

export default JoinBusinessForm