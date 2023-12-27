import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import MoviesCard from '../components/moviesCard'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

interface Movie {
  id: number
  imdb_id: string
  original_title: string
  adult: boolean
  backdrop_path: string
  media_type: string
  original_language: string
  overview: string
  poster_path: string
  title: string
  release_date: string
  vote_average: number
  vote_count: number
  runtime: number
  genres: {id: number; name: string}[]
  production_countries: { name: string}[]
  spoken_languages: {english_name: string}[]
}

const movies = () => {
  const router = useRouter()
  const { movieId } = router.query
  const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY as string;
  const { data, error } = useSWR<Movie | any>(
    `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const movies = data.results

  console.log(data)
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

  const runtime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const formattedRuntime = `${hours}h ${minutes}m`;

    return formattedRuntime
  }
    
  return (
    <div>
        <MoviesCard movies={movies} />
    </div>
  )
}

export default movies