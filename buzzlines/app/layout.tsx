import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Link from 'next/link'

const ff = Raleway({ subsets: ['latin'] })
const timeZone = 'Europe/London'

export const metadata: Metadata = {
  title: 'BuzzLines - join the buzz',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={ff.className}>
        <header className='bg-black text-white'>
          <div className='flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-10 text-yellow-400 mx-2'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>

            <span className='text-5xl'>BuzzLines</span>
          </div>
          <nav className='flex justify-start'>
            <Link href={'/'} className=''>
              Home
            </Link>
            <Link href={'/stops'} className='mx-8'>
              Stops
            </Link>
            <Link href={'/about'}>About</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className='fixed bottom-1 right-1 text-xs'>
          <div>&copy; 2023 BuzzLines</div>
        </footer>
      </body>
    </html>
  )
}
