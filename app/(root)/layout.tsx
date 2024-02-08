import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
import { dark } from "@clerk/themes";

export const metadata = {
  title: 'Thread Clone',
  description: 'Generate A Threads Clone using Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider       appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body>
          <Topbar/>
          <main className='flex flex-row'>
            <LeftSidebar/>
            <section className='main-container'>
              <div className='w-full max-w-6xl'>
                {children}
              </div>
            </section>
            <RightSidebar/>
          </main>
          <Bottombar/>
        </body>
      </html>
    </ClerkProvider>
  )
}
