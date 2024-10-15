import React from 'react';
import Box from '@mui/material/Box';
import { Button, makeStyles } from '@mui/material';
import clsx from 'clsx';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';

const AppFixedFooter = (props) => {
  const { footer, footerType } = useLayoutContext();

  const useStyles = makeStyles((theme) => ({
    footer: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 99,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      margin: '0',
      '& .footerContainer': {
        padding: '5px 20px',
        [theme.breakpoints.up('md')]: {
          paddingLeft: 32,
          paddingRight: 32,
        },
        [theme.breakpoints.up('xl')]: {
          padding: '10px 32px',
        },
      },
    },
  }));

  const classes = useStyles(props);

  return (
    <>
      {footer && footerType === 'fixed' ? (
        <Box className={clsx(classes.footer, 'footer fixed-footer')}>
          <Box
            className='footerContainer'
            alignItems='center'
            flexDirection='row'
            display='flex'
          >
            <Box>Copy right @crema 2021</Box>
            <Box ml='auto'>
              <Box sx={{ px: 5 }}>
                <Button color='primary'>Buy Now</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
