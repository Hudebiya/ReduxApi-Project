import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SearchBar = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const count = useSelector((store) => store.collection.items.length)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setQuery(text))
    setText('')
  }

    return (
  <form onSubmit={submitHandler} className='flex gap-3 px-10 pt-10'>
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      required
      type='text'
      placeholder='Search photos, videos, GIFs...'
      className='flex-1 bg-white border border-stone-300 focus:border-amber-600 text-lg rounded-full px-6 py-3 outline-none transition placeholder:text-stone-400'
    />
    <button className='bg-stone-900 hover:bg-stone-800 text-amber-300 active:scale-95 transition cursor-pointer font-semibold rounded-full px-8'>
      Search
    </button>
    
    <Link
      to='/collection'
      className='flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black active:scale-95 transition font-semibold rounded-full px-6'
    >
      Collection
      <span className='bg-stone-900 text-amber-300 text-xs rounded-full px-2 py-0.5'>
        {count}
      </span>
    </Link>
    
  </form>
)
}

export default SearchBar