/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/login", destination: "/auth/login" },
      { source: "/signup", destination: "/auth/signup" },
      { source: "/forgetPassword", destination: "/auth/forgetPassword" },
      { source: "/RegisterValidate", destination: "/auth/RegisterValidate" },
      { source: "/ResetValidate", destination: "/auth/ResetValidate" },
      { source: "/resetPassword", destination: "/auth/resetPassword" },
    ];
  },
};

export default nextConfig;
