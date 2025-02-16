import { useEffect, useState, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnnouncement, updateAnnouncement } from '../../../lib/api';
import { Announcement } from '../../../lib/types';

const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';

export default function EditAnnouncement() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchAnnouncement = async () => {
      try {
        const data = await getAnnouncement(id);
        setAnnouncement(data);
        setTitle(data.title);
        setContent(data.content);
        setDate(data.date);
        setImportant(data.important);
      } catch (error) {
        console.error('Gagal mengambil pengumuman:', error);
      }
    };
    fetchAnnouncement();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateAnnouncement(id, { title, content, date, important });
      navigate('/admin/announcements');
    } catch (error) {
      console.error('Gagal mengupdate pengumuman:', error);
    }
  };

  if (!announcement) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Edit Pengumuman</h1>
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
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Penting</label>
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
