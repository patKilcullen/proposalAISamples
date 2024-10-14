import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDropzone } from 'react-dropzone';
import AppList from '@crema/components/AppList';

const DropZone = () => {
  const dropzone = useDropzone();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
  }, [dropzone.acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <aside>
        <AppList
          data={uploadedFiles}
        />
      </aside>
    </Box>
  );
};

export default DropZone;
