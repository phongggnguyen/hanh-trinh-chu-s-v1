// Test script to check Gemini API connection
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

async function testGemini() {
  console.log('🔍 Testing Gemini API connection...\n');

  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');

  if (!apiKey) {
    console.error('❌ GOOGLE_GENAI_API_KEY not found in .env.local');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    console.log('\n📡 Sending test prompt to Gemini...\n');

    const prompt = `Bạn là hệ thống sinh câu hỏi trắc nghiệm về tỉnh Hà Nội, Việt Nam.
Sinh đúng 2 câu hỏi, hoàn toàn bằng tiếng Việt, mỗi câu có 4 phương án và 1 đáp án đúng.

YÊU CẦU BẮT BUỘC:
- Tất cả text phải bằng tiếng Việt có dấu
- Mỗi câu hỏi phải có đúng 4 đáp án
- correctAnswer phải khớp CHÍNH XÁC với một trong 4 options

Trả về ĐÚNG định dạng JSON sau:
{
  "questions": [
    {
      "question": "Câu hỏi về Hà Nội?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctAnswer": "Đáp án A"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('✅ Response received:\n');
    console.log(text);
    console.log('\n---\n');

    // Try to parse JSON
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const parsed = JSON.parse(jsonText);
    console.log('✅ JSON parsed successfully:');
    console.log(JSON.stringify(parsed, null, 2));

    console.log('\n✅ Gemini API is working correctly!');
  } catch (error) {
    console.error('\n❌ Error testing Gemini API:');
    console.error(error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
    if (error.statusText) {
      console.error('Status Text:', error.statusText);
    }
    console.error('\nFull error:', error);
  }
}

testGemini();
