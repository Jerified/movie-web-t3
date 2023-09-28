import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'
import {BsSearch} from 'react-icons/bs'

const datas = {
  home: 'movies or TV series',
  movies: 'movies',
  tvSeries: 'TV series',
  bookmark: 'bookmarked shows'
}
const Search = () => {

  const router = useRouter()
    const [search, setSearch] = useState('')

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(!search) return
      router.push(`/search/${search}`)
    }
  return (
    <form className='relative' onSubmit={handleSubmit}>
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder={`Search for ${datas.home}`} className="input input-md max-w-lg w-full rounded-full bg-inherit  input-bordered border-whit px-10 text-lg" />
        <BsSearch className='text-xl absolute top-3 left-2 ' />
    </form>
  )
}

export default Search