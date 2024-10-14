import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AppContextProvider } from '@/lib/store/AppContext';
import { cookies } from 'next/headers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'EasyGenerator',
  description:
    'Easygenerator simplifies and speeds up course creation 12x. Try the #1 best e-learning authoring tool for free and start creating today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get('token')?.value;

  return (
    <html lang='en'>
      <body className={`${geistSans.className} antialiased`}>
        <AppContextProvider token={token}>{children}</AppContextProvider>
      </body>
    </html>
  );
}
