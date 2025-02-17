import { useNavigate } from 'react-router-dom';
import { addArticle } from '../../../lib/api';
import 'react-quill/dist/quill.snow.css';
import { useState, lazy, Suspense } from 'react';

const ReactQuill = lazy(() => import('react-quill'));

export default function CreateArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addArticle({ title, content, date, author, image: image || undefined });
      navigate('/admin/articles');
    } catch (error) {
      console.error('Gagal menambahkan artikel:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Tambah Artikel</h1>
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
          <label className="block text-sm font-medium text-gray-700">Konten</label>
          <Suspense fallback={<div>Loading Editor...</div>}>
            <ReactQuill value={content} onChange={setContent} />
          </Suspense>
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
          <label className="block text-sm font-medium text-gray-700">Penulis</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
