
import { prevUser } from "./context/UserContext";

const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,";

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

