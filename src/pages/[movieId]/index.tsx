import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import MovieCast from '~/components/Cast'
import RatingStars from '~/components/RatingStars'

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

const MovieDetail = () => {
  const router = useRouter()
  const { movieId } = router.query
  const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY as string;
  const { data, error } = useSWR<Movie>(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log(data)
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

  const runtime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const formattedRuntime = `${hours}h ${minutes}m`;

    return formattedRuntime
  }
  return (
    <div className="flex flex-col md:gap-4 lg:gap-10 md:flex-row pt-6 md:my-auto ">
      <div className="md:w-[40%] w-full">
        <Image
          className="w-[70%]  md:w-full mx-auto md:m-0 rounded-md"
          src={imageBaseUrl + data.poster_path}
          width={200}
          height={200}
          alt={data.title}
        />
      </div>
      <div className="md:w-[60%] pt-5 md:p-0">
        <h1 className="text-3xl font-bold uppercase flex justify-center">{data.original_title}</h1>
        <div className="flex pt-3 whitespace-nowrap flex-wrap">
          <p>{data.production_countries.map((country) => country.name).join(', ')} /</p>
          <p className='indent-2'>{data.spoken_languages
            .map((language) => language.english_name)
            .join(', ')} /</p>
        <p className='indent-2'>{new Date(data.release_date).getFullYear()} /</p>
                  {/* <p>{data.original_language}</p> */}
                  <p className='indent-2'>{runtime(data.runtime)}</p>
        </div>
        {data.vote_average ? (
          <>
            <div className="flex items-center my-2">
              <RatingStars rating={data.vote_average} />
              <span className="ml-2 text-lg text-yellow-500 font-bold">{data.vote_average.toFixed(1)}</span>
              {/* <span className="ml-2 text-xl">
                ({data.vote_count.toLocaleString()} votes)
              </span> */}
            </div>
            
          </>
        ) : (
          <p className='py-3'>No rating available.</p>
        )}
        <div className="flex gap-3 flex-wrap">
        {data.genres.map((genre) => (
          <span key={genre.id} className='border-2 px-2 rounded uppercase'>{`${genre.name} `}</span>
        ))}
        </div>
        <MovieCast movieId={data.imdb_id} />
        <div className="pt-10 pb-6">
          <p className="text-2xl font-semibold">SYNOPSIS</p>
          <p className="text-slate-400">
            {data.overview}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail