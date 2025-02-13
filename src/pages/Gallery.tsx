import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import content from '../data/content.json';
import { GalleryItem } from '../lib/types';
import { Calendar } from 'lucide-react';

export default function Gallery() {
  const gallery = content.gallery as GalleryItem[];

  return (
    <>
      <Helmet>
        <title>Galeri Foto - SMA Cendekia Nusantara</title>
        <meta name="description" content="Galeri foto kegiatan dan momen berkesan di SMA Cendekia Nusantara. Lihat berbagai aktivitas akademik dan non-akademik siswa kami." />
        <meta name="keywords" content="galeri SMA Cendekia Nusantara, foto kegiatan sekolah, dokumentasi sekolah, aktivitas siswa" />
        <link rel="canonical" href="https://cendekianusantara.sch.id/gallery" />
      </Helmet>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Galeri</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={`${item.title} - SMA Cendekia Nusantara`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={`/gallery/${item.id}`}
                    className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium"
                    aria-label={`Lihat detail foto ${item.title}`}
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                  {new Date(item.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}