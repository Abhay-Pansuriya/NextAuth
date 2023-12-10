/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: "thisisthesecrtetjtysahfjkarhjklhsgjkh",
        NEXTAUTH_URL: "http://localhost:3000",
        MONGO_URL: "mongodb://127.0.0.1:27017/nextAuth"
    }
}

module.exports = nextConfig
