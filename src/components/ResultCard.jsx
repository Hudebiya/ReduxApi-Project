import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify' // ✅ 1. Import ko yahan top par shift kar diya
import {
  addToCollection,
  removeFromCollection,
} from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {
  const dispatch = useDispatch()
  const saved = useSelector((store) =>
    store.collection.items.some((i) => i.id === item.id)
  )

  const saveHandler = () => {
    const oldData = JSON.parse(localStorage.getItem('collection')) || []
    let newData

    // ✅ 2. Yahan se 'import' wali line hata di gayi hai

    if (saved) {
      newData = oldData.filter((i) => i.id !== item.id)
      dispatch(removeFromCollection(item.id))
      toast.info('Removed from collection')
    } else {
      newData = [...oldData, item]
      dispatch(addToCollection(item))
      toast.success('Saved to collection')
    }

    localStorage.setItem('collection', JSON.stringify(newData))
  }

  return (
    <div className='group bg-white border border-black/5 rounded-2xl overflow-hidden shadow-md hover:border-amber-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300'>

      <div className='relative h-56 overflow-hidden bg-stone-200'>
        {item.type == 'video' ? (
          <video
            className='w-full h-full object-cover'
            src={item.src}
            poster={item.thumbnail}
            controls
          />
        ) : (
          <img
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
            src={item.thumbnail}
            alt={item.title}
            loading='lazy'
          />
        )}

        <span className='absolute top-3 left-3 bg-black/70 backdrop-blur text-amber-300 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full'>
          {item.type}
        </span>
      </div>

      <div className='p-4'>
        <h3 className='font-semibold capitalize truncate text-stone-800'>{item.title}</h3>

        <p className='text-stone-500 text-sm mt-1 truncate'>
          By{' '}
          <a
            className='text-amber-700 font-medium hover:underline'
            href={item.authorUrl}
            target='_blank'
            rel='noreferrer'
          >
            {item.author}
          </a>
        </p>

        <div className='flex gap-2 mt-4'>
          <a
            className='flex-1 text-center bg-stone-200 hover:bg-stone-300 text-stone-800 active:scale-95 transition px-3 py-2 rounded-full text-xs font-semibold'
            href={item.url}
            target='_blank'
            rel='noreferrer'
          >
            {item.source}
          </a>

          <button
            onClick={saveHandler}
            className={`flex-1 active:scale-95 transition cursor-pointer px-3 py-2 rounded-full text-xs font-semibold ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-amber-300'
            }`}
          >
            {saved ? 'Saved ✓' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultCard