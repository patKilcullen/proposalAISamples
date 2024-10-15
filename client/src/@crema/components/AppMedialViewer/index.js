import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Zoom from '@mui/material/Zoom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MediaSlider from './MediaSlider';

const settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const renderRow = (data, index) => {
  if (data.mime_type.startsWith('image')) {
    return (
      <img
        key={'IMAGE-' + index}
        src={data.url}
        alt={data.name ? data.name : 'detail view'}
      />
    );
  } else if (data.mime_type.startsWith('docs')) {
    return (
      <div className='embed-responsive'>
        <iframe
          key={'DOC-' + index}
          src={data.url}
          title={data.name ? data.name : 'detail view'}
        />
      </div>
    );
  } else {
    return (
      <div className='embed-responsive'>
        <iframe
          key={'DOC-' + index}
          src={data.url}
          title={data.name ? data.name : 'detail view'}
        />
      </div>
    );
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});

const AppMedialViewer = ({ index, medias, onClose }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (index > -1) setOpen(true);
    else {
      setOpen(false);
    }
  }, [index]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paperFullScreen': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'rgb(49, 53, 65)',
          color: (theme) => theme.palette.common.white,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton
          sx={{
            color: (theme) => theme.palette.common.white,
            position: 'absolute',
            left: 10,
            top: 10,
            zIndex: 1,
          }}
          onClick={onClose}
          size='large'
        >
          <HighlightOffIcon />
        </IconButton>
        {index >= 0 ? (
          <MediaSlider>
            <Slider
              settings={{ ...settings, initialSlide: index }}
              slickGoTo={index}
            >
              {medias.map((data, index) => renderRow(data, index))}
            </Slider>
          </MediaSlider>
        ) : null}
      </Box>
    </Dialog>
  );
};

export default AppMedialViewer;
AppMedialViewer.propTypes = {
  index: PropTypes.number,
  medias: PropTypes.array,
  onClose: PropTypes.func,
};
