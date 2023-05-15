import './globals.css'

import Navbar from './components/navbar/Navbar'

export const metadata = {
  title: 'URL Shortener',
  description: 'URL Shortener built with Next.JS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="base-100" data-theme="light" lang="en">
        <body>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
