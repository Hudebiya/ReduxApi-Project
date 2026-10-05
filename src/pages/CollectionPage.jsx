import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from '../components/ResultCard'
import { clearCollection } from '../redux/features/collectionSlice'

const CollectionPage = () => {
  const dispatch = useDispatch()
  const items = useSelector((store) => store.collection.items)

  const clearHandler = () => {
    dispatch(clearCollection())
    localStorage.removeItem('collection')
    toast.error('Collection cleared')
  }

  return (
    <div className='min-h-screen'>
      <header className='px-10 py-6 border-b border-black/10 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>
          My <span className='text-amber-700'>Collection</span>
          <span className='ml-3 text-sm font-medium text-stone-600'>
            ({items.length})
          </span>
        </h1>

        <div className='flex gap-3'>
          {items.length > 0 && (
            <button
              onClick={clearHandler}
              className='bg-red-600 hover:bg-red-500 text-white active:scale-95 transition cursor-pointer text-sm font-semibold rounded-full px-5 py-2'
            >
              Clear All
            </button>
          )}
          <Link
            to='/'
            className='bg-stone-900 hover:bg-stone-800 text-amber-300 active:scale-95 transition text-sm font-semibold rounded-full px-5 py-2'
          >
            ← Back to Search
          </Link>
        </div>
      </header>

      <main className='max-w-7xl mx-auto'>
        {items.length == 0 ? (
          <p className='px-10 py-20 text-center text-stone-600'>
            Abhi kuch save nahi kiya. Search karke kisi card par Save dabayein.
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10'>
            {items.map((item) => (
              <ResultCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default CollectionPage