import './globals.css';
import {Inter} from 'next/font/google';
import Providers from "@/utils/providers";
import {RouteGuard} from "@/app/components/RouteGuard";

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Document Verify',
  description: 'Track you document being approved in real time',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
          <RouteGuard>
            {children}
          </RouteGuard>
        </Providers>
      </body>
    </html>
  )
};
