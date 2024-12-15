
import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import SideBar from '@/app/components/SideBar'

import NavBar from '@/app/components/NavBar'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'agora',
  description: 'Agora Ecommerce Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
        <div className="z-0  relative  ">
          <NavBar />
          <div className=' align-right'>{children}</div>

          <div className='absolute  top-12 min-w-[24px] px-4 '>
          <SideBar />
          </div>
        </div>       
  
        {/* <div className="flex min-w-screen">
            <SideBar />
          <div className="w-screen flex-col">
          <NavBar /> */}
          {/* {children} */}
          {/* </div>
          </div> */}
       
      </body>
    </html>
  )
}
