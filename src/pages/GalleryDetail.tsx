import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, ArrowLeft } from 'lucide-react'
import { getGalleryItem } from '../lib/api'
import { GalleryItem } from '../lib/types'

const API_URL = import.meta.env.VITE_API_URL

export default function GalleryDetail() {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<GalleryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError('Foto tidak ditemukan.')
        setLoading(false)
        return
      }
      try {
        const data = await getGalleryItem(id)
        setItem(data)
      } catch {
        setError('Foto tidak ditemukan.')
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  if (loading) {
    return <p className="text-center text-gray-600">Memuat foto...</p>
  }

  if (error || !item) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Foto tidak ditemukan</h2>
          <Link to="/gallery" className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke galeri
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/gallery" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali ke galeri
      </Link>
      <article>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>
        <div className="flex items-center text-gray-500 mb-8">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {item.images.map(img => (
            <div key={img.id} className="flex flex-col">
              <img
                src={`${API_URL}/storage/${img.image}`}
                alt={item.title}
                className="w-full object-cover rounded"
              />
              <p className="mt-2 text-gray-700">{img.description}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
