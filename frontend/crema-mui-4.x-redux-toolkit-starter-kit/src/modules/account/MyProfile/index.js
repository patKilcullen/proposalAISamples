
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoShareSocialOutline } from 'react-icons/io5';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AppAnimate from '@crema/components/AppAnimate';
import { Fonts } from '@crema/constants/AppEnums';
import FindProposal from '../../Projects/FindProposal';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import BusinessInfo from '../../business/BusinessInfo';
import AccountTabsWrapper from './AccountTabsWrapper';
import Information from './Information';
import Notification from './Notification';
import PersonalInfo from './PersonalInfo'
import ChangePassword from './ChangePassword/ChangePasswordRequest'
import BusinessIcon from '@mui/icons-material/Business';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Account = () => {
  const { user } = useAuthUser();

const navigate = useNavigate()

useEffect(() => {

      if (!user?.businessId?.onboardingComplete) {
        navigate('/business-onboarding');
      }
}, []);


    const [value, setValue] = React.useState(0);

  const onTabsChange = (event, newValue) => {
    setValue(newValue);
  };
  // My account tabs
  const tabs = [
    {
      id: 1,
      icon: <BiUser />,
      name: <IntlMessages id='common.personalInfo' />,
    },
    {
      id: 2,
      icon: <BusinessIcon />,
       name: (
        <IntlMessages
          id={'Business Info'}
        />
      ),
    },
    {
      id: 3,
      icon: <AiOutlineLock />,
      name: <IntlMessages id='common.changePassword' />,
    },
    // {
    //   id: 4,
    //   icon: <IoMdInformationCircleOutline />,
    //   name: <IntlMessages id='common.information' />,
    // },
    // {
    //   id: 5,
    //   icon: <IoShareSocialOutline />,
    //   name: <IntlMessages id='common.social' />,
    // },
    // {
    //   id: 6,
    //   icon: <NotificationsNoneIcon />,
    //   name: <IntlMessages id='healthCare.notification' />,
    // },
  ];
  return (
    <>
      <AppAnimate animation='transition.slideDownIn'>
        <Box
          component='h2'
          variant='h2'
          sx={{
            fontSize: 16,
            color: 'text.primary',
            fontWeight: Fonts.SEMI_BOLD,
            mb: {
              xs: 2,
              lg: 4,
            },
          }}
        >
          My Account
        </Box>
      </AppAnimate>
      <AccountTabsWrapper key='2'>
        <AppAnimate animation='transition.slideLeftIn' delay={300}>
          <Tabs
            className='account-tabs'
            value={value}
            onChange={onTabsChange}
            aria-label='basic tabs example'
            orientation='vertical'
          >
            {tabs.map((tab, index) => (
              <Tab
                className='account-tab'
                label={tab.name}
                icon={tab.icon}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </AppAnimate>
        <AppAnimate animation='transition.slideRightIn' delay={300}>
          <Box className='account-tabs-content'>
            {value === 0 && <PersonalInfo />}
  {value === 1 && <BusinessInfo />}
            {value === 2 && <ChangePassword message={"Send Password Reset Link"}/>}
            {/* {value === 3 && <Information />} */}
            {/* {value === 4 && <Notification />} */}
          </Box>
        </AppAnimate>
      </AccountTabsWrapper>
    </>
  );
};

export default Account;
