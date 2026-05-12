import Swal from 'sweetalert2';

// Custom SweetAlert2 utility wrapper
export const swal = {
  // Success alert
  success: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#7c3aed',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true,
    });
  },

  // Error alert
  error: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'OK',
    });
  },

  // Warning alert
  warning: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: '#f59e0b',
      confirmButtonText: 'OK',
    });
  },

  // Info alert
  info: (title: string, text?: string) => {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'OK',
    });
  },

  // Confirmation dialog
  confirm: (title: string, text?: string, confirmText = 'Xác nhận', cancelText = 'Hủy') => {
    return Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#7c3aed',
      cancelButtonColor: '#64748b',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
  },

  // Delete confirmation
  confirmDelete: (title = 'Bạn có chắc chắn?', text = 'Hành động này không thể hoàn tác!') => {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });
  },

  // Loading alert
  loading: (title = 'Đang xử lý...', text?: string) => {
    return Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

  // Close loading
  close: () => {
    Swal.close();
  },

  // Toast notification (small popup at top-right)
  toast: {
    success: (message: string) => {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },
    error: (message: string) => {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },
    info: (message: string) => {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },
    warning: (message: string) => {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },
  },
};

export default swal;
