import { useParams, useNavigate } from 'react-router-dom';
import { getArticle, updateArticle } from '../../../lib/api';
import { Article } from '../../../lib/types';
import 'react-quill/dist/quill.snow.css';
import { useState, lazy, Suspense, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
const ReactQuill = lazy(() => import('react-quill'));

export default function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDataArticle = async () => {
      try {
        const data = await getArticle(id);
        setArticle(data);
        setTitle(data.title);
        setContent(data.content);
        setDate(data.date);
        setAuthor(data.author);
      } catch (error) {
        console.error('Gagal mengambil artikel:', error);
      }
    };
    fetchDataArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateArticle(id, {
        title,
        content,
        date,
        author,
        image: image || undefined,
      });
      navigate('/admin/articles');
    } catch (error) {
      console.error('Gagal mengupdate artikel:', error);
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Edit Artikel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Judul
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Konten
          </label>
          <Suspense fallback={<div>Loading Editor...</div>}>
            <ReactQuill value={content} onChange={setContent} />
          </Suspense>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Penulis
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gambar
          </label>
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
          {article.image && !image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Gambar saat ini:
              </p>
              <img
                src={
                    typeof article.image === 'string'
                    ? `${API_URL}/storage/${article.image}`
                    : article.image
                    ? URL.createObjectURL(article.image)
                    : ''
                }
                className="h-10 w-10 rounded object-cover"
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
