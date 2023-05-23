import './globals.css';

import Navbar from './components/navbar/Navbar';
import AuthContext from './context/AuthContext';

export const metadata = {
  title: 'URL Shortener',
  description: 'URL Shortener built with Next.JS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='base-100' data-theme='light' lang='en'>
      <body>
        <AuthContext>
          <Navbar />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
