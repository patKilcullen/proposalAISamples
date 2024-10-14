import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

const AppsStarredIcon = ({ item, onChange }) => {
  return (
    <Checkbox
      sx={{
        color: (theme) => theme.palette.warning.main,
        '&.Mui-checked': {
          color: (theme) => theme.palette.warning.main,
        },
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      }}
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
      checked={item?.isStarred || false}
      onChange={(event) => onChange(event.target.checked, item)}
    />
  );
};

export default AppsStarredIcon;

AppsStarredIcon.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
};
