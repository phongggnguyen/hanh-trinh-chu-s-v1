import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GameProvider } from '@/contexts/game-context';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

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
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
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
      <body className={inter.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
