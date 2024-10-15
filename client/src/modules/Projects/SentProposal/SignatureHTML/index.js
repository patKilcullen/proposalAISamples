 
 import { formatDate } from 'utils/formatDate';
 import DOMPurify from 'dompurify';

    // CLIENT SIGNATURE
  export const handleAddClientSignatureHTML = ({signature, type, user}) => {
    const date = new Date();
    const formattedDate = formatDate(date);
    let sanitizedSignature = DOMPurify.sanitize(signature);
      return (type === "canvas" ?
           `
            <div style="display: flex; align-items: center">
                <!-- Label for client signature -->

                <label style="width: 100px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Client Signature:</label>
                <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                    <img style="height: 50px; margin-left: -50px; margin-bottom: -20px;  transform: scale(0.5); transform-origin: center;" src=${sanitizedSignature} />
                    <div style="
                        border-bottom: 1px solid black;
                        width: 100px;
                        margin-left: -25px;
                        position: relative;
                        margin-top: 15px;
                        margin-bottom: -20px
                    "></div>
                    <div style="margin-top: 10px; display: flex; flex-direction: row; gap: 7px">
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Name:</label>
                            <span>${user.userName}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Email:</label>
                            <span>${user.email}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Date:</label>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>`
            : type === "text" ?
                     `
            <div style="display: flex; align-items: center">
                <!-- Label for client signature -->
                   <label style="width: 100px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Client Signature:</label>
                <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                    <img style="margin-left: -25%; margin-bottom: -35px;  transform: scale(0.5); transform-origin: center;" src=${sanitizedSignature} />
                    <div style="
                        border-bottom: 1px solid black;
                        width: 100px;
                        position: relative;
                        margin-top: 15px;
                    "></div>
                    <div style="margin-top: 10px; display: flex; flex-direction: row; gap: 7px">
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Name:</label>
                            <span>${user.userName}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Email:</label>
                            <span>${user.email}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Date:</label>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>` 
        : type === "upload" ?
           `
            <div style="display: flex; align-items: center">
                <!-- Label for client signature -->
                        <label style="width: 100px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Client Signature:</label>
                <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                    <img style="height: 100px; margin-left: -12%; margin-bottom: -40px;  transform: scale(0.5); transform-origin: center;" src=${sanitizedSignature} />
                    <div style="
                        border-bottom: 1px solid black;
                        width: 100px;
                        margin-left: -25px;
                        position: relative;
                        margin-top: 15px;
                
                    "></div>
                    <div style="margin-top: 10px; display: flex; flex-direction: row; gap: 7px">
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Name:</label>
                            <span>${user.userName}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Email:</label>
                            <span>${user.email}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Date:</label>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>`: null
      );

  };

         // BUSINESS SIGNATURE
  export const handleAddBusinessSignatureHTML = ({signature, type, user}) => {
    const date = new Date();
    const formattedDate = formatDate(date);
    let sanitizedSignature = DOMPurify.sanitize(signature);
      return (type === "canvas" ?
           `
            <div style="display: flex; align-items: center">
                <!-- Label for client signature -->
                <label style="width: 100px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Business Signature:</label>
                <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                <img style="height: 50px; margin-left: -5%; margin-bottom: -20px; transform: scale(0.5); transform-origin: center;" src=${sanitizedSignature} />
                    <div style="
                        border-bottom: 1px solid black;
                        width: 100px;
                        margin-left: 10px;
                        position: relative;
                        margin-top: 15px;
                        margin-bottom: -20px
                    "></div>
                    <div style="margin-top: 10px; display: flex; flex-direction: row; gap: 7px">
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Name:</label>
                            <span>${user.userName}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Email:</label>
                            <span>${user.email}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Date:</label>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>`
            : type === "text" ?
                     `
            <div style="display: flex; align-items: center">
                <!-- Label for client signature -->
<label style="width: 100px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Business Signature:</label>
                <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                    <img style="margin-left: -25%; margin-bottom: -35px;  transform: scale(0.5); transform-origin: center;" src=${sanitizedSignature} />
                    <div style="
                        border-bottom: 1px solid black;
                        width: 100px;
                        position: relative;
                        margin-top: 15px;
                    "></div>
                    <div style="margin-top: 10px; display: flex; flex-direction: row; gap: 7px">
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Name:</label>
                            <span>${user.userName}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Email:</label>
                            <span>${user.email}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Date:</label>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>` 
        : type === "upload" ?
           `
            <div style="display: flex; align-items: center">
                <!-- Label for client signature -->
               <label style="width: 100px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Business Signature:</label>
                <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                    <img style="height: 100px; margin-left: -12%; margin-bottom: -40px;  transform: scale(0.5); transform-origin: center;" src=${sanitizedSignature} />
                    <div style="
                        border-bottom: 1px solid black;
                        width: 100px;
                        margin-left: -25px;
                        position: relative;
                        margin-top: 15px;
                
                    "></div>
                    <div style="margin-top: 10px; display: flex; flex-direction: row; gap: 7px">
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Name:</label>
                            <span>${user.userName}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Email:</label>
                            <span>${user.email}</span>
                        </div>
                        <div style="margin-top: 5px;">
                            <label style="margin-right: 5px;">Date:</label>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>`: null)
  
  };


