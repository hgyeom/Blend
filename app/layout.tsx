import { GeistSans } from 'geist/font/sans'
import './globals.css'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import QueryProvider from '@/components/query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastProvider } from '@/components/toast-provider'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'BLEND',
  description: ' Mix, Shared Life',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      {/* suppressHydrationWarning =  hydration warning 무시 */}
      <body className=" text-foreground">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <Navbar />
            {/* <main className="flex-auto w-full xl:w-4/5 min-h-screen flex flex-col items-center justify-center"> */}
            <main className="max-w-6xl min-h-fit mx-auto flex flex-col items-center">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
