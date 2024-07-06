import { GeistSans } from 'geist/font/sans'
import './globals.css'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ThemeProvider } from '@/components/theme-provider'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'BLEND',
  description: ' Mix, Shared Life',
}

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      {/* suppressHydrationWarning =  hydration warning 무시 */}
      <body className=" text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
