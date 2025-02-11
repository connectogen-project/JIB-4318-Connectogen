/** @type {import('next').NextConfig} */
import { resolve, dirname } from 'path';
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@'] = resolve(__dirname, '../../packages/ui/src');
        return config;
    },
};

export default nextConfig;
