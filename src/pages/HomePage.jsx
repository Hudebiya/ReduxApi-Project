import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'

const HomePage = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((store) => store.search.activeTab)

  const links = ['photos', 'videos', 'gifs']

  return (
    <div className='min-h-screen'>
      <header className='px-10 py-6 border-b border-black/10 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>
          Media<span className='text-amber-700'>Search</span>
        </h1>

        <nav className='hidden sm:flex gap-6 text-sm font-medium'>
          {links.map((link) => (
            <button
              key={link}
              onClick={() => dispatch(setActiveTab(link))}
              className={`${
                activeTab === link
                  ? 'text-amber-700 underline underline-offset-4'
                  : 'text-stone-600 hover:text-stone-900'
              } cursor-pointer uppercase tracking-wide transition`}
            >
              {link}
            </button>
          ))}
        </nav>
      </header>

      <main className='max-w-7xl mx-auto'>
        <SearchBar />
        <Tabs />
        <ResultGrid />
      </main>
    </div>
  )
}

export default HomePage