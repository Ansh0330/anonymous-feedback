import { GoogleGenAI } from "@google/genai";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const ai = new GoogleGenAI({});

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    // console.log(text);

    return Response.json(
      {
        success: true,
        message: "Suggested messages generated successfully",
        messages: text,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /suggest-messages:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
