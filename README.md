# Hành Trình Chữ S

Web game giáo dục giúp người chơi khám phá 63 tỉnh thành Việt Nam qua các câu hỏi trắc nghiệm được tạo bởi AI.

## Tính năng

- 🗺️ **Bản đồ Việt Nam tương tác** với 63 tỉnh thành
- 🎯 **Quiz AI-generated** - 5 câu hỏi/tỉnh với hình ảnh minh họa
- ⚡ **Power-ups**: 50/50 (ẩn 2 đáp án sai) và +15 giây
- 🔓 **Hệ thống mở khóa**: Chinh phục tỉnh để mở các tỉnh lân cận
- 📔 **Nhật ký hành trình**: Theo dõi tiến độ 63/63 tỉnh
- 💾 **Lưu tiến trình** tự động với LocalStorage

## Công nghệ

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **AI**: Google Gemini 3 Flash Preview (tạo câu hỏi trắc nghiệm)
  - Model: `gemini-3-flash-preview`
  - Provider: Google AI Studio (https://aistudio.google.com)
  - SDK: `@google/genai` v1.37.0
  - Ưu điểm: Nhanh, chính xác, miễn phí (có giới hạn quota)
  - Fallback: Mock data nếu API fails
  - Image generation: Skipped cho MVP (có thể thêm Imagen sau)
- **UI**: Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons
- **State**: React Context + useReducer
- **Validation**: Zod

## Yêu cầu hệ thống

- Node.js ≥ 20
- npm hoặc yarn

## Cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd hanhtrinhchus
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Thiết lập environment variables**

Tạo file `.env.local` từ file mẫu:
```bash
cp .env.local.example .env.local
```

Sau đó thêm Google Gemini API key vào file `.env.local`:
```
GEMINI_API_KEY=your-gemini-api-key-here
```

**Lấy API key**: Truy cập [Google AI Studio](https://aistudio.google.com/apikey) để tạo API key (miễn phí).

4. **Chạy development server**
```bash
npm run dev
```

Mở trình duyệt tại: http://localhost:9003

## Scripts

- `npm run dev` - Chạy development server trên port 9003
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra code với ESLint
- `npm run test` - Chạy unit tests
- `npm run test:e2e` - Chạy E2E tests

## Cấu trúc project

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with GameProvider
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── game-board.tsx      # Main game orchestrator
│   ├── vietnam-map.tsx     # Interactive SVG map
│   ├── quiz-view.tsx       # Quiz interface with timer
│   ├── quiz-completion-modal.tsx
│   ├── travel-journal.tsx  # Progress tracking
│   ├── game/               # Game components (modular)
│   ├── quiz/               # Quiz components (modular)
│   └── ui/                 # shadcn/ui components
├── contexts/
│   └── game-context.tsx    # Game state management
├── actions/
│   └── quiz.actions.ts     # Server Actions (getQuizForProvince)
├── ai/
│   └── gemini-client.ts    # Google Gemini AI client
└── lib/
    ├── types.ts            # TypeScript types
    ├── constants.ts        # App constants & config
    ├── provinces.ts        # 63 provinces data + neighbors
    └── utils.ts            # Utility functions
```

## Gameplay

1. **Bắt đầu**: Chọn Hà Nội hoặc TP. Hồ Chí Minh (mở sẵn)
2. **Chơi quiz**: 5 câu hỏi, 30 giây/câu
3. **Sử dụng power-ups**:
   - 50/50: Ẩn 2 đáp án sai
   - +15s: Thêm 15 giây
4. **Chinh phục**: Đạt ≥4/5 câu đúng
5. **Mở khóa**: Các tỉnh lân cận được mở khóa
6. **Tiếp tục**: Chinh phục hết 63 tỉnh!

## Features (Production-ready)

### ✅ Đã triển khai (MVP)
- In-memory caching với TTL 24h
- Rate limiting (10 requests/60s)
- Input/output validation với Zod
- Error handling và logging
- SEO metadata + JSON-LD
- Responsive design
- Accessibility (ARIA, keyboard navigation)
- LocalStorage persistence

### 🔜 Backlog (sau MVP)
- Sentry integration (error tracking)
- Google Analytics 4 + Vercel Analytics
- Progressive Web App (PWA)
- Internationalization (i18n: vi/en)
- Leaderboard & Achievements
- Dark mode
- Sound effects
- Social sharing
- Advanced accessibility

## Performance

- **Target**: Lighthouse score > 90
- **Caching**: Hit rate > 80% sau warm-up
- **FCP**: < 1.5s
- **AI Cost**: ~$5-10/tháng (với caching)

## Deployment

### Vercel (khuyến nghị)

1. Push code lên GitHub
2. Import vào Vercel
3. Thêm environment variable: `GEMINI_API_KEY`
4. Deploy!

### Các platform khác

Project hỗ trợ deploy trên bất kỳ platform nào support Next.js 15:
- Vercel
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## License

[MIT License](LICENSE)

## Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

---

Được xây dựng với ❤️ cho cộng đồng Việt Nam
