import React from 'react';

function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen items-center justify-center p-6 bg-slate-50">{children}</div>
  );
}

export default LayoutAuth;
