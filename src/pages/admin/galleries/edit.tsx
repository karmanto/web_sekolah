import { useParams, useNavigate } from 'react-router-dom'
import { getGalleryItem, updateGalleryItem } from '../../../lib/api'
import { GalleryItem } from '../../../lib/types'
import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function EditGallery() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [images, setImages] = useState<File[]>([])

  useEffect(() => {
    if (!id) return
    getGalleryItem(id).then(data => {
      setGalleryItem(data)
      setTitle(data.title)
      setDate(data.date)
    })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    await updateGalleryItem(id, { title, date, images: images.length ? images : undefined })
    navigate('/admin/gallery')
  }

  if (!galleryItem) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Edit Foto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gambar Baru</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={e => {
              if (e.target.files) {
                setImages(Array.from(e.target.files))
              }
            }}
            className="p-2 mt-1 block w-full"
          />
        </div>
        {galleryItem.images.length > 0 && !images.length && (
          <div className="grid grid-cols-3 gap-2">
            {galleryItem.images.map(img => (
              <img
                key={img.id}
                src={`${API_URL}/storage/${img.image}`}
                alt={galleryItem.title}
                className="h-20 w-20 rounded object-cover"
              />
            ))}
          </div>
        )}
        <div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  )
}
