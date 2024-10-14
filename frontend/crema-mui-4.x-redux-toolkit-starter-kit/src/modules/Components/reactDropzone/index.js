import React from 'react';
import Grid from '@mui/material/Grid';

import AppComponentCard from '@crema/components/AppComponentCard';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';
import Basic from './Basic';
import BasicSource from '!raw-loader!./Basic';
import StylingDropzone from './StylingDropzone';
import StylingDropzoneSource from '!raw-loader!./StylingDropzone';
import DialogProgrammatically from './DialogProgrammatically';
import DialogProgrammaticallySource from '!raw-loader!./DialogProgrammatically';
import Previews from './Previews';
import PreviewsSource from '!raw-loader!./Previews';

const ReactDropzone = () => {
  return (
    <>
      <AppComponentHeader
        title="React Dropzone"
        description="Simple React hook to create a HTML5-compliant drag'n'drop zone for files."
        refUrl="https://react-dropzone.netlify.com/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Basic"
            component={Basic}
            source={BasicSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Styling Dropzone"
            component={StylingDropzone}
            source={StylingDropzoneSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Previews"
            component={Previews}
            source={PreviewsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Dialog Programmatically"
            component={DialogProgrammatically}
            source={DialogProgrammaticallySource}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ReactDropzone;
