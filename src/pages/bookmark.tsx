import React, { useContext } from 'react'
import { bookmarkContext } from '../context/bookmarkcontext';
import MoviesCard from '../components/moviesCard';



const bookmark = () => {
  const { toggleBookmark, isBookmarked, bookmarks } = useContext(bookmarkContext);
  console.log(bookmarks);

  

  const movies = bookmarks
  return (
    <div>
      {bookmarks ? <MoviesCard movies={movies}  /> : <p className='text-3xl text-white'>No bookmarks</p>}
    </div>
  )
}

export default bookmark