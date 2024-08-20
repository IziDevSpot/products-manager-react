// SplashScreenClient.tsx (Client Component)
"use client";

import React, { useState, useEffect } from 'react';

interface SplashScreenClientProps {
  children: React.ReactNode;
}

const SplashScreenClient: React.FC<SplashScreenClientProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a delay for the splash screen (you can replace this with your actual data loading logic)
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return showSplash ? (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold">Loading...</h1>
    </div>
  ) : (
    <>{children}</>
  );
};

export default SplashScreenClient;
