import React, { useContext } from 'react';
import { dataContext, prevUser } from '../context/UserContext';

function Chat() {
  const {
    input, setInput,
    prevInput, setPrevInput,
    feature, setFeature,
    showResult, setShowResult,
    prevFeature, setPrevFeature
  } = useContext(dataContext);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = prevUser.imgUrl;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="chat-page">

      {/* 🧑‍💬 USER SECTION */}
      <div className="user">
        {prevFeature === "upimg" && prevUser.imgUrl && (
          <img src={prevUser.imgUrl} alt="uploaded" />
        )}
        <span>{prevUser.prompt || "You asked something..."}</span>
      </div>

      {/* 🤖 AI SECTION */}
      <div className="ai">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="ai bot"
          width={40}
        />

        {prevFeature === "genimg" ? (
          !showResult ? (
            <span>Promage is generating your image...</span>
          ) : (
            <div className="genimg-preview">
              <img
                src={prevUser.imgUrl}
                alt="Generated"
                style={{ maxWidth: "35%", borderRadius: "10px", marginTop: "10px" }}
              />
              <button className="downloadBtn" onClick={handleDownload}>Download Image</button>
            </div>
          )
        ) : (
          !showResult ? (
            <span>Promage is generating a response...</span>
          ) : (
            <span>{showResult}</span>
          )
        )}
      </div>
    </div>
  );
}

export default Chat;






// import React, { useContext } from 'react';
// import { dataContext, prevUser } from '../context/UserContext';

// function Chat() {
//   const {
//     input, setInput,
//     prevInput, setPrevInput,
//     feature, setFeature,
//     showResult, setShowResult,
//     prevFeature, setPrevFeature
//   } = useContext(dataContext);

//   return (
//     <div className="chat-page">

//       {/* 🧑‍💬 USER SECTION */}

//       <div className="user">
//         {prevFeature === "upimg" && prevUser.imgUrl && (
//           <img src={prevUser.imgUrl} alt="uploaded" />
//         )}
//         <span>{prevUser.prompt || "You asked something..."}</span>
//       </div>

//       {/* 🤖 AI SECTION */}

//       <div className="ai">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
//           alt="ai bot"
//           width={40}
//         />
//         {prevFeature === "genimg" ? (
//           !showResult ? (
//             <span>Promage is generating your image...</span>
//           ) : (
//             <img src={prevUser.imgUrl} alt="" />
//           )
//         ) : (
//           !showResult ? (
//             <span>Promage is generating a response...</span>
//           ) : (
//             <span>{showResult}</span>
//           )
//         )}
//       </div>
//     </div>
//   );
 // }

// export default Chat;


// import React, { useContext } from 'react';
// import { dataContext, prevUser } from '../context/UserContext';

// function Chat() {
//   const { input , setInput ,prevInput , setPrevInput ,feature , setFeature, showResult , setShowResult , prevFeature , setPrevFeature} = useContext(dataContext);

//   return (
//     <div className="chat-page">
//       <div className="user">
//         {prevFeature =="upimg" ? <><img src={prevUser.imgUrl} alt="user" />
//         <span>{prevUser.prompt}</span>
//         </> : <span>{prevUser.prompt}</span>}

//         {/* {prevUser.imgUrl && (
//           <img src={prevUser.imgUrl} alt="user" />
//         )}
//         <span>{prevUser.prompt || "You asked something..."}</span> */}
//       </div>

//       <div className="ai">
//             { prevFeature == "genimg" ?
//             <>
//             {!showResult? <span>Promage Genrating Image...</span> : <img src={prevUser.imgUrl} alt=""/>}
//             </>
//             :
//             !showResult
//             ?
//             <span>Promage Generating Text...</span> <img
//           src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
//           alt="ai"
//           width={40}
//           />
//           :
//             <span>{showResult}</span>
//             }
//       </div>
//     </div>
//   );
// }

// export default Chat;


// {/* 
//         { prevFeature =="genimg" ?
//          <><img
//           src={prevUser.imgUrl} alt=""/>
//           {!showResult ? <span>Promage Generating The Response...</span>:<span>{showResult}</span>}
//           </>
//           :
//           !showResult
//           ?

//          */}
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
//           alt="ai"
//           width={40}
//         />
//         <span>{showResult || "Promage Generating The Response..."}</span>






// // import React from 'react'
// // import { useCallback } from 'react'
// // import { dataContext, prevUser } from '../context/UserContext'

// // function Chat() {
// //     let {input , setInput ,prevInput , setPrevInput , showResult , setShowResult}=useCallback(dataContext)
// //     return (
// //         <div className="chat-page">
// //             <div className='user'>
// //                 <img src="" alt="" />
// //                 <span>{prevUser.prompt}</span>
// //             </div>
// //             <div className="ai">
// //                 <img src="" alt="" />
// //                 <span>{showResult}</span>
// //             </div>
// //         </div>
// //     )
// // }
// // export default Chat

// // // components/Chat.jsx
// // // import React, { useContext } from 'react';
// // // import { dataContext, prevUser } from '../context/UserContext';

// // // function Chat() {
// // //   const { prevInput } = useContext(dataContext);

// // //   return (
// // //     <div className="chat-page">
// // //       <div className='user'>
// // //         <img src={prevUser.imgUrl || ""} alt="user" />
// // //         <span>{prevUser.prompt || prevInput}</span>
// // //       </div>
// // //       <div className="ai">
// // //         <img src="" alt="ai" />
// // //         <span></span>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Chat;
  