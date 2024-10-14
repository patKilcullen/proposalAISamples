import React, {useEffect, useState} from 'react';
import AppMessageView from '../AppMessageView';
import AppLoader from '../AppLoader';
import { HIDE_MESSAGE } from '@crema/constants/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';


const AppInfoViewRedux = () => {
  const { error, loading, message } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  const clearInfoView = () => {

    dispatch(dispatch({ type: HIDE_MESSAGE }));
  };






  const [messages, setMessages]= useState([])

  // Effect to increment count when message changes
  useEffect(() => {
    if (message) {
  setMessages((prevMessages) => [...prevMessages, message]);
    }
  }, [message]); // Dependency on `message` to run this effect
  



  const showMessage = () => {

    return (
    <AppMessageView

        variant='success'
        message={message.toString()}
        clearInfoView={clearInfoView}
        messages={messages}
      />
 
    );
  };

  const showError = () => {

    return (
      <AppMessageView
        variant='error'
         message={error.toString()}
        clearInfoView={clearInfoView}
      />
    );
  };

  return (
    <>
      {loading && <AppLoader />}

      {message && showMessage()}
       
      {error && showError()}
    </>
  );
};

export default AppInfoViewRedux;


// TESTING FOR STACKING NOTIFICATIONS

// import React, { useEffect, useState } from 'react';
// import AppMessageView from '../AppMessageView';
// import AppLoader from '../AppLoader';
// import { HIDE_MESSAGE } from '@crema/constants/ActionTypes';
// import { useDispatch, useSelector } from 'react-redux';

// const AppInfoViewRedux = () => {
//   const { error, loading, message } = useSelector(({ common }) => common);
//   const dispatch = useDispatch();

//   const clearInfoView = () => {
//     dispatch({ type: HIDE_MESSAGE });
//   };

//   const [count, setCount] = useState(0);
//   const [messages, setMessages] = useState([]);

//   // Effect to log count changes
//   useEffect(() => {
//     console.log('COUNT: ', count);
//   }, [count]);

//   // Effect to track new messages from Redux state
//   useEffect(() => {
//     if (message) {
//       setCount((prev) => prev + 1);
//       setMessages((prevMessages) => [...prevMessages, message]); // Append new message
//     }
//   }, [message]); // Dependency on `message` to run this effect

//   // Function to render messages dynamically
//   const renderMessages = () => {
//     return messages.map((msg, index) => (
//       <AppMessageView
//         key={index}
//         variant="success"
//         message={msg.toString()}
//         clearInfoView={clearInfoView}
//         stackCount={index} // Pass the index to control stacking
//       />
//     ));
//   };

//   const showError = () => {
//     return (
//       <AppMessageView
//         variant="error"
//         message={error.toString()}
//         clearInfoView={clearInfoView}
//       />
//     );
//   };

//   return (
//     <>
//       {loading && <AppLoader />}
//       {renderMessages()}
//       {error && showError()}
//     </>
//   );
// };

// export default AppInfoViewRedux;



// // import React, { useEffect, useState } from 'react';
// // import AppMessageView from '../AppMessageView';
// // import AppLoader from '../AppLoader';
// // import { HIDE_MESSAGE } from '@crema/constants/ActionTypes';
// // import { useDispatch, useSelector } from 'react-redux';

// // const AppInfoViewRedux = () => {
// //   const { error, loading, message } = useSelector(({ common }) => common);
// //   const dispatch = useDispatch();

// //   const clearInfoView = () => {
// //     dispatch({ type: HIDE_MESSAGE });
// //   };

// //   const [count, setCount] = useState(0);
// //   const [messages, setMessages] = useState([]);



// //   // Effect to track new messages from Redux state
// //   useEffect(() => {
// //     if (message) {
// //       setCount((prev) => prev + 1);
// //       setMessages((prevMessages) => [...prevMessages, message]); // Append new message
// //     }
// //   }, [message]); // Dependency on `message` to run this effect

// //   // Function to handle message removal
// //   const handleRemoveMessage = (index) => {
// //     setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
// //   };



// //   // Function to render messages dynamically
// //   const renderMessages = () => {
// //     return messages.map((msg, index) => (
// //       <AppMessageView
// //         key={index}
// //         variant="success"
// //         message={msg.toString()}
// //         clearInfoView={clearInfoView}
// //         stackCount={index} // Pass the index to control stacking
// //         onClose={() => handleRemoveMessage(index)} // Pass the remove handler
// //       />
// //     ));
// //   };

// //   const showError = () => {
// //     return (
// //       <AppMessageView
// //         variant="error"
// //         message={error.toString()}
// //         clearInfoView={clearInfoView}
// //       />
// //     );
// //   };

// //   return (
// //     <>
// //       {loading && <AppLoader />}
// //       {renderMessages()}
// //       {error && showError()}
// //     </>
// //   );
// // };

// // export default AppInfoViewRedux;


