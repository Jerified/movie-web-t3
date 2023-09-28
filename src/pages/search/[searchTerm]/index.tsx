import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'


const fetcher = (url: string) => axios.get(url).then(res => res.data)
const page = () => {
  const router = useRouter()
const {searchTerm} = router.query 
console.log(searchTerm)
  const MOVIE_API_KEY = '79fff65d48f861f7c99acdf4d524e1f6'
const { data, error } = useSWR(`https://api.themoviedb.org/3/search/movie?iapi_key=${MOVIE_API_KEY}&query=${searchTerm}&language=en-US&nclude_adult=false`, fetcher)
console.log(data);


// const movies: any = data.results
  return (
    <div>
      {/* {movies  && movies.length === 0 && (
        <h1 className="text-center">No results found</h1>
      )} */}

      {}
    </div>
  )
}

export default page