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
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newDescs, setNewDescs] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return
    getGalleryItem(id).then(data => {
      setGalleryItem(data)
      setTitle(data.title)
      setDate(data.date)
    })
  }, [id])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isSubmitting])

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files ? Array.from(e.target.files) : []
    setNewFiles(chosen)
    setNewDescs(chosen.map(() => ''))
  }

  const handleDescChange = (idx: number, value: string) => {
    const arr = [...newDescs]
    arr[idx] = value
    setNewDescs(arr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setIsSubmitting(true)
    try {
      await updateGalleryItem(id, {
        title,
        date,
        images: newFiles.length ? newFiles : undefined,
        descriptions: newDescs.length ? newDescs : undefined
      })
      navigate('/admin/gallery')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!galleryItem) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Edit Galeri</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            onChange={handleFilesChange}
            disabled={isSubmitting}
            className="p-2 mt-1 block w-full"
          />
        </div>
        {newFiles.map((file, idx) => (
          <div key={idx}>
            <p className="text-sm font-medium">{file.name}</p>
            <input
              type="text"
              placeholder="Deskripsi singkat"
              value={newDescs[idx]}
              onChange={e => handleDescChange(idx, e.target.value)}
              disabled={isSubmitting}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        ))}
        {!newFiles.length && galleryItem.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {galleryItem.images.map(img => (
              <div key={img.id} className="flex flex-col">
                <img src={`${API_URL}/storage/${img.image}`} alt={galleryItem.title} className="h-20 w-20 rounded object-cover" />
                <p className="text-sm text-gray-700">{img.description}</p>
              </div>
            ))}
          </div>
        )}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}
