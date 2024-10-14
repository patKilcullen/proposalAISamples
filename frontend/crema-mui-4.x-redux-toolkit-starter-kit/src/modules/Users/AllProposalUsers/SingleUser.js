import React, { useState, useMemo, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import Avatar from '@mui/material/Avatar';
import ContactDetail from 'modules/Users/ContactDetail';
import { grey } from '@mui/material/colors';
const SingleUser = (props) => {
  const {
    ass,
    role,
    user,
    isBusiness,
    business,
    sxStyle,
    userCanEdit,
    pid,
    businessType,
    hideRoleDisplay,
  } = props;
  const [openUserDetail, setOpenUserDetail] = useState(false);

  // GET COLOR FROM NAME - to avoid changing color when components rerender
  const generateColorFromName = (name) => {
    if (name) {
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = `#${(hash & 0x00ffffff).toString(16).padStart(6, '0')}`;
      return color;
    }
  };

  const userColor = useMemo(
    () =>
      generateColorFromName(user?.userName || user?.businessName || user?.id),
    [user?.userName, user?.id],
  );

  return (
    <Box>
      <Card
        sx={{
          ...sxStyle,
          boxShadow: '0',
          // boxShadow: `2px 2px 2px ${grey[500]}`,
          // border: ".1px solid",
          borderColor: grey[500],
          p: 2,
          // mb: 3,
          mt: 1,
          position: 'relative', // Add relative positioning to the Card to contain absolutely positioned children
        }}
        className='item-hover'
        onClick={() => setOpenUserDetail(true)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mr: { sm: 5 },

              mb: { xs: 3, sm: 0 },
              '.crUserImage': {
                objectFit: 'cover',
                borderRadius: (theme) =>
                  theme.components.MuiCard.styleOverrides.root.borderRadius,
                width: { sx: '100%', sm: 65 },
                height: { sx: 90, sm: 65 },
              },
            }}
          >
            {/* PICTURE/AVATAR */}
            {/* if admin and has logo(for business) display that, othewise if user has profile pic,
            display that, otherwith get backgroun color from name */}
            {role?.role === 'clientAdmin' || role?.role === 'businessAdmin' ? (
              user?.logo ? (
                <Avatar
                  sx={{
                    marginRight: 2,
                    height: { sx: 90, sm: 25, xs: 20 },
                    width: { sx: '100%', sm: 25, xs: 20 },
                  }}
                  src={`${process.env.REACT_APP_SERVER_URL}${user?.logo}`}
                />
              ) : user?.profileUrl ? (
                <Avatar
                  sx={{
                    marginRight: 2,
                    height: { sx: 90, sm: 25, xs: 20 },
                    width: { sx: '100%', sm: 25, xs: 20 },
                  }}
                  src={`${process.env.REACT_APP_SERVER_URL}${user?.profileUrl}`}
                />
              ) : (
                <Avatar
                  sx={{
                    marginRight: 2,
                    width: { sx: '100%', sm: 25, xs: 20 },
                    height: { sx: 90, sm: 25, xs: 20 },
                    backgroundColor: userColor,
                  }}
                >
                  {isBusiness
                    ? user?.businessName?.substring(0, 1).toUpperCase()
                    : user?.userName?.substring(0, 1).toUpperCase() }
                </Avatar>
              )
            ) : user?.profileUrl ? (
              <Avatar
                sx={{
                  marginRight: 2,
                  height: { sx: 90, sm: 25, xs: 20 },
                  width: { sx: '100%', sm: 25, xs: 20 },
                }}
                src={`${process.env.REACT_APP_SERVER_URL}${user?.profileUrl}`}
              />
            ) : (
              <Avatar
                sx={{
                  marginRight: 2,
                  width: { sx: '100%', sm: 25, xs: 20 },
                  height: { sx: 90, sm: 25, xs: 20 },
                  backgroundColor: userColor,
                }}
              >
                {isBusiness
                  ? user?.businessName?.substring(0, 1).toUpperCase()
                  : user?.userName?.substring(0, 1).toUpperCase()}
              </Avatar>
            )}
            {/* NAME */}
            <Box
              component='h3'
              sx={{
                fontSize: 14,
                fontWeight: Fonts.BOLD,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '200%',
              }}
            >
              {isBusiness ? user?.businessName : user?.userName}
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                mb: 1,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                color: 'text.secondary',
              }}
            ></Box>

            <Box
              sx={{
                pr: { lg: 6, xl: 16 },
              }}
            >
              {/* ROLE */}
              <Box
                component='p'
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  width: '200%',
                  ml: 8,
                  mt: -2,
                }}
              >
                {!hideRoleDisplay && role?.displayRole}
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      <ContactDetail
        selectedContact={user}
        isShowDetail={openUserDetail}
        onShowDetail={setOpenUserDetail}
        role={role}
        isBusiness={isBusiness}
        business={business}
        userCanEdit={userCanEdit}
        pid={pid}
        businessType={businessType}
      />
    </Box>
  );
};

export default SingleUser;
