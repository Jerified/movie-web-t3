import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { BsBookmark } from 'react-icons/bs'
import { GiTv } from 'react-icons/gi'
import { TbMovie } from 'react-icons/tb'
import { bookmarkContext } from '../context/bookmarkcontext';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

const MoviesCard = ({ movies }: any) => {
    const { toggleBookmark, isBookmarked, bookmarks } = useContext(bookmarkContext);
    // const movies = data.results
    // console.log(data)
    // {console.log(handleToggle(movies[0].id))}
    console.log(bookmarks) 
    const image = "https://image.tmdb.org/t/p/original"
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4'>
            {movies.map((movie: any) => (
                <Link href={`/${movie.id}`} className=" w-full relative">
                    <Image className=' rounded-lg w-full h-[30vw]' src={image + movie.poster_path} width={250} height={0} alt={movie.title} quality={100} />
                    <div className="">
                        <div className="bg-black rounded-full opacity-60 w-fit p-2 absolute top-3 right-4 cursor-pointer" onClick={() => {
                            toggleBookmark(movie)
                        } }>

                            {isBookmarked(movie) ? (
                                <IoBookmark className="stroke-1 w-[1.18rem] text-white fill-white" />
                            ) : (
                                <IoBookmarkOutline className="stroke-1 w-[1.18rem]" />
                            )}
                            {/* { console.log(bookmarks)} */}
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
    )
}

export default MoviesCard