import React from 'react';

function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen items-center justify-center bg-slate-50 p-6">
      {children}
    </div>
  );
}

export default LayoutAuth;
