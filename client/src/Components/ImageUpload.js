import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AppGrid from '@crema/components/AppGrid';
import { UploadModern, FileRow } from './reactDropzone/components';

const ImgUpload = ({ uploadedFiles, setUploadedFiles }) => {

  const dropzone = useDropzone({
    accept: {
      'image/png': ['.png', '.jpeg', '.jpg'],
    },
 
    onDrop: (acceptedFiles) => {

      setUploadedFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
  }, [dropzone.acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
  };

  return (
    <section className='container' style={{ cursor: 'pointer' }}>
      <UploadModern
        uploadText='Drag n drop some files here, or click to select files'
        setUploadedFiles={setUploadedFiles}
        dropzone={dropzone}
      />

      <AppGrid
        sx={{
          maxWidth: 500,
        }}
        data={uploadedFiles}
        column={4}
        itemPadding={5}
        renderRow={(file, index) => (
          <div>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                 width: "500px"
                }}
              >
                <FileRow
                  file={file}
                  onDeleteUploadFile={onDeleteUploadFile}
                  key={index + file.path}
                />
              </div>
            ))}
          </div>
        )}
      />
    </section>
  );
};




const imageWrapperStyles = {
  width: '400px',
  height: '200px',
//   overflow: 'hidden',
  margin: '10px',
//   border: '1px solid #cccccc',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none', // To remove the default link styling
};

const imageStyles = {
//   width: '100%',
//   height: '100%',
  objectFit: 'cover',
};
export default ImgUpload;

