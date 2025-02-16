// src/pages/AnnouncementDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Bell } from 'lucide-react';
import DOMPurify from 'dompurify';
import { getAnnouncement } from '../lib/api';
import { Announcement } from '../lib/types';

export default function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await getAnnouncement(id as string);
        setAnnouncement(data);
      } catch (err) {
        setError('Pengumuman tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Memuat pengumuman...</p>;
  }

  if (error || !announcement) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Pengumuman tidak ditemukan</h2>
          <Link
            to="/announcements"
            className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke daftar pengumuman
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/announcements" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali ke daftar pengumuman
      </Link>

      <article className="bg-white rounded-lg shadow-lg p-6">
        {!!announcement.important && (
          <div className="flex items-center text-red-500 mb-4">
            <Bell className="h-6 w-6 mr-2" />
            <span>Pengumuman Penting</span>
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{announcement.title}</h1>
        <div className="flex items-center text-gray-500 mb-8">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{new Date(announcement.date).toLocaleDateString('id-ID')}</span>
        </div>
        <div className="prose prose-lg max-w-none">
          {/* Render rich text content dengan DOMPurify */}
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(announcement.content),
            }}
          />
        </div>
      </article>
    </div>
  );
}
