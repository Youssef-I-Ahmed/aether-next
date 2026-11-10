const isDev = process.env.NODE_ENV === 'development';
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
].join('; ');

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  outputFileTracingIncludes: {
    '/[[...slug]]': ['./content/site/**/*.html'],
    '/en/[[...slug]]': ['./content/site/**/*.html'],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/:path+/index.html', destination: '/:path+', permanent: true },
    ];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Content-Security-Policy', value: contentSecurityPolicy },
      ],
    }];
  },
};

export default config;
