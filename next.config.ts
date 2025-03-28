import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'loremflickr.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'cloudflare-ipfs.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '*.placeholder.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
