// gemini.js
import { prevUser } from "./context/UserContext";

const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC74lNDEqYBtr1VqjkgsKRwBv77enQoxH4";

export async function generateResponse() {
  const parts = [{ text: prevUser.prompt }];

  if (prevUser.data) {
    parts.push({
      inline_data: {
        mime_type: prevUser.mime_type,
        data: prevUser.data,
      }
    });
  }

  const body = {
    contents: [
      {
        parts: parts
      }
    ]
  };

  try {
    const response = await fetch(Api_url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.warn("Empty response:", data);
    }
    return text || "No response received.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Error from Gemini API.";
  }
}





// // gemini.js
// import { prevUser } from "./context/UserContext";

// const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC74lNDEqYBtr1VqjkgsKRwBv77enQoxH4";

// export async function generateResponse() {
//   const parts = [{ text: prevUser.prompt }];

//   if (prevUser.data) {
//     parts.push({
//       inline_data: {
//         mime_type: prevUser.mime_type,
//         data: prevUser.data
//       }
//     });
//   }

//   const requestBody = {
//     contents: [{ parts }]
//   };

//   try {
//     const response = await fetch(Api_url, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(requestBody)
//     });

//     const data = await response.json();

//     const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
//     return result || "No response received.";
//   } catch (err) {
//     console.error("Gemini API error:", err);
//     return "Error from Gemini API.";
//   }
// }



// import { prevUser } from "./context/UserContext";

// const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyC74lNDEqYBtr1VqjkgsKRwBv77enQoxH4"

// export async function generateResponse() {

//     let RequestOption = {
//         method: "POST",
//         Headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "contents": [
//                 {
//                     "parts": [
//                         {
//                             "text": prevUser.prompt
//                         },
//                         prevUser.data ? [{
                            
//                             "inline_data": {
//                                 "mime_type": prevUser.mime_type,
//                                 "data": prevUser.data
//                             }
//                         }] : []
                        
//                     ]
//                 }
//             ]
//         })
//     }
//     try {
//         let response = await fetch(Api_url, RequestOption);
//         let data = await response.json();
//         let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
//         return apiResponse;
//     } catch {

//     }

// }
// gemini.js
// import { prevUser } from "./context/UserContext";

// const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY";

// export async function generateResponse() {
//   const RequestOption = {
//     method: "POST",
//     headers: { 'Content-Type': 'application/json' }, // lowercase headers
//     body: JSON.stringify({
//       contents: [
//         {
//           parts: [
//             { text: prevUser.prompt },
//             ...(prevUser.data ? [{
//               inline_data: {
//                 mime_type: prevUser.mime_type,
//                 data: prevUser.data
//               }
//             }] : [])
//           ]
//         }
//       ]
//     })
//   };

//   try {
//     const response = await fetch(Api_url, RequestOption);
//     const data = await response.json();
//     return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
//   } catch (err) {
//     console.error("Gemini API error:", err);
//     return "";
//   }
// }


// // gemini.js
// import { prevUser } from "./context/UserContext";

// const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyC74lNDEqYBtr1VqjkgsKRwBv77enQoxH4";

// export async function generateResponse() {
//   const parts = [{ text: prevUser.prompt }];

//   // If image exists, push image part
//   if (prevUser.data) {
//     parts.push({
//       inline_data: {
//         mime_type: prevUser.mime_type,
//         data: prevUser.data
//       }
//     });
//   }

//   const body = {
//     contents: [
//       {
//         parts
//       }
//     ]
//   };

//   try {
//     const response = await fetch(Api_url, {
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body)
//     });

//     const data = await response.json();

//     const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
//     return result;
//   } catch (err) {
//     console.error("Error from Gemini API:", err);
//     return "Error from Gemini API.";
//   }
// }
