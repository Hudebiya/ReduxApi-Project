import React from 'react'

const ResultCard = ({ item }) => {
  return (
    <div className='w-[23vw] h-80 bg-white rounded-2xl overflow-hidden p-3'>

      {item.type == 'video' ? (
        <video
          className='w-full h-52 object-cover rounded-xl'
          src={item.src}
          poster={item.thumbnail}
          controls
        />
      ) : (
        <img
          className='w-full h-52 object-cover rounded-xl'
          src={item.thumbnail}
          alt={item.title}
        />
      )}

      <p className='mt-2 truncate'>{item.title}</p>

      <p className='text-sm'>
        By{' '}
        <a className='underline' href={item.authorUrl} target='_blank'>
          {item.author}
        </a>{' '}
        on {item.source}
      </p>

    </div>
  )
}

export default ResultCard