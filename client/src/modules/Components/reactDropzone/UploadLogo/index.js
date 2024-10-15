import React, { useEffect, useState } from 'react';
import UploadModern from '../components/UploadModern';
import Box from '@mui/material/Box';
import { useDropzone } from 'react-dropzone';
import FileRow from '../components/FileRow';
import AppList from '@crema/components/AppList';

const UploadLogo = ({ setBusinessLogo }) => {
  const dropzone = useDropzone();
  // LIMIT TO ONE
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
    setBusinessLogo(dropzone.acceptedFiles);
  }, [dropzone.acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <UploadModern
        uploadText='Drag n drop your busines logo here, or click to select files'
        dropzone={dropzone}
      />
      <aside>
        <AppList
          data={uploadedFiles}
          renderRow={(file, index) => (
            <FileRow
              key={index + file.path}
              file={file}
              onDeleteUploadFile={onDeleteUploadFile}
            />
          )}
        />
      </aside>
    </Box>
  );
};

export default UploadLogo;
