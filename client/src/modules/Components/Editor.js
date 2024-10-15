import React from "react";
import ReactQuill from 'react-quill';
import { toolbarOptions, textReplaceToolbarOptions } from './EditorToolbar'
import styled from '@emotion/styled';

// STYLE FOR EDITOR
const ReactQuillWrapper = styled(ReactQuill)(() => {
  return {
    '& .ql-editor, & .ql-container': {
      maxHeight: '100% !important',
       fontFamily: "'Be Vietnam', serif !important" 
    },
    '& .ql-toolbar': {
      borderRadius: '8px 8px 0 0',
    },
    '& .ql-container': {
      borderRadius: '0 0 8px 8px',
      minHeight: 150,
      maxHeight: 200,
    }, 
  };
});




const Editor = ({content, onChange, readOnly, textReplace}) => {


    const module = {
toolbar: textReplace ? textReplaceToolbarOptions : toolbarOptions
}
  return  <ReactQuillWrapper
            modules={module} 
              //  use regex to propoerly display proposal contnet
               value={content?.replace(/\n/g, '<br />')}
              // preserveWhiteSpace to true to avoid space bar moving cursor to next line
               preserveWhitespace={true}
              name='proposalContent'
               theme='snow'
               placeholder='PRoposal here'
              onChange={onChange}
              // do not let users edit if not latest version or if status is returned(so they can't edit history)
               readOnly={readOnly}
              
            />
};

export default Editor;
