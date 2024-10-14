import React from 'react'
import ComingSoon from 'modules/errorPages/ComingSoon'

const Dashboard = () => {
  return (
    <div>
        <ComingSoon removeAppInfoView={true} removeNotifyMe={true} />
    </div>
  )
}

export default Dashboard