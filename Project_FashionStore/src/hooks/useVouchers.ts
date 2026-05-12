import { useState, useEffect } from 'react';
import { orderingService, Voucher, CreateVoucherRequest, UpdateVoucherRequest } from '../services';

export const useVouchers = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVouchers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderingService.getAllVouchers();
      setVouchers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vouchers');
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveVouchers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderingService.getActiveVouchers();
      setVouchers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch active vouchers');
    } finally {
      setLoading(false);
    }
  };

  const getVoucherByCode = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderingService.getVoucherByCode(code);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch voucher');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const validateVoucher = async (code: string, orderAmount: number, userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await orderingService.validateVoucher(code, orderAmount, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate voucher');
      return { isValid: false, message: 'Validation failed' };
    } finally {
      setLoading(false);
    }
  };

  const createVoucher = async (data: CreateVoucherRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newVoucher = await orderingService.createVoucher(data);
      setVouchers([...vouchers, newVoucher]);
      return newVoucher;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create voucher');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateVoucher = async (id: number, data: UpdateVoucherRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await orderingService.updateVoucher(id, data);
      setVouchers(vouchers.map(v => v.id === id ? updated : v));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update voucher');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteVoucher = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await orderingService.deleteVoucher(id);
      setVouchers(vouchers.filter(v => v.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete voucher');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    vouchers,
    loading,
    error,
    fetchVouchers,
    fetchActiveVouchers,
    getVoucherByCode,
    validateVoucher,
    createVoucher,
    updateVoucher,
    deleteVoucher,
  };
};
