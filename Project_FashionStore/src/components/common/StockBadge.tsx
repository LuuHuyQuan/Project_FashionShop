import React from 'react';

interface StockBadgeProps {
  stockQuantity: number;
  available: boolean;
  loading?: boolean;
  className?: string;
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  stockQuantity,
  available,
  loading = false,
  className = ''
}) => {
  if (loading) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${className}`}>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span className="text-gray-600">Đang kiểm tra...</span>
      </div>
    );
  }

  if (!available || stockQuantity <= 0) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm font-medium ${className}`}>
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span>Hết hàng</span>
      </div>
    );
  }

  if (stockQuantity <= 5) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-medium ${className}`}>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <span>Sắp hết - Còn {stockQuantity}</span>
      </div>
    );
  }

  if (stockQuantity <= 20) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium ${className}`}>
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <span>Còn {stockQuantity}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium ${className}`}>
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span>Còn {stockQuantity}</span>
    </div>
  );
};
