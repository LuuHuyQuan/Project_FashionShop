import React from 'react';

const AdminLoadingFallback: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ minHeight: '60vh' }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
          style={{
            borderColor: 'rgba(102,126,234,0.3)',
            borderTopColor: '#667eea'
          }}
        />
        <p className="text-sm text-slate-500 animate-pulse font-medium">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
};

export default AdminLoadingFallback;
