export const uploadImage = async (file) => {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!preset || !cloudName) {
    throw new Error('Missing Cloudinary environment variables');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  const res = await fetch('https://api.cloudinary.com/v1_1/ddfss9v6q/image/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text(); // đọc lỗi chi tiết từ Cloudinary
    throw new Error(`Cloudinary upload failed: ${error}`);
  }

  const data = await res.json();
  return data.secure_url;
};
