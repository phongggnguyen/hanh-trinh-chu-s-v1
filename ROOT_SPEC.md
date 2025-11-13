HÀNH TRÌNH CHỮ S
1) Tóm tắt & mục tiêu

Hành Trình Chữ S là web game giáo dục giúp người chơi khám phá 63 tỉnh thành Việt Nam qua các quiz trắc nghiệm sinh bởi AI, có hình minh hoạ, power‑ups (50/50, +15 giây), mở khóa tỉnh lân cận, lưu tiến trình và Nhật ký hành trình. Ứng dụng dùng Next.js 15 + React 18 + TypeScript, Server Actions, AI Genkit + Gemini cho tạo câu hỏi & ảnh.
Mục tiêu sản phẩm (MVP):

Bản đồ Việt Nam tương tác: locked / unlocked / conquered.

Mỗi tỉnh: 5 câu, 30s/câu, đạt ≥4/5 là “chinh phục”, mở khoá lân cận.

Power‑ups: 50/50 (ẩn 2 đáp án sai), +15 giây.

Lưu tiến trình (LocalStorage), Hà Nội & TP.HCM mở mặc định. 



Mục tiêu vận hành/production:

Caching quiz (TTL ≈ 24h), Sentry, Rate limiting, Zod validation.

Testing (unit/integration/E2E), SEO/JSON‑LD, GA4 + Vercel Analytics.
2) Phạm vi & không phạm vi

Trong phạm vi (MVP):

Gameplay, bản đồ SVG, quiz AI + ảnh, power‑ups, mở khoá lân cận, Journal, lưu tiến trình, tối ưu chi phí cơ bản. 


Ngoài phạm vi (đưa vào backlog):

PWA/offline, i18n, Leaderboard, Achievements, Dark mode, Sound, Social share, a11y nâng cao. (Sẽ triển khai sau phát hành). 
3) Công nghệ & ràng buộc

Frontend: Next.js 15 (App Router, Server Actions), React 18, TypeScript.

AI: Genkit + @genkit-ai/googleai, model Gemini 2.5 Pro (câu hỏi), Gemini 2.5 Flash Image (ảnh).

UI: Tailwind CSS, shadcn/ui, Radix UI, Lucide.

Yêu cầu môi trường: Node ≥ 20; dev tại http://localhost:9003. 


Khuyến nghị mở rộng khi scale: TanStack Query (cache/fetch), Zustand/Redux Toolkit (state lớn), streaming + retry cho AI. 

4) Cấu trúc dự án (chuẩn hoá):
src/
  app/                  # Next App Router (layout, page)
  components/
    game-board.tsx
    vietnam-map.tsx
    quiz-view.tsx
    quiz-completion-modal.tsx
    travel-journal.tsx
    ui/ ...             # shadcn/ui components
  contexts/
    game-context.tsx
  actions/
    quiz.actions.ts     # Server Action: getQuizForProvince()
  ai/
    genkit.ts           # cấu hình Genkit + Google AI
    dev.ts              # Genkit Dev UI (optional)
    flows/
      generate-quiz-questions.ts
      generate-quiz-images.ts
  lib/
    provinces.ts        # dữ liệu 63 tỉnh + láng giềng
    types.ts            # TS types: Province, QuizQuestion, GameState...
    utils.ts

Phân chia trên phải được giữ nhất quán để AI có thể sinh code theo thư mục/điểm móc đã định. 

5) Kiến trúc & luồng hoạt động

Luồng chính:

Người chơi click tỉnh unlocked trên VietnamMap.

Client gọi Server Action getQuizForProvince(provinceName).

Server chạy Genkit flows:

generate-quiz-questions → Gemini 2.5 Pro (trả 5 câu);

generate-quiz-images → Gemini 2.5 Flash Image cho từng câu (trả data URI).

QuizView hiển thị, tính điểm, ≥4/5 → CONQUER_PROVINCE → unlock láng giềng → lưu LocalStorage → Journal cập nhật. 

6) Mô hình dữ liệu & kiểu TypeScript
// lib/types.ts
export type ProvinceId = string; // vd: 'ha-noi', 'ho-chi-minh'

export interface Province {
  id: ProvinceId;
  name: string;         // 'Hà Nội'
  path: string;         // SVG path d
  neighbors: ProvinceId[];
}

export interface QuizQuestion {
  question: string;     // tiếng Việt
  options: string[];    // 4 đáp án
  correctAnswer: string;
  imageUrl?: string;    // data URI hoặc "" khi fallback
}

export interface GameState {
  unlocked: Set<ProvinceId>;
  conquered: Set<ProvinceId>;
}

export type GameAction =
  | { type: 'CONQUER_PROVINCE'; payload: { provinceId: ProvinceId; neighbors: ProvinceId[] } };

Mặc định unlocked có Hà Nội và TP.HCM, conquered rỗng.
lib/provinces.ts: chứa 63 provinces, neighbors để mở khóa lân cận; không cần liệt kê đầy đủ trong spec – chỉ định dạng như trên. 

7) Quy tắc gameplay

Mỗi tỉnh: 5 câu, 30s/câu, power‑ups 50/50 & +15 giây.

Điều kiện chinh phục: ≥4/5 → đổi trạng thái tỉnh sang conquered, mở khoá tất cả neighbors chưa chinh phục.

Persist game vào LocalStorage; Journal hiển thị tiến độ, danh sách tỉnh đã chinh phục. 

8) Thành phần UI & hợp đồng (contracts)
8.1 GameBoard

Vai trò: điều hướng Map ↔ Quiz, thanh tiêu đề, nút TravelJournal/Settings.

State nội bộ: selectedProvince: Province | null.

Luồng: onProvinceSelect(province) → setSelectedProvince(province); onComplete(province, success) cập nhật context rồi quay về Map.
8.2 VietnamMap

Props: onProvinceSelect(province: Province) => void.

Hiển thị: SVG path 63 tỉnh; class theo trạng thái locked/unlocked/conquered; ARIA + keyboard (Enter/Space) cho tỉnh unlocked

8.3 QuizView

Props:
province: Province,
onComplete: (province: Province, success: boolean) => void,
onExit: () => void.

Nội dung: tải câu hỏi qua getQuizForProvince, timer 30s, chấm điểm, highlight đúng/sai, power‑ups, progress bar, QuizCompletionModal. Success nếu ≥4/5.
8.4 TravelJournal

Vai trò: liệt kê tỉnh đã chinh phục, tổng số /63. (Sheet/Drawer).
9) Quản lý state

GameContext (React Context + useReducer):

unlocked: Set<ProvinceId>; conquered: Set<ProvinceId>.

Action CONQUER_PROVINCE: thêm provinceId vào conquered, unlock neighbors chưa conquered.

Persist vào LocalStorage (khởi tạo & mỗi lần thay đổi). 



Gợi ý mở rộng khi quy mô lớn: cân nhắc Zustand/Redux Toolkit để giảm re-render & tổ chức state phức tạp; TanStack Query cho cache/fetch dữ liệu AI theo tỉnh (SWR) và streaming để giảm độ trễ cảm nhận.

10) Server Actions & tích hợp AI
10.1 Hợp đồng Server Action
// actions/quiz.actions.ts
export async function getQuizForProvince(provinceName: string): Promise<QuizQuestion[]>;
Trách nhiệm:

Gọi flow generate-quiz-questions (5 câu, tiếng Việt);

Với mỗi câu, gọi generate-quiz-images (trả data URI); nếu lỗi → imageUrl: "";

Áp dụng cache/validation/rate‑limit/logging (xem §11).
10.2 Genkit + Gemini (flows)

Flow 1 — generate-quiz-questions

Input: { provinceName: string; numberOfQuestions: 5 }

Output Schema:
{ questions: { question: string; options: string[]; correctAnswer: string; }[] }
Ràng buộc: mọi text bắt buộc tiếng Việt, 4 đáp án/1 đúng; nội dung an toàn, không vi phạm chuẩn mực.

Model: Gemini 2.5 Pro.
Prompt gợi ý (tối giản, ràng buộc JSON):
Bạn là hệ thống sinh câu hỏi trắc nghiệm về tỉnh {{provinceName}}.
Sinh đúng {{numberOfQuestions}} câu, tiếng Việt, mỗi câu có 4 phương án và 1 đáp án đúng.
Phủ các chủ đề: địa lý, lịch sử, văn hóa, đặc sản, địa danh. 
Trả về đúng JSON theo schema đã cho, không thêm lời dẫn.
(Genkit định nghĩa schema Zod để ép đầu ra hợp lệ.) 
Flow 2 — generate-quiz-images

Input: { question: string }

Output: { imageUrl: string /* data URI */ }

Model: Gemini 2.5 Flash Image. Nếu lỗi hoặc rate‑limit → fallback imageUrl: "".

11) Tin cậy, hiệu năng & chi phí (Production‑ready)

Bắt buộc triển khai (Critical):

Caching quiz: TTL ~24h, đảo chiều in‑memory + LocalStorage để giảm ~90% gọi AI; log cache hit/miss.

Sentry: client + server + Replay/Performance; gắn tag province trong getQuizForProvince.

Rate limiting: ví dụ rate-limiter-flexible (10 req/60s) cho action/flow AI.

Validation: Zod cho input (tên tỉnh/đáp án) và output AI.
Tất cả có mẫu/định hướng trong kế hoạch nâng cấp. 



Tối ưu nâng cao: dynamic import, next/image, TanStack Query (SWR), streaming và retry/backoff cho AI. 
12) SEO, Analytics, a11y

SEO: viewport, Open Graph, Twitter Card, JSON‑LD (WebApplication).

Analytics: GA4 + Vercel Analytics/Speed Insights; log events: quiz_started, quiz_completed, power_up_used, province_conquered.

A11y: Skip link, aria-live cho thông báo, full keyboard trên bản đồ/progress/modal. 

NANG_CAP_PROJECT
13) Testing & chất lượng

Unit/Integration: Jest + React Testing Library (VietnamMap hiển thị 63 path & click unlocked; reducer mở khoá lân cận; QuizView tính điểm/power‑ups).

E2E: Playwright kịch bản: chinh phục thành công/thất bại, dùng power‑ups, quay lại Map.

Mục tiêu: coverage ≥70%; chạy trong CI
14) Cấu hình, cài đặt & chạy

Env: .env.local với GOOGLE_GENAI_API_KEY.

Dev: npm run dev → http://localhost:9003
.

(Tùy chọn) Genkit Dev UI để test flow trong dev.

Node ≥ 20 là bắt buộc
15) Phát hành

Vercel: import repo, thêm env GOOGLE_GENAI_API_KEY, build & deploy.

Kiểm thử trên production: gọi quiz thật, quan sát Sentry/Analytics, kiểm tra cache.
16) Backlog sau MVP

PWA (manifest + service worker), i18n (vi/en), Leaderboard, Achievements, Dark mode, Sound effects, Social share, a11y nâng cao.

Theo roadmap ưu tiên: Critical → High → Medium (đã có checklist & mã mẫu).
17) Định nghĩa hoàn tất (Definition of Done)

Gameplay Map → Quiz → Conquer → Unlock neighbors → Journal chạy mượt; persist state. 



AI tạo đủ 5 câu/câu hỏi tiếng Việt + ảnh (hoặc fallback rỗng), đúng schema; lỗi được log Sentry. 



Cache/Rate‑limit/Zod hoạt động; SEO/JSON‑LD/Analytics có dữ liệu; tests pass, coverage ≥70%. 

18) Phụ lục A — Chuẩn code & đặt tên

Alias path: @/* → src/*.

Kiểu đặt tên province: kebab-case id (vd: ho-chi-minh), name Unicode chuẩn tiếng Việt; neighbors dùng id. 



UI dùng shadcn/ui; style bằng Tailwind; ưu tiên component nhỏ, stateless. 
19) Phụ lục B — Hợp đồng dữ liệu ví dụ

Response mẫu từ getQuizForProvince("Hà Nội"):
[
  {
    "question": "Đặc sản nổi tiếng của Hà Nội là gì?",
    "options": ["Phở", "Cơm tấm", "Bánh xèo", "Bánh pía"],
    "correctAnswer": "Phở",
    "imageUrl": "data:image/png;base64,..." 
  },
  { "question": "...", "options": ["...","...","...","..."], "correctAnswer": "...", "imageUrl": "" },
  { "question": "...", "options": ["...","...","...","..."], "correctAnswer": "...", "imageUrl": "..." },
  { "question": "...", "options": ["...","...","...","..."], "correctAnswer": "..." },
  { "question": "...", "options": ["...","...","...","..."], "correctAnswer": "..." }
]
Ảnh có thể rỗng nếu flow ảnh thất bại → UI vẫn phải hiển thị tốt.
20) Phụ lục C — Prompt & schema (rút gọn)

Zod schema (ý tưởng):
const QuizQuestionSchema = z.object({
  question: z.string().min(8),
  options: z.array(z.string()).length(4),
  correctAnswer: z.string()
});
const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).length(5)
});
Prompt ràng buộc JSON như §10.2; phải trả đúng schema (Genkit xác thực).
21) KPI & chi phí (tham chiếu)

Perf: Lighthouse >90, FCP <1.5s; Cache Hit >80%.

Chất lượng: Coverage >70%; zero critical production errors.

Sử dụng: 7‑day retention >50%; MAU >10k; tỷ lệ hoàn tất 63 tỉnh >30%.

Chi phí AI mục tiêu ~$5–10/tháng khi đã cache. 

22) Hướng dẫn bắt đầu (quickstart)

Cài đặt: Node ≥20; npm i.

.env.local: GOOGLE_GENAI_API_KEY=....

npm run dev → http://localhost:9003
 (tùy chọn: mở Genkit Dev UI).

Click Hà Nội (unlocked) → chơi quiz → quan sát state/Journal. 

