import React from 'react';
import { Helmet } from 'react-helmet-async';
import content from '../data/content.json';
import { Announcement } from '../lib/types';
import { Bell, Calendar } from 'lucide-react';

export default function Announcements() {
  const announcements = content.announcements as Announcement[];

  return (
    <>
      <Helmet>
        <title>Pengumuman - SMA Cendekia Nusantara</title>
        <meta name="description" content="Pengumuman dan informasi penting dari SMA Cendekia Nusantara. Dapatkan update terbaru tentang kebijakan dan kegiatan sekolah." />
        <meta name="keywords" content="pengumuman SMA Cendekia Nusantara, informasi sekolah, kebijakan sekolah, berita penting" />
        <link rel="canonical" href="https://cendekianusantara.sch.id/announcements" />
      </Helmet>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pengumuman</h1>
        <div className="space-y-6">
          {announcements.map((announcement) => (
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
                      day: 'numeric'
                    })}
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}