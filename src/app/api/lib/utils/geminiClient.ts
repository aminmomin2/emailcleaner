import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function classifyEmailWithGemini(subject: string, from: string, snippet: string, fullBody: string): Promise<string> {
  const prompt = `Classify the following email into one of these categories: Newsletter, Promotional, Social Notification, Spam, Personal, Work-Related, Transactional, Other. Provide only the category name.\n\nSubject: ${subject}\nFrom: ${from}\nBody Snippet: ${snippet}\nFull Body (first 500 chars): ${fullBody.substring(0, 500)}`;
  
  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0 },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });
    
    const text = result.response.text().trim();
    return text;
  } catch (error) {
    console.error('[ERROR] Classification failed:', error);
    // Return a safe default that won't trigger suggestions
    return 'Personal';
  }
} 