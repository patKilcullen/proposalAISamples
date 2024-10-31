import React from 'react';
import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropsTypes from 'prop-types';

const FileRow = ({ file, onDeleteUploadFile }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        mb: 2.5,
        borderRadius: 2.5,
        p: 2.5,
      }}
    >
      <Box sx={{ mr: 3 }}>
        <InsertDriveFileIcon />
      </Box>
      
      <a href={file.preview} target='_blank' rel='noopener noreferrer'>
        <Box sx={{ flex: 1 }}>
          <Typography>{file.path}</Typography>
          <Box
            component='span'
            sx={{
              color: 'text.secondary',
            }}
          >
            {file.size} bytes
          </Box>
        </Box>
  </a>
      <IconButton
        sx={{
          padding: 1.5,
          fontSize: 16,
        }}
        onClick={() => onDeleteUploadFile(file)}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
};

export default FileRow;
FileRow.propTypes = {
  file: PropsTypes.object,
  onDeleteUploadFile: PropsTypes.func,
};
