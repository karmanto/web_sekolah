// pages/admin/gallery/edit.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { getGalleryItem, updateGalleryItem } from '../../../lib/api';
import { GalleryItem } from '../../../lib/types';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function EditGallery() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await getGalleryItem(id);
        setGalleryItem(data);
        setTitle(data.title);
        setDate(data.date);
      } catch (error) {
        console.error('Gagal mengambil data galeri:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateGalleryItem(id, { title, date, image: image || undefined });
      navigate('/admin/gallery');
    } catch (error) {
      console.error('Gagal mengupdate foto:', error);
    }
  };

  if (!galleryItem) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Edit Foto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="p-2 mt-1 block w-full"
          />
          {galleryItem.image && !image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Gambar saat ini:</p>
              <img
                src={
                  typeof galleryItem.image === 'string'
                    ? `${API_URL}/storage/${galleryItem.image}`
                    : galleryItem.image
                    ? URL.createObjectURL(galleryItem.image)
                    : ''
                }
                alt={galleryItem.title}
                className="h-20 w-20 rounded object-cover"
              />
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
