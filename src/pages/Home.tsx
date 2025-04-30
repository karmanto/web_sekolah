import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SD Islam Umar Bin Abdul Aziz - Pendidikan Karakter Islami</title>
        <meta name="description" content="SD Islam Umar Bin Abdul Aziz (SDIUBAAZ) adalah sekolah dasar Islam di Tembung yang fokus pada pembentukan karakter Islami, akademik unggul, dan pengembangan bakat anak." />
        <meta name="keywords" content="SD Islam Umar Bin Abdul Aziz, SDIUBAAZ, Sekolah Dasar Islam Sunnah Tembung, pendidikan karakter Islam, sekolah Islam terbaik" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="relative bg-black bg-opacity-50" aria-label="Banner Utama">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="/bg1.jpg"
              alt="Gedung SD Islam Umar Bin Abdul Aziz yang asri dan nyaman"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Selamat Datang di SD Islam Umar Bin Abdul Aziz
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              Menjadi Mitra Bermutu Orang Tua dalam Menumbuhkan Karakter Generasi Islam (Karakter Iman, Karakter Belajar, Karakter Bakat).
            </p>
            <div className="mt-8">
              <a
                href="https://wa.me/6281265159098"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 transition"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </section>

        {/* Visi Misi Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Visi & Misi</h2>
              <div className="mt-2 text-lg text-gray-600">Komitmen kami untuk pendidikan berkualitas</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Visi</h3>
                <p className="text-gray-600">
                  Menjadi Mitra Bermutu Orang Tua dalam Menumbuhkan Karakter Generasi Islam (Karakter Iman, Karakter Belajar, Karakter Bakat).
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Misi</h3>
                <ol className="text-gray-600 space-y-3 list-decimal pl-5">
                  <li>Meningkatkan keilmuan dan keterampilan guru serta orang tua, lalu bersinergi dalam menerapkannya pada pendidikan anak.</li>
                  <li>Menanamkan kecintaan anak kepada Allah, Rasulullah, dan Islam melalui keteladanan yang nyata.</li>
                  <li>Mengamati, memetakan, dan menyesuaikan metode pembelajaran dengan gaya belajar anak agar lebih efektif.</li>
                  <li>Menggali serta mengembangkan potensi dan bakat anak sesuai dengan tahap perkembangannya.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Penting Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Informasi Penting</h2>
            <img
              src="https://drive.google.com/thumbnail?authuser=0&sz=w640&id=1oTHrdjwtLEoMSuh2ESuwOHnukpPBZmHX"
              alt="Informasi Penting Thumbnail"
              className="mx-auto"
            />
          </div>
        </section>

        {/* Featured Sections */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" aria-label="Fitur Utama">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/announcements"
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
              aria-label="Menuju halaman pengumuman"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pengumuman</h2>
              <p className="text-gray-600 mb-4">
                Informasi terkini seputar kegiatan dan kebijakan sekolah.
              </p>
              <div className="flex items-center text-indigo-600">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </div>
            </Link>

            <Link
              to="/events"
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
              aria-label="Menuju halaman agenda"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agenda</h2>
              <p className="text-gray-600 mb-4">
                Jadwal kegiatan dan acara-acara penting sekolah.
              </p>
              <div className="flex items-center text-indigo-600">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </div>
            </Link>

            <Link
              to="/articles"
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
              aria-label="Menuju halaman artikel"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel</h2>
              <p className="text-gray-600 mb-4">
                Berita dan artikel terkini seputar prestasi dan kegiatan sekolah.
              </p>
              <div className="flex items-center text-indigo-600">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
