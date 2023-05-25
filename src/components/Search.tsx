import React from 'react'
import {BsSearch} from 'react-icons/bs'

const Search = () => {
    const data = {
        home: 'movies or TV series',
        movies: 'movies',
        tvSeries: 'TV series',
        bookmark: 'bookmarked shows'
    }
  return (
    <div className='relative'>
        <input type="text" placeholder={`Search for ${data.home}`} className="input input-md max-w-lg w-full rounded-full bg-inherit  input-bordered border-whit px-10 text-lg" />
        <BsSearch className='text-xl absolute top-3 left-2 ' />
    </div>
  )
}

export default Search