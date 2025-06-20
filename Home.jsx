import React, { useContext } from 'react';
import "../App.css";
import { RiImageAiLine } from "react-icons/ri";
import { IoIosImages } from "react-icons/io";
import { BsRobot } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";
import { dataContext, prevUser, user } from '../context/UserContext';
import Chat from './Chat';
import { generateResponse } from '../gemini';
import { generateImage } from '../huggingFace';

function Home() {
  const {
    startRes, setStartRes,
    popUp, setPopUp,
    input, setInput,
    feature, setFeature,
    showResult, setShowResult,
    prevFeature, setPrevFeature
  } = useContext(dataContext);

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (!input.trim()) return;

    setStartRes(true);
    setPrevFeature(feature);
    setShowResult("");

    prevUser.prompt = input;
    prevUser.data = user.data;
    prevUser.mime_type = user.mime_type;
    prevUser.imgUrl = user.imgUrl;
    setInput("");

    if (feature === "genimg") {
      try {
        const imgUrl = await generateImage(prevUser.prompt);
        prevUser.imgUrl = imgUrl;
        setShowResult(imgUrl);
      } catch {
        setShowResult("❌ Failed to generate image.");
      }
    } else {
      const result = await generateResponse();
      setShowResult(result);
    }

    user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const b = event.target.result.split(",")[1];
      user.data = b;
      user.mime_type = file.type;
      user.imgUrl = `data:${file.type};base64,${b}`;
    };
    reader.readAsDataURL(file);
    setFeature("upimg");
  };

  return (
    <div className='Home'>
      <nav>
        <div className="logo" onClick={() => {
          setStartRes(false);
          setFeature("chat");
        }}>Promage AI Bot</div>
      </nav>

      <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

      {!startRes ? (
        <div className="hero">
          <span id='tag'>How Can I Help You?</span>
          <div className="cate">
            <div className="upImg" onClick={() => document.getElementById("inputImg").click()}><IoIosImages /><span>Upload Image</span></div>
            <div className="genImg" onClick={() => setFeature("genimg")}><RiImageAiLine /><span>Generate Image</span></div>
            <div className="chat" onClick={() => setFeature("chat")}><BsRobot /><span>Let's Chat</span></div>
          </div>
        </div>
      ) : <Chat />}

      <form className="input-box" onSubmit={handleSubmit}>
        {popUp && (
          <div className="pop-up">
            <div className="select-up" onClick={() => { setPopUp(false); setFeature("chat"); document.getElementById("inputImg").click(); }}>
              <IoIosImages /><span>Upload Image</span>
            </div>
            <div className="select-gen" onClick={() => { setPopUp(false); setFeature("genimg"); }}>
              <RiImageAiLine /><span>Generate Image</span>
            </div>
          </div>
        )}

        <div id='add' onClick={() => setPopUp(!popUp)}>
          {feature === "genimg" ? <RiImageAiLine id="fgenImg" /> : <IoMdAdd />}
        </div>

        <input
          type="text"
          placeholder='Ask Something...'
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        {input.trim() && <button id='submit' type="submit"><FaArrowUp /></button>}
      </form>
    </div>
  );
}

export default Home;



// import React, { useContext } from 'react';
// import "../App.css";
// import { RiImageAiLine } from "react-icons/ri";
// import { IoIosImages } from "react-icons/io";
// import { BsRobot } from "react-icons/bs";
// import { IoMdAdd } from "react-icons/io";
// import { FaArrowUp } from "react-icons/fa6";
// import { dataContext, prevUser, user } from '../context/UserContext';
// import Chat from './Chat';
// import { generateResponse } from '../gemini';
// import { generateImage } from '../huggingFace';  // Still using huggingFace.js

// function Home() {
//   const {
//     startRes, setStartRes,
//     popUp, setPopUp,
//     input, setInput,
//     feature, setFeature,
//     showResult, setShowResult,
//     prevFeature, setPrevFeature
//   } = useContext(dataContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input) return;

//     setStartRes(true);
//     setPrevFeature(feature);
//     setShowResult("");

//     prevUser.prompt = input;
//     prevUser.data = user.data;
//     prevUser.mime_type = user.mime_type;
//     prevUser.imgUrl = user.imgUrl;

//     setInput("");

//     if (feature === "genimg") {
//       try {
//         const imgUrl = await generateImage(prevUser.prompt);
//         prevUser.imgUrl = imgUrl;
//         setShowResult(imgUrl);
//       } catch (err) {
//         console.error("Image generation failed:", err);
//         setShowResult("❌ Failed to generate image. Please try again.");
//       }
//     } else {
//       const result = await generateResponse();
//       setShowResult(result);
//     }

//     user.data = null;
//     user.mime_type = null;
//     user.imgUrl = null;
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const base64 = event.target.result.split(",")[1];
//       user.data = base64;
//       user.mime_type = file.type;
//       user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
//     };
//     reader.readAsDataURL(file);
//     setFeature("upimg");
//   };

//   return (
//     <div className='Home'>
//       <nav>
//         <div className="logo" onClick={() => {
//           setStartRes(false);
//           setFeature("chat");
//         }}>
//           Promage AI Bot
//         </div>
//       </nav>

//       <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

//       {!startRes ? (
//         <div className="hero">
//           <span id='tag'>How Can I Help You?</span>
//           <div className="cate">
//             <div className="upImg" onClick={() => document.getElementById("inputImg").click()}>
//               <IoIosImages /><span>Upload Image</span>
//             </div>
//             <div className="genImg" onClick={() => setFeature("genimg")}>
//               <RiImageAiLine /><span>Generate Image</span>
//             </div>
//             <div className="chat" onClick={() => setFeature("chat")}>
//               <BsRobot /><span>Let's Chat</span>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Chat />
//       )}

//       <form className="input-box" onSubmit={handleSubmit}>
//         {popUp && (
//           <div className="pop-up">
//             <div className="select-up" onClick={() => {
//               setPopUp(false);
//               setFeature("chat");
//               document.getElementById("inputImg").click();
//             }}>
//               <IoIosImages /><span>Upload Image</span>
//             </div>
//             <div className="select-gen" onClick={() => {
//               setPopUp(false);
//               setFeature("genimg");
//             }}>
//               <RiImageAiLine /><span>Generate Image</span>
//             </div>
//           </div>
//         )}

//         <div id='add' onClick={() => setPopUp(!popUp)}>
//           {feature === "genimg" ? <RiImageAiLine id="fgenImg" /> : <IoMdAdd />}
//         </div>

//         <input
//           type="text"
//           placeholder='Ask Something...'
//           onChange={e => setInput(e.target.value)}
//           value={input}
//         />
//         {input && (
//           <button id='submit' type="submit">
//             <FaArrowUp />
//           </button>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Home;



// // import React, { useContext } from 'react';
// // import "../App.css";
// // import { RiImageAiLine } from "react-icons/ri";
// // import { IoIosImages } from "react-icons/io";
// // import { BsRobot } from "react-icons/bs";
// // import { IoMdAdd } from "react-icons/io";
// // import { FaArrowUp } from "react-icons/fa6";
// // import { dataContext, prevUser, user } from '../context/UserContext';
// // import Chat from './Chat';
// // import { generateResponse } from '../gemini';
// // import { generateImage } from '../huggingFace';

// // function Home() {
// //   const {
// //     startRes, setStartRes,
// //     popUp, setPopUp,
// //     input, setInput,
// //     feature, setFeature,
// //     showResult, setShowResult,
// //     prevFeature, setPrevFeature
// //   } = useContext(dataContext);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!input) return;

// //     setStartRes(true);
// //     setPrevFeature(feature);
// //     setShowResult("");

// //     prevUser.prompt = input;
// //     prevUser.data = user.data;
// //     prevUser.mime_type = user.mime_type;
// //     prevUser.imgUrl = user.imgUrl;

// //     setInput("");

// //     if (feature === "genimg") {
// //       try {
// //         const imgUrl = await generateImage(prevUser.prompt);
// //         prevUser.imgUrl = imgUrl;
// //         setShowResult(imgUrl);
// //       } catch (err) {
// //         console.error("Image generation failed:", err);
// //       }
// //     } else {
// //       const result = await generateResponse();
// //       setShowResult(result);
// //     }

// //     user.data = null;
// //     user.mime_type = null;
// //     user.imgUrl = null;
// //   };

// //   const handleImage = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = (event) => {
// //       const base64 = event.target.result.split(",")[1];
// //       user.data = base64;
// //       user.mime_type = file.type;
// //       user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
// //     };
// //     reader.readAsDataURL(file);
// //     setFeature("upimg");
// //   };

// //   return (
// //     <div className='Home'>
// //       <nav>
// //         <div className="logo" onClick={() => {
// //           setStartRes(false);
// //           setFeature("chat");
// //         }}>
// //           Promage AI Bot
// //         </div>
// //       </nav>

// //       <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

// //       {!startRes ? (
// //         <div className="hero">
// //           <span id='tag'>How Can I Help You?</span>
// //           <div className="cate">
// //             <div className="upImg" onClick={() => document.getElementById("inputImg").click()}>
// //               <IoIosImages /><span>Upload Image</span>
// //             </div>
// //             <div className="genImg" onClick={() => setFeature("genimg")}>
// //               <RiImageAiLine /><span>Generate Image</span>
// //             </div>
// //             <div className="chat" onClick={() => setFeature("chat")}>
// //               <BsRobot /><span>Let's Chat</span>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <Chat />
// //       )}

// //       <form className="input-box" onSubmit={handleSubmit}>
// //         {popUp && (
// //           <div className="pop-up">
// //             <div className="select-up" onClick={() => {
// //               setPopUp(false);
// //               setFeature("chat");
// //               document.getElementById("inputImg").click();
// //             }}>
// //               <IoIosImages /><span>Upload Image</span>
// //             </div>
// //             <div className="select-gen" onClick={() => {
// //               setPopUp(false);
// //               setFeature("genimg");
// //             }}>
// //               <RiImageAiLine /><span>Generate Image</span>
// //             </div>
// //           </div>
// //         )}

// //         <div id='add' onClick={() => setPopUp(!popUp)}>
// //           {feature === "genimg" ? <RiImageAiLine id="fgenImg" /> : <IoMdAdd />}
// //         </div>

// //         <input
// //           type="text"
// //           placeholder='Ask Something...'
// //           onChange={e => setInput(e.target.value)}
// //           value={input}
// //         />
// //         {input && (
// //           <button id='submit' type="submit">
// //             <FaArrowUp />
// //           </button>
// //         )}
// //       </form>
// //     </div>
// //   );
// // }

// // export default Home;



// // // import React, { useContext } from 'react';
// // // import "../App.css";
// // // import { RiImageAiLine } from "react-icons/ri";
// // // import { IoIosImages } from "react-icons/io";
// // // import { BsRobot } from "react-icons/bs";
// // // import { IoMdAdd } from "react-icons/io";
// // // import { FaArrowUp } from "react-icons/fa6";
// // // import { dataContext, prevUser, user } from '../context/UserContext';
// // // import Chat from './Chat';
// // // import { generateResponse } from '../gemini';
// // // import { query } from '../huggingFace';

// // // function Home() {
// // //     const {
// // //         startRes, setStartRes,
// // //         popUp, setPopUp,
// // //         input, setInput,
// // //         feature, setFeature,
// // //         showResult, setShowResult,
// // //         prevFeature, setPrevFeature
// // //     } = useContext(dataContext);

// // //     // ✨ Submit for chat or image generation
// // //     async function handleSubmit(e) {
// // //         e.preventDefault();

// // //         if (!input || input.trim() === "") {
// // //             alert("Please enter a prompt.");
// // //             return;
// // //         }

// // //         if (feature === "genimg") {
// // //             handleGenerateImage();
// // //         } else {
// // //             await handleChatResponse();
// // //         }
// // //     }

// // //     // ✨ Chat feature with Gemini
// // //     async function handleChatResponse() {
// // //         setStartRes(true);
// // //         setPrevFeature(feature);
// // //         setShowResult("");

// // //         prevUser.data = user.data;
// // //         prevUser.mime_type = user.mime_type;
// // //         prevUser.imgUrl = user.imgUrl;
// // //         prevUser.prompt = input;
// // //         setInput("");

// // //         const result = await generateResponse();
// // //         setShowResult(result);
// // //         setFeature("chat");

// // //         // reset
// // //         user.data = null;
// // //         user.mime_type = null;
// // //         user.imgUrl = null;
// // //     }

// // //     // ✨ Hugging Face Image Generation
// // //     async function handleGenerateImage() {
// // //         setStartRes(true);
// // //         setPrevFeature("genimg");

// // //         if (!input || input.trim() === "") {
// // //             alert("Please enter a valid image prompt.");
// // //             setStartRes(false);
// // //             return;
// // //         }

// // //         prevUser.prompt = input;

// // //         try {
// // //             await query(); // sets prevUser.imgUrl
// // //             setInput("");
// // //             setFeature("chat");
// // //         } catch (err) {
// // //             console.error("Image generation failed:", err);
// // //             alert("Image generation failed. Try again.");
// // //             setStartRes(false);
// // //         }
// // //     }

// // //     // 📷 Image upload
// // //     function handleImage(e) {
// // //         const file = e.target.files[0];
// // //         if (!file) return;

// // //         const reader = new FileReader();
// // //         reader.onload = (event) => {
// // //             const base64 = event.target.result.split(",")[1];
// // //             user.data = base64;
// // //             user.mime_type = file.type;
// // //             user.imgUrl = `data:${file.type};base64,${base64}`;
// // //         };
// // //         reader.readAsDataURL(file);
// // //         setFeature("upimg");
// // //     }

// // //     return (
// // //         <div className='Home'>
// // //             <nav>
// // //                 <div className="logo" onClick={() => {
// // //                     setStartRes(false);
// // //                     setFeature("chat");
// // //                 }}>Promage AI Bot</div>
// // //             </nav>

// // //             <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

// // //             {!startRes ? (
// // //                 <div className="hero">
// // //                     <span id='tag'>How Can I Help You?</span>
// // //                     <div className="cate">
// // //                         <div className="upImg" onClick={() => document.getElementById("inputImg").click()}>
// // //                             <IoIosImages /><span>Upload Image</span>
// // //                         </div>
// // //                         <div className="genImg" onClick={() => setFeature("genimg")}>
// // //                             <RiImageAiLine /><span>Generate Image</span>
// // //                         </div>
// // //                         <div className="chat" onClick={() => setFeature("chat")}>
// // //                             <BsRobot /><span>Let's Chat</span>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             ) : (
// // //                 <Chat />
// // //             )}

// // //             <form className="input-box" onSubmit={handleSubmit}>
// // //                 {popUp && (
// // //                     <div className="pop-up">
// // //                         <div className="select-up" onClick={() => {
// // //                             setPopUp(false);
// // //                             setFeature("chat");
// // //                             document.getElementById("inputImg").click();
// // //                         }}>
// // //                             <IoIosImages /><span>Upload Image</span>
// // //                         </div>
// // //                         <div className="select-gen" onClick={() => {
// // //                             setPopUp(false);
// // //                             setFeature("genimg");
// // //                         }}>
// // //                             <RiImageAiLine /><span>Generate Image</span>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //                 <div id='add' onClick={() => setPopUp(!popUp)}>
// // //                     {feature === "genimg" ? <RiImageAiLine id="fgenImg" /> : <IoMdAdd />}
// // //                 </div>
// // //                 <input
// // //                     type="text"
// // //                     placeholder='Ask Something...'
// // //                     onChange={e => setInput(e.target.value)}
// // //                     value={input}
// // //                 />
// // //                 {input && (
// // //                     <button id='submit' type="submit">
// // //                         <FaArrowUp />
// // //                     </button>
// // //                 )}
// // //             </form>
// // //         </div>
// // //     );
// // // }

// // // export default Home;




// // // // import React, { useContext } from 'react';
// // // // import "../App.css";
// // // // import { RiImageAiLine } from "react-icons/ri";
// // // // import { IoIosImages } from "react-icons/io";
// // // // import { BsRobot } from "react-icons/bs";
// // // // import { IoMdAdd } from "react-icons/io";
// // // // import { FaArrowUp } from "react-icons/fa6";
// // // // import { dataContext, prevUser, user } from '../context/UserContext';
// // // // import Chat from './Chat';
// // // // import { generateResponse } from '../gemini';
// // // // import { query } from '../huggingFace';

// // // // function Home() {
// // // //     const {
// // // //         startRes, setStartRes,
// // // //         popUp, setPopUp,
// // // //         input, setInput,
// // // //         feature, setFeature,
// // // //         showResult, setShowResult,
// // // //         prevFeature, setPrevFeature
// // // //     } = useContext(dataContext);

// // // //     async function handleSubmit(e) {
// // // //         e.preventDefault();
// // // //         setStartRes(true);
// // // //         setPrevFeature(feature);
// // // //         setShowResult("");

// // // //         // Save current input to prevUser for context
// // // //         prevUser.data = user.data;
// // // //         prevUser.mime_type = user.mime_type;
// // // //         prevUser.imgUrl = user.imgUrl;
// // // //         prevUser.prompt = input;

// // // //         setInput(""); // Clear input

// // // //         const result = await generateResponse();
// // // //         setShowResult(result);
// // // //         setFeature("chat");

// // // //         // Reset user data
// // // //         user.data = null;
// // // //         user.mime_type = null;
// // // //         user.imgUrl = null;
// // // //     }

// // // //     function handleImage(e) {
// // // //         const file = e.target.files[0];
// // // //         if (!file) return;

// // // //         const reader = new FileReader();
// // // //         reader.onload = (event) => {
// // // //             const base64 = event.target.result.split(",")[1];
// // // //             user.data = base64;
// // // //             user.mime_type = file.type;
// // // //             user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
// // // //         };
// // // //         reader.readAsDataURL(file);
// // // //         setFeature("upimg");
// // // //     }

// // // //     async function handleGenerateImage() {
// // // //         setStartRes(true);
// // // //         setPrevFeature(feature);

// // // //         try {
// // // //             const result = await query(input); // ✅ Pass input as prompt
// // // //             user.imgUrl = result;

// // // //             prevUser.prompt = input;
// // // //             prevUser.imgUrl = result;
// // // //             prevUser.data = null;
// // // //             prevUser.mime_type = null;

// // // //             setInput("");           // Clear input
// // // //             setFeature("chat");     // Show chat with image
// // // //         } catch (err) {
// // // //             console.error("Image generation failed:", err);
// // // //             alert("❌ Failed to generate image. Please try again.");
// // // //         }
// // // //     }

// // // //     return (
// // // //         <div className='Home'>
// // // //             <nav>
// // // //                 <div className="logo" onClick={() => {
// // // //                     setStartRes(false);
// // // //                     setFeature("chat");
// // // //                 }}>Promage Ai Bot</div>
// // // //             </nav>

// // // //             <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

// // // //             {!startRes ? (
// // // //                 <div className="hero">
// // // //                     <span id='tag'>How Can I Help You?</span>
// // // //                     <div className="cate">
// // // //                         <div className="upImg" onClick={() => document.getElementById("inputImg").click()}>
// // // //                             <IoIosImages /><span>Upload Image</span>
// // // //                         </div>
// // // //                         <div className="genImg" onClick={() => setFeature("genimg")}>
// // // //                             <RiImageAiLine /><span>Generate Image</span>
// // // //                         </div>
// // // //                         <div className="chat" onClick={() => setFeature("chat")}>
// // // //                             <BsRobot /><span>Let's Chat</span>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             ) : (
// // // //                 <Chat />
// // // //             )}

// // // //             <form className="input-box" onSubmit={(e) => {
// // // //                 e.preventDefault();
// // // //                 if (input) {
// // // //                     if (feature === "genimg") {
// // // //                         handleGenerateImage();
// // // //                     } else {
// // // //                         handleSubmit(e);
// // // //                     }
// // // //                 }
// // // //             }}>
// // // //                 {popUp && (
// // // //                     <div className="pop-up">
// // // //                         <div className="select-up" onClick={() => {
// // // //                             setPopUp(false);
// // // //                             setFeature("chat");
// // // //                             document.getElementById("inputImg").click();
// // // //                         }}>
// // // //                             <IoIosImages /><span>Upload Image</span>
// // // //                         </div>
// // // //                         <div className="select-gen" onClick={() => {
// // // //                             setPopUp(false);
// // // //                             setFeature("genimg");
// // // //                         }}>
// // // //                             <RiImageAiLine /><span>Generate Image</span>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}
// // // //                 <div id='add' onClick={() => setPopUp(!popUp)}>
// // // //                     {feature === "genimg" ? <RiImageAiLine id="fgenImg" /> : <IoMdAdd />}
// // // //                 </div>
// // // //                 <input
// // // //                     type="text"
// // // //                     placeholder='Ask Something...'
// // // //                     onChange={e => setInput(e.target.value)}
// // // //                     value={input}
// // // //                 />
// // // //                 {input && (
// // // //                     <button id='submit' type="submit">
// // // //                         <FaArrowUp />
// // // //                     </button>
// // // //                 )}
// // // //             </form>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Home;



// // // // // import React, { useContext } from 'react';
// // // // // import "../App.css";
// // // // // import { RiImageAiLine } from "react-icons/ri";
// // // // // import { IoIosImages } from "react-icons/io";
// // // // // import { BsRobot } from "react-icons/bs";
// // // // // import { IoMdAdd } from "react-icons/io";
// // // // // import { FaArrowUp } from "react-icons/fa6";
// // // // // import { dataContext, prevUser, user } from '../context/UserContext';
// // // // // import Chat from './Chat';
// // // // // import { generateResponse } from '../gemini';
// // // // // import { query } from '../huggingFace';

// // // // // function Home() {
// // // // //     const {
// // // // //         startRes, setStartRes,
// // // // //         popUp, setPopUp,
// // // // //         input, setInput,
// // // // //         feature, setFeature,
// // // // //         showResult, setShowResult,
// // // // //         prevFeature, setPrevFeature
// // // // //     } = useContext(dataContext);

// // // // //     async function handleSubmit(e) {
// // // // //         setStartRes(true);
// // // // //         setPrevFeature(feature);
// // // // //         setShowResult("");


// // // // //         // Transfer current user to prevUser
// // // // //         prevUser.data = user.data;
// // // // //         prevUser.mime_type = user.mime_type;
// // // // //         prevUser.imgUrl = user.imgUrl;
// // // // //         prevUser.prompt = input;
// // // // //         setInput("");

// // // // //         // Call API
// // // // //         const result = await generateResponse();
// // // // //         setShowResult(result);
// // // // //         setFeature("chat")

// // // // //         user.data = null;
// // // // //         user.mime_type = null;
// // // // //         user.imgUrl = null;

// // // // //     }

// // // // //     function handleImage(e) {
// // // // //         const file = e.target.files[0];
// // // // //         if (!file) return;

// // // // //         const reader = new FileReader();
// // // // //         reader.onload = (event) => {
// // // // //             const base64 = event.target.result.split(",")[1];
// // // // //             user.data = base64;
// // // // //             user.mime_type = file.type;
// // // // //             user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
// // // // //         };
// // // // //         reader.readAsDataURL(file);
// // // // //         setFeature("upimg");
// // // // //     }

// // // // //     async function handleGenerateImage(){
// // // // //         setStartRes(true);
// // // // //         setPrevFeature(feature);
// // // // //         prevUser.prompt=input

// // // // //         let result = await query().then((e)=>{
// // // // //             setInput("")
// // // // //             setFeature("chat")
// // // // //         })
// // // // //     }

// // // // //     return (
// // // // //         <div className='Home'>
// // // // //             <nav><div className="logo" onClick={() => {
// // // // //                 setStartRes(false)
// // // // //                 setFeature("chat")
// // // // //             }}>Promage Ai Bot</div></nav>
// // // // //             <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

// // // // //             {!startRes ? (
// // // // //                 <div className="hero">
// // // // //                     <span id='tag'>How Can I Help You?</span>
// // // // //                     <div className="cate">
// // // // //                         <div className="upImg" onClick={() => document.getElementById("inputImg").click()}>
// // // // //                             <IoIosImages /><span>Upload Image</span>
// // // // //                         </div>
// // // // //                         <div className="genImg" onClick={() => setFeature("genimg")}>
// // // // //                             <RiImageAiLine /><span>Generate Image</span>
// // // // //                         </div>
// // // // //                         <div className="chat" onClick={() => setFeature("chat")}>
// // // // //                             <BsRobot /><span>Let's Chat</span>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             ) : (
// // // // //                 <Chat />
// // // // //             )}

// // // // //             <form className="input-box" onSubmit={(e) => {
// // // // //                 e.preventDefault()
// // // // //                 if (input) {
// // // // //                     if (feature == "genimg") {
// // // // //                         handleGenerateImage()
// // // // //                     }
// // // // //                     else {
// // // // //                         handleSubmit(e)
// // // // //                     }
// // // // //                 }
// // // // //             }
// // // // //             }>
// // // // //                 {popUp ?
// // // // //                     <div className="pop-up">
// // // // //                         <div className="select-up" onClick={() => {
// // // // //                             setPopUp(false)
// // // // //                             setFeature("chat")
// // // // //                             document.getElementById("inputImg").click()
// // // // //                         }}>
// // // // //                             <IoIosImages /><span>Upload Image</span>
// // // // //                         </div>
// // // // //                         <div className="select-gen" onClick={() => {
// // // // //                             setPopUp(false)
// // // // //                             setFeature("genimg")
// // // // //                         }}>
// // // // //                             <RiImageAiLine /><span>Generate Image</span>
// // // // //                         </div>
// // // // //                     </div> : null
// // // // //                 }
// // // // //                 <div id='add' onClick={() => setPopUp(!popUp)}>
// // // // //                     {feature === "genimg" ? <RiImageAiLine id="fgenImg" /> : <IoMdAdd />}
// // // // //                 </div>
// // // // //                 <input
// // // // //                     type="text"
// // // // //                     placeholder='Ask Something...'
// // // // //                     onChange={e => setInput(e.target.value)}
// // // // //                     value={input}
// // // // //                 />
// // // // //                 {input && (
// // // // //                     <button id='submit' type="submit">
// // // // //                         <FaArrowUp />
// // // // //                     </button>
// // // // //                 )}
// // // // //             </form>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default Home;

