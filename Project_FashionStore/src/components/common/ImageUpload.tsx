import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { fileToBase64, validateImageFile, compressImage } from '../../utils/imageUtils';

interface ImageUploadProps {
  value?: string; // Base64 string or URL
  onChange: (base64: string) => void;
  onRemove?: () => void;
  label?: string;
  maxSize?: number; // in MB
  compress?: boolean;
  maxWidth?: number;
  quality?: number;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  label = 'Chọn ảnh',
  maxSize = 5,
  compress = true,
  maxWidth = 1200,
  quality = 0.8,
  className = '',
}) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || 'File không hợp lệ');
        setLoading(false);
        return;
      }

      // Convert to base64
      let base64: string;
      if (compress) {
        base64 = await compressImage(file, maxWidth, quality);
      } else {
        base64 = await fileToBase64(file);
      }

      setPreview(base64);
      onChange(base64);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải ảnh');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {preview ? (
          // Preview mode
          <div className="relative group">
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="px-4 py-2 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                >
                  Đổi ảnh
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Upload mode
          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-300 hover:border-purple-500 bg-slate-50 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-slate-600 font-medium">Đang tải ảnh...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <Upload size={28} className="text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-700 mb-1">
                    Nhấn để chọn ảnh
                  </p>
                  <p className="text-xs text-slate-500">
                    JPG, PNG, GIF, WEBP (tối đa {maxSize}MB)
                  </p>
                </div>
              </>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {compress && (
        <p className="text-xs text-slate-400">
          * Ảnh sẽ được tự động nén để tối ưu dung lượng
        </p>
      )}
    </div>
  );
};

// Multiple images upload
interface MultipleImageUploadProps {
  value?: string[]; // Array of base64 strings
  onChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
  maxSize?: number;
  compress?: boolean;
  className?: string;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  value = [],
  onChange,
  label = 'Chọn nhiều ảnh',
  maxImages = 5,
  maxSize = 5,
  compress = true,
  className = '',
}) => {
  const [previews, setPreviews] = useState<string[]>(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max images
    if (previews.length + files.length > maxImages) {
      setError(`Chỉ được tải tối đa ${maxImages} ảnh`);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const newBase64Images: string[] = [];

      for (const file of files) {
        // Validate
        const validation = validateImageFile(file);
        if (!validation.valid) {
          setError(validation.error || 'File không hợp lệ');
          continue;
        }

        // Convert
        const base64 = compress
          ? await compressImage(file, 1200, 0.8)
          : await fileToBase64(file);

        newBase64Images.push(base64);
      }

      const updatedImages = [...previews, ...newBase64Images];
      setPreviews(updatedImages);
      onChange(updatedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải ảnh');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onChange(updated);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} ({previews.length}/{maxImages})
        </label>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group aspect-square">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-xl border-2 border-slate-200"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X size={16} />
            </button>
            {index === 0 && (
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded">
                Ảnh chính
              </div>
            )}
          </div>
        ))}

        {previews.length < maxImages && (
          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-purple-500 bg-slate-50 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ImageIcon size={24} className="text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">Thêm ảnh</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        multiple
        onChange={handleFilesSelect}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};
