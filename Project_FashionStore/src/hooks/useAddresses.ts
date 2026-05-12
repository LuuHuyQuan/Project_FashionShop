import { useState, useEffect } from 'react';
import { orderingService, Address, CreateAddressRequest, UpdateAddressRequest } from '../services';

export const useAddresses = (userId?: number) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async (uid: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderingService.getUserAddresses(uid);
      setAddresses(data);
      const defaultAddr = data.find(addr => addr.isDefault);
      if (defaultAddr) {
        setDefaultAddress(defaultAddr);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultAddress = async (uid: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderingService.getDefaultAddress(uid);
      setDefaultAddress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch default address');
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (data: CreateAddressRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newAddress = await orderingService.createAddress(data);
      setAddresses([...addresses, newAddress]);
      if (newAddress.isDefault) {
        setDefaultAddress(newAddress);
      }
      return newAddress;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create address');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: number, data: UpdateAddressRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await orderingService.updateAddress(id, data);
      setAddresses(addresses.map(addr => addr.id === id ? updated : addr));
      if (updated.isDefault) {
        setDefaultAddress(updated);
      }
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update address');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await orderingService.deleteAddress(id);
      setAddresses(addresses.filter(addr => addr.id !== id));
      if (defaultAddress?.id === id) {
        setDefaultAddress(null);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete address');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setAsDefault = async (id: number, uid: number) => {
    setLoading(true);
    setError(null);
    try {
      await orderingService.setDefaultAddress(id, uid);
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }));
      setAddresses(updatedAddresses);
      const newDefault = updatedAddresses.find(addr => addr.id === id);
      if (newDefault) {
        setDefaultAddress(newDefault);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set default address');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  return {
    addresses,
    defaultAddress,
    loading,
    error,
    fetchAddresses,
    fetchDefaultAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setAsDefault,
  };
};
