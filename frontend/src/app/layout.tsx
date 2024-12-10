import '@/app/globals.css';
import { AppSidebar } from '@/components/side-bar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'Test',
  description: 'Create interest and get recommendations',
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="antialiased h-screen flex flex-col">
    <SidebarProvider>
      <AppSidebar/>
      <main>
        {children}
      </main>
      <Toaster/>
    </SidebarProvider>
    </body>
    </html>
  );
}
