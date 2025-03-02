import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

// Spécifier explicitement le chemin du fichier de configuration
const withNextIntl = createNextIntlPlugin('./src/i18n/index.ts'); // OU './src/i18n/request.ts'
export default withNextIntl(nextConfig);
