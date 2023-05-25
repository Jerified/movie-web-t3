import axios from 'axios'
import React from 'react'
import useSWR from 'swr'
import { Carousel } from '@sefailyasoz/react-carousel'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Image from 'next/image'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

interface Movie {
  id: number,
  original_title: string
  adult: boolean,
  backdrop_path: string,
  media_type: string,
  original_language: string,
  overview: string,
  poster_path: string,
  title: string
}

const Trending = () => {
  const MOVIE_API_KEY = '79fff65d48f861f7c99acdf4d524e1f6'
  const { data, error } = useSWR(`https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_API_KEY}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const movies: Movie[] = data.results
  console.log(movies);
  

  return (    
    <div>
      <h1 className="text-3xl font-light">Trending</h1>
      <div className="carousel carousel-center rounded-box pt-4">
      {movies.map((movie: Movie) => (
        <div className="carousel-item">
            <Image src={movie.backdrop_path} width={120} height={120} alt={movie.title} />
        <h1 className="" key={movie.id}>{movie.original_title
        }</h1>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Trending