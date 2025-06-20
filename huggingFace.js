// // // sk-oLvo6q4G359ug9uUbQXk9vaBgiwQqsvRgbA3uXnDJogTP4vA


export async function generateImage(prompt) {
  const API_KEY = "sk-oLvo6q4G359ug9uUbQXk9vaBgiwQqsvRgbA3uXnDJogTP4vA";
  const url = "https://api.stability.ai/v2beta/stable-image/generate/core";

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("output_format", "png"); // Valid format

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "image/*", // ✅ Fixed: Using wildcard instead of specific type
      },
      body: formData,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      console.error("Stability API error:", errorData);
      throw new Error(errorData.errors?.[0] || "Failed to generate image");
    }

    // Convert image blob to base64
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("❌ Image generation error:", error);
    throw error;
  }
}
