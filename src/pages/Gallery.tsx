import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Calendar } from 'lucide-react'
import { getGalleryItems } from '../lib/api'
import { GalleryItem } from '../lib/types'

const API_URL = import.meta.env.VITE_API_URL

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryItems()
        setGallery(data)
      } catch {
        setError('Gagal memuat galeri.')
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  return (
    <>
      <Helmet>
        <title>Galeri Foto - SD Islam Umar Bin Abdul Aziz</title>
        <meta
          name="description"
          content="Galeri foto kegiatan dan momen berkesan di SD Islam Umar Bin Abdul Aziz. Lihat berbagai aktivitas akademik dan non-akademik siswa kami."
        />
        <meta
          name="keywords"
          content="galeri SD Islam Umar Bin Abdul Aziz, foto kegiatan sekolah, dokumentasi sekolah, aktivitas siswa"
        />
        <link rel="canonical" href="https://cendekianusantara.sch.id/gallery" />
      </Helmet>
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Galeri</h1>
        {loading && <p className="text-center text-gray-600">Memuat galeri...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.length > 0 ? (
              gallery.map(item => {
                const firstImage = item.images[0]?.image ?? ''
                return (
                  <article key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                      <img
                        className="w-full h-64 object-cover"
                        src={typeof firstImage === 'string' ? `${API_URL}/storage/${firstImage}` : ''}
                        alt={item.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link to={`/gallery/${item.id}`} className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium" aria-label={item.title}>
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
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
                )
              })
            ) : (
              <p className="text-center text-gray-500">Tidak ada galeri saat ini.</p>
            )}
          </div>
        )}
      </main>
    </>
  )
}
