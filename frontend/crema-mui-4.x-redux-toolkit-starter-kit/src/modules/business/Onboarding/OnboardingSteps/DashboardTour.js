import React, {useEffect} from 'react'

import ReactPlayer from 'react-player';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import ComingSoon from 'modules/errorPages/ComingSoon'




const DashboardTour = ({ onboardingSave, setOnboardingSave, handleNext }) => {
   

// MOVE TO NEXT STEPPER
  useEffect(() => {
    if (onboardingSave === true) {
      handleNext();
    }
    setOnboardingSave(false);
  }, [onboardingSave]);

  return (
    <div>
      <AppComponentHeader
        title='Dashboard Tour'
        description="learn how to navigate ProposalAI's dashboard!"
      />
      {/* <ReactPlayer
        controls={true}
        // url='https://www.dailymotion.com/video/x5e9eog'
        url='https://www.youtube.com/watch?v=vh5_i0xRA80'
      /> */}
      <ComingSoon removeAppInfoView={true} removeNotifyMe={true} />
    </div>
  );
};

export default DashboardTour
