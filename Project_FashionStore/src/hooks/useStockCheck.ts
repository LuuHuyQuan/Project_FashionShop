import { useState, useEffect } from 'react';
import { catalogService, type StockCheckResponse } from '../services/catalogService';

interface UseStockCheckParams {
  productId: number;
  colorId?: number;
  sizeId?: number;
  variantId?: number;
}

export const useStockCheck = ({ productId, colorId, sizeId, variantId }: UseStockCheckParams) => {
  const [stockData, setStockData] = useState<StockCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStock = async () => {
      // Only check if we have the required parameters
      if (variantId) {
        setLoading(true);
        setError(null);
        try {
          const data = await catalogService.checkStockByVariantId(variantId);
          setStockData(data);
          console.log('Stock check by variantId:', variantId, data);
        } catch (err) {
          setError('Không thể kiểm tra tồn kho');
          console.error('Stock check error:', err);
          setStockData({ available: false, stockQuantity: 0 });
        } finally {
          setLoading(false);
        }
      } else if (productId && colorId && sizeId) {
        setLoading(true);
        setError(null);
        try {
          const data = await catalogService.checkStock(productId, colorId, sizeId);
          setStockData(data);
          console.log('Stock check by product/color/size:', { productId, colorId, sizeId }, data);
        } catch (err) {
          setError('Không thể kiểm tra tồn kho');
          console.error('Stock check error:', err);
          setStockData({ available: false, stockQuantity: 0 });
        } finally {
          setLoading(false);
        }
      } else {
        // Reset if parameters are incomplete
        setStockData(null);
      }
    };

    checkStock();
  }, [productId, colorId, sizeId, variantId]);

  const refetch = async () => {
    if (variantId) {
      setLoading(true);
      setError(null);
      try {
        const data = await catalogService.checkStockByVariantId(variantId);
        setStockData(data);
      } catch (err) {
        setError('Không thể kiểm tra tồn kho');
        console.error('Stock check error:', err);
      } finally {
        setLoading(false);
      }
    } else if (productId && colorId && sizeId) {
      setLoading(true);
      setError(null);
      try {
        const data = await catalogService.checkStock(productId, colorId, sizeId);
        setStockData(data);
      } catch (err) {
        setError('Không thể kiểm tra tồn kho');
        console.error('Stock check error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    stockData,
    loading,
    error,
    refetch,
    isAvailable: stockData?.available ?? false,
    stockQuantity: stockData?.stockQuantity ?? 0,
  };
};
