import { orderingApi } from '../lib/axios';

export interface Voucher {
  id: number;
  code: string;
  name: string;
  description: string | null;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number | null;
  maxDiscountAmount: number | null;
  totalQuantity: number | null;
  usedQuantity: number;
  remainingQuantity?: number | null;
  startDate: string;
  endDate: string;
  status: string;
  createdAt?: string;
}

export interface VoucherValidationResponse {
  id: number;
  code: string;
  name: string;
  description: string | null;
  discountType: string;
  discountValue: number;
  discountAmount: number;
  minOrderAmount: number | null;
  maxDiscountAmount: number | null;
}

export interface CreateVoucherRequest {
  code: string;
  name: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  totalQuantity?: number;
  startDate: string;
  endDate: string;
  status?: string;
}

export interface UpdateVoucherRequest {
  code: string;
  name: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  totalQuantity?: number;
  startDate: string;
  endDate: string;
  status: string;
}

export const voucherService = {
  // Validate voucher
  validateVoucher: async (code: string, orderAmount: number): Promise<VoucherValidationResponse> => {
    const response = await orderingApi.post('/Vouchers/validate', { code, orderAmount });
    return response.data;
  },

  // Get active vouchers (for users)
  getActiveVouchers: async (): Promise<Voucher[]> => {
    const response = await orderingApi.get('/Vouchers/active');
    return response.data;
  },

  // Get all vouchers (for admin)
  getAllVouchers: async (): Promise<Voucher[]> => {
    const response = await orderingApi.get('/Vouchers');
    return response.data;
  },

  // Get voucher by ID
  getVoucherById: async (id: number): Promise<Voucher> => {
    const response = await orderingApi.get(`/Vouchers/${id}`);
    return response.data;
  },

  // Create voucher (admin only)
  createVoucher: async (data: CreateVoucherRequest): Promise<{ id: number; message: string }> => {
    const response = await orderingApi.post('/Vouchers', data);
    return response.data;
  },

  // Update voucher (admin only)
  updateVoucher: async (id: number, data: UpdateVoucherRequest): Promise<{ message: string }> => {
    const response = await orderingApi.put(`/Vouchers/${id}`, data);
    return response.data;
  },

  // Delete voucher (admin only)
  deleteVoucher: async (id: number): Promise<{ message: string }> => {
    const response = await orderingApi.delete(`/Vouchers/${id}`);
    return response.data;
  },
};
