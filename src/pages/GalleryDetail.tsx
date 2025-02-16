import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GalleryItem } from '../lib/types';
import { getGalleryItem } from '../lib/api';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function GalleryDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError('Foto tidak ditemukan');
        setLoading(false);
        return;
      }

      try {
        const data = await getGalleryItem(id);
        setItem(data);
      } catch (err) {
        setError('Gagal memuat foto.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/gallery" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali ke galeri
      </Link>

      {loading && <p className="text-center text-gray-600">Memuat foto...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && item && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full max-h-[70vh] object-contain bg-black"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                {new Date(item.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
