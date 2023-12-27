import React, { useContext } from 'react'
import useSWR from 'swr'
import { Carousel } from '@sefailyasoz/react-carousel'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Image from 'next/image'
import { GiTv } from 'react-icons/gi'
import { TbMovie } from 'react-icons/tb'
import { BsBookmark } from 'react-icons/bs'
import axios from 'axios'
import { bookmarkContext } from '../context/bookmarkcontext';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import Link from 'next/link'

interface Movie {
    id: number,
    original_title: string
    adult: boolean,
    backdrop_path: string,
    media_type: string,
    original_language: string,
    overview: string,
    poster_path: string,
    title: string,
    release_date: string
  }

const fetcher = (url: string) => axios.get(url).then(res => res.data)
const Allmovies = () => {
    const MOVIE_API_KEY = '79fff65d48f861f7c99acdf4d524e1f6'
  const { data, error } = useSWR(`https://api.themoviedb.org/3/trending/all/week?api_key=${MOVIE_API_KEY}`, fetcher)
  const { toggleBookmark, isBookmarked, bookmarks } = useContext(bookmarkContext);
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const movies: Movie[] = data.results
  console.log(movies);
  const image = "https://image.tmdb.org/t/p/original"
  return (
    <div className='pt-4'>
        <h1 className="text-3xl font-semibold pb-4">Recommended for you</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {movies.map((movie: Movie) => (
        <Link href={`/${movie.id}`} className=" w-full relative">
            <Image className=' rounded-lg w-full h-[30vw]' src={image + movie.poster_path} width={250} height={0} alt={movie.title} />
            <div className="">
            <div className="bg-black rounded-full opacity-60 w-fit p-2 absolute top-3 right-4 cursor-pointer" onClick={() => toggleBookmark(movie)}>
              {isBookmarked(movie) ? (
                <IoBookmark className="stroke-1 w-[1.18rem] text-white fill-white" />
              ) : (
                <IoBookmarkOutline className="stroke-1 w-[1.18rem]" />
              )}
            </div>
              <div className="">
                <div className="flex items-center gap-2">
                  <h1 className="" key={movie.id}>{movie.release_date?.split("-")[0]}</h1>
                  <p className="font-bold mb-[7px]">.</p>
                  <h1 className="">{movie.media_type === 'movie' ? 
                  (<TbMovie />) : 
                  <GiTv />
                  }
                  </h1>
                  <h1 className="">{movie.media_type === 'movie' ? 
                  "Movie" : 
                  "Tv Series"
                  }
                  </h1>
                </div>
                <h1 className="" >{movie.original_title}</h1>
              </div>
            </div>
        </Link>
      ))}
        </div>
    </div>
  )
}

export default Allmovies