import axios from 'axios';
import React, { useContext, useMemo } from 'react';
import useSWR from 'swr';
import { Carousel } from '@sefailyasoz/react-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { GiTv } from 'react-icons/gi';
import { TbMovie } from 'react-icons/tb';
import { BsBookmark } from 'react-icons/bs';
import { bookmarkContext } from '../context/bookmarkcontext';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
 const fetcher = (url: string) => axios.get(url).then((res) => res.data);
 const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
//  console.log(MOVIE_API_KEY)
 const fetchTrendingMovies = () => {
  return useSWR(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_API_KEY}`,
    fetcher
  );
};
 const Trending = () => {
  const { handleToggle, bookmarks }: any = useContext(bookmarkContext);
  const { data, error } = fetchTrendingMovies();
   if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
   const movies = data.results;
  const image = 'https://image.tmdb.org/t/p/original';
   const { data: session } = useSession();
   const movieItems = useMemo(
    () =>
      movies.map((movie: any) => (
        <Link href={`/${movie.id}`} className="carousel-item relative overflow-hidde w-[70%] md:w-[35%] h-[25vh] md:h-[30vh] lg:h-[40vh]">
          <Image className="rounded-lg w-full" src={image + movie.backdrop_path} width={250} height={10} alt={movie.title} />
          <div className="">
            <div className="bg-black rounded-full opacity-60 w-fit p-2 absolute top-3 right-4 cursor-pointer" onClick={() => handleToggle(movie)}>
              <BsBookmark className={`stroke-1 w-[1.18rem] text-white fill-white ${bookmarks[movie.id] && 'fill-white text-white stroke-2'}`} />
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2">
                <h1 className="" key={movie.id}>
                  {movie.release_date.split('-')[0]}
                </h1>
                <p className="font-bold mb-[7px]">.</p>
                <h1 className="">{movie.media_type === 'movie' ? <TbMovie /> : <GiTv />}</h1>
                <h1 className="">{movie.media_type === 'movie' ? 'Movie' : 'Tv Series'}</h1>
              </div>
              <h1 className="">{movie.original_title}</h1>
            </div>
          </div>
        </Link>
      )),
    [movies, bookmarks, handleToggle]
  );
   return (
    <>
      <h1 className="">{session?.user.name}</h1>
      <h1 className="text-3xl font-light">Trending</h1>
      <div className="carousel carousel-center rounded-box pt-4 relative gap-5">{movieItems}</div>
    </>
  );
};
 export default Trending;