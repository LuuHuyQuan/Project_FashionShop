import axios from 'axios';

const API_URL = 'https://localhost:7298/api/Vouchers';

export interface Voucher {
  id: number;
  code: string;
  name: string;
  description?: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  discountAmount?: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  totalQuantity?: number;
  usedQuantity?: number;
  remainingQuantity?: number;
  startDate: string;
  endDate: string;
}

export interface ValidateVoucherRequest {
  code: string;
  orderAmount: number;
}

export const voucherService = {
  // Validate voucher code
  validateVoucher: async (request: ValidateVoucherRequest): Promise<Voucher> => {
    const response = await axios.post(`${API_URL}/validate`, request);
    return response.data;
  },

  // Get all active vouchers
  getActiveVouchers: async (): Promise<Voucher[]> => {
    const response = await axios.get(`${API_URL}/active`);
    return response.data;
  },
};
