import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import content from '../data/content.json';
import { Article } from '../lib/types';
import { Calendar } from 'lucide-react';

export default function Articles() {
  const articles = content.articles as Article[];

  return (
    <>
      <Helmet>
        <title>Artikel - SMA Cendekia Nusantara</title>
        <meta name="description" content="Berita dan artikel terkini seputar prestasi dan kegiatan SMA Cendekia Nusantara. Ikuti perkembangan dan pencapaian terbaru siswa dan sekolah kami." />
        <meta name="keywords" content="artikel SMA Cendekia Nusantara, berita sekolah, prestasi siswa, kegiatan sekolah, pendidikan berkualitas" />
        <link rel="canonical" href="https://cendekianusantara.sch.id/articles" />
      </Helmet>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Artikel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={article.image}
                alt={`${article.title} - SMA Cendekia Nusantara`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                  {new Date(article.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{article.content}</p>
                <div className="mt-4">
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                    aria-label={`Baca selengkapnya tentang ${article.title}`}
                  >
                    Baca selengkapnya
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}