// src/pages/Announcements.tsx
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bell, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getAnnouncements } from '../lib/api';
import { Announcement } from '../lib/types';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        setError('Gagal mengambil pengumuman.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <Helmet>
        <title>Pengumuman - SD Islam Umar Bin Abdul Aziz</title>
        <meta
          name="description"
          content="Pengumuman dan informasi penting dari SD Islam Umar Bin Abdul Aziz. Dapatkan update terbaru tentang kebijakan dan kegiatan sekolah."
        />
        <meta
          name="keywords"
          content="pengumuman SD Islam Umar Bin Abdul Aziz, informasi sekolah, kebijakan sekolah, berita penting"
        />
        <link rel="canonical" href="https://cendekianusantara.sch.id/announcements" />
      </Helmet>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pengumuman</h1>

        {loading && <p className="text-center text-gray-600">Memuat pengumuman...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="space-y-6">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <article
                  key={announcement.id}
                  className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
                    announcement.important ? 'border-red-500' : 'border-indigo-500'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Bell
                        className={`h-6 w-6 ${
                          announcement.important ? 'text-red-500' : 'text-indigo-500'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {announcement.title}
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                        {new Date(announcement.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      {/* Render rich text content dengan DOMPurify */}
                      <div
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(announcement.content),
                        }}
                      />
                      <div className="flex justify-end mt-4">
                        <Link
                          to={`/announcements/${announcement.id}`}
                          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada pengumuman saat ini.</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}
