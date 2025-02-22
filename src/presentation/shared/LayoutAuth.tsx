import React from 'react';

interface LayoutAuthProps {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: LayoutAuthProps) {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-background"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #007868 49px, transparent 1%),
          linear-gradient(#007868 49px, transparent 1%)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: 'center',
      }}
    >
      <div className="container flex min-h-screen w-full items-center justify-center py-8">
        {children}
      </div>
    </div>
  );
}
