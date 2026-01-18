import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GameProvider } from '@/contexts/game-context';
import { ErrorBoundary } from '@/components/error-boundary';
import { DongSonPattern, TextureOverlay } from '@/components/ui/patterns';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
};

export const metadata: Metadata = {
  title: 'Hành Trình Chữ S - Khám phá 63 tỉnh thành Việt Nam',
  description:
    'Web game giáo dục giúp bạn khám phá 63 tỉnh thành Việt Nam qua các câu hỏi trắc nghiệm thú vị được tạo bởi AI.',
  keywords: [
    'Việt Nam',
    'tỉnh thành',
    'quiz',
    'giáo dục',
    'game',
    'địa lý',
    'văn hóa',
  ],
  authors: [{ name: 'Hành Trình Chữ S' }],
  openGraph: {
    title: 'Hành Trình Chữ S - Khám phá 63 tỉnh thành Việt Nam',
    description:
      'Web game giáo dục giúp bạn khám phá 63 tỉnh thành Việt Nam qua các câu hỏi trắc nghiệm thú vị.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Hành Trình Chữ S',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hành Trình Chữ S - Khám phá 63 tỉnh thành Việt Nam',
    description:
      'Web game giáo dục giúp bạn khám phá 63 tỉnh thành Việt Nam qua các câu hỏi trắc nghiệm thú vị.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Hành Trình Chữ S',
              description:
                'Web game giáo dục giúp bạn khám phá 63 tỉnh thành Việt Nam qua các câu hỏi trắc nghiệm thú vị được tạo bởi AI.',
              applicationCategory: 'EducationalGame',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'VND',
              },
              inLanguage: 'vi',
              contentRating: 'Everyone',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen relative overflow-x-hidden selection:bg-primary/20`}>
        {/* Global Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <DongSonPattern className="opacity-[0.03] text-primary w-full h-full object-cover" />
          <TextureOverlay />
        </div>

        <main className="relative z-10">
          <ErrorBoundary>
            <GameProvider>{children}</GameProvider>
          </ErrorBoundary>
        </main>
      </body>
    </html>
  );
}
