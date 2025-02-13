import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import content from '../data/content.json';
import { Event } from '../lib/types';
import { Calendar, MapPin } from 'lucide-react';

export default function Events() {
  const events = content.events as Event[];

  return (
    <>
      <Helmet>
        <title>Agenda Kegiatan - SMA Cendekia Nusantara</title>
        <meta name="description" content="Jadwal kegiatan dan acara-acara penting di SMA Cendekia Nusantara. Tetap update dengan berbagai kegiatan akademik dan non-akademik sekolah kami." />
        <meta name="keywords" content="agenda SMA Cendekia Nusantara, kegiatan sekolah, acara sekolah, kalender akademik" />
        <link rel="canonical" href="https://cendekianusantara.sch.id/events" />
      </Helmet>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Agenda</h1>
        <div className="space-y-6">
          {events.map((event) => (
            <article key={event.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h2>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                    {new Date(event.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                    {event.location}
                  </div>
                  <p className="text-gray-600 line-clamp-2">{event.description}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <Link
                    to={`/events/${event.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors inline-block"
                    aria-label={`Lihat detail acara ${event.title}`}
                  >
                    Detail Acara
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