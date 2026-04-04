import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
          style={{
            borderColor: 'rgba(102,126,234,0.2)',
            borderTopColor: '#667eea'
          }}
        />
        <p className="text-sm text-slate-400 animate-pulse">Đang tải...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
