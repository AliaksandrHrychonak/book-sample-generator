import { Geist, Geist_Mono } from 'next/font/google';

import '../styles/global.css';

import { Toaster } from '@shared/ui';

import { WithThemeProvider } from '../providers';

import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

interface RootLayoutProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: 'Users Dashboard',
};

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-svh font-sans antialiased select-none flex flex-col`}
            >

                    <WithThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
                        {children}
                    </WithThemeProvider>
                    <Toaster />

            </body>
        </html>
    );
};

export default RootLayout;
