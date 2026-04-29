import toast from 'react-hot-toast';

// Default max file size is 2MB
export const validateFileSize = (file: File, maxFileSize = 2 * 1024 * 1024) => {
  let maxSizeFormatted: string;
  if (maxFileSize >= 1024 * 1024 * 1024) {
    maxSizeFormatted = (maxFileSize / (1024 * 1024 * 1024)).toFixed(0) + ' GB';
  } else {
    maxSizeFormatted = (maxFileSize / (1024 * 1024)).toFixed(1) + ' MB';
  }

  if (file.size > maxFileSize) {
    toast.error(`File size is too large. Maximum size is ${maxSizeFormatted}`);
    return false;
  }
  return true;
};
