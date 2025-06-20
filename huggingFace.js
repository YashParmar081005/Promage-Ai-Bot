

export async function generateImage(prompt) {
  const API_KEY = ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,";  // stebility ai api
  const url = "https://api.stability.ai/v2beta/stable-image/generate/core";

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("output_format", "png"); 

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "image/*", 
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
