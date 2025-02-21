import React from 'react';

interface LayoutAuthProps {
  children: React.ReactNode;
}

const LayoutAuth: React.FC<LayoutAuthProps> = ({ children }) => {
  return (
    <div
      className="m-0 flex min-h-screen items-center justify-center bg-white"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #007868 49px, transparent 1%),
          linear-gradient(#007868 49px, transparent 1%)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default LayoutAuth;
