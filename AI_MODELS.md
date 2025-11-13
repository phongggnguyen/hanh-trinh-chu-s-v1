# AI Models sử dụng trong Hành Trình Chữ S

## Tổng quan

Project sử dụng **Google Gemini 2.0 Flash** để sinh câu hỏi trắc nghiệm tự động cho 63 tỉnh thành Việt Nam.

## Chi tiết Models

### 1. Gemini 2.0 Flash (Text Generation)

**Mục đích**: Sinh câu hỏi trắc nghiệm về địa lý, lịch sử, văn hóa của từng tỉnh

**Model ID**: `gemini-2.0-flash-exp`

**Tại sao chọn Flash thay vì Pro?**
- ⚡ **Nhanh hơn**: 2-3x tốc độ so với Pro
- 💰 **Rẻ hơn**: Chi phí thấp hơn đáng kể
- 🎯 **Đủ tốt**: Chất lượng vẫn rất cao cho task structured output
- 🔥 **Mới nhất**: Gemini 2.0 với nhiều cải tiến

**SDK**: `@google/generative-ai` v0.24.1

**Cấu hình**:
```javascript
{
  model: 'gemini-2.0-flash-exp',
  temperature: 1.0,      // Creativity cao để câu hỏi đa dạng, ngẫu nhiên
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048
}
```

**Input**: Tên tỉnh (VD: "Hà Nội")

**Output**: JSON chứa 5 câu hỏi, mỗi câu có:
- `question`: Câu hỏi bằng tiếng Việt
- `options`: Mảng 4 đáp án
- `correctAnswer`: Đáp án đúng (phải khớp với một trong 4 options)

**Ví dụ Output**:
```json
{
  "questions": [
    {
      "question": "Đặc sản nổi tiếng của Hà Nội là gì?",
      "options": ["Phở", "Bún chả", "Bánh cuốn", "Chả cá"],
      "correctAnswer": "Phở"
    }
  ]
}
```

**Prompt Engineering**:
- Yêu cầu sinh câu hỏi theo chủ đề: địa lý, lịch sử, văn hóa, đặc sản, địa danh
- Đảm bảo tất cả text bằng tiếng Việt có dấu
- Validation: correctAnswer phải khớp chính xác với options
- Format: JSON thuần (không markdown)

**Error Handling**:
- Nếu API fails → Fallback về mock data
- Nếu JSON parse lỗi → Fallback về mock data
- Nếu validation fails → Throw error và fallback

**Chi phí ước tính**:
- ~$0.0001-0.0005 per request (5 questions) - Rẻ hơn nhiều!
- Với caching 24h: ~$2-5/tháng cho 1000+ users
- Flash rẻ hơn Pro khoảng 10x

---

### 2. Image Generation (Skipped cho MVP)

**Trạng thái**: Chưa triển khai

**Lý do**:
- Google Gemini không có public API cho image generation
- Imagen API chưa widely available
- MVP tập trung vào gameplay, không cần ảnh bắt buộc

**Tương lai**:
Có thể tích hợp:
- **Google Imagen API** (khi available)
- **Stable Diffusion API** (via Replicate, Hugging Face)
- **DALL-E API** (OpenAI)
- **Midjourney API** (khi available)

Ước tính chi phí: +$10-20/tháng

---

## Caching & Optimization

### In-Memory Cache
- **TTL**: 24 giờ
- **Key**: Tên tỉnh
- **Purpose**: Giảm 80-90% API calls sau warm-up
- **Storage**: Map trong Node.js process

### Rate Limiting
- **Limit**: 10 requests/60 giây per province
- **Purpose**: Tránh abuse, kiểm soát chi phí
- **Implementation**: Simple in-memory counter

---

## API Key Setup

### Lấy API Key:
1. Truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập Google account
3. Tạo API key mới
4. Copy và paste vào `.env.local`

### Environment Variable:
```bash
GOOGLE_GENAI_API_KEY=your_api_key_here
```

### Security:
- ⚠️ **KHÔNG** commit API key lên Git
- ⚠️ **KHÔNG** expose API key ở client-side
- ✅ Chỉ sử dụng trong Server Actions (`'use server'`)
- ✅ Add `.env.local` vào `.gitignore`

---

## Performance & Monitoring

### Metrics cần theo dõi:
- **API Response Time**: ~2-5 giây (Gemini 1.5 Pro)
- **Cache Hit Rate**: Target >80%
- **Error Rate**: Target <5%
- **Cost per Day**: Target <$0.50

### Logging:
```
[CACHE HIT] Quiz for Hà Nội     // Cache hit
[CACHE MISS] Generating quiz    // API call
[ERROR] Failed to generate      // Fallback to mock
```

---

## Roadmap

### Phase 1 (MVP - Current):
- ✅ Gemini 2.0 Flash cho text generation
- ✅ Mock data fallback
- ✅ Basic caching (24h TTL)
- ✅ Rate limiting (10 req/min)

### Phase 2 (Future):
- 🔜 Image generation (Imagen/DALL-E)
- 🔜 Streaming responses cho UX tốt hơn
- 🔜 Redis cache thay in-memory
- 🔜 Advanced retry logic
- 🔜 A/B testing prompts
- 🔜 Fine-tuning model (nếu cần)

### Phase 3 (Scale):
- 🔜 Multi-model support (GPT-4, Claude)
- 🔜 Custom model training
- 🔜 Distributed caching
- 🔜 Real-time monitoring (Sentry, DataDog)

---

## Best Practices

### ✅ DO:
- Validate tất cả AI outputs
- Implement fallback cho mọi API calls
- Cache aggressively
- Monitor costs daily
- Test với nhiều tỉnh khác nhau

### ❌ DON'T:
- Expose API key ở client
- Skip validation
- Ignore error logs
- Over-optimize quá sớm
- Trust AI output 100%

---

## Tài liệu tham khảo

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
- [Prompt Engineering Guide](https://ai.google.dev/docs/prompt_best_practices)
- [Google AI Studio](https://makersuite.google.com/)
