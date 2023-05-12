import Navbar from './components/navbar/Navbar'
import './globals.css'

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
    <html className=" bg-gray-50 " data-theme="light" lang="en">
        <body>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
