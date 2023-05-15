import React from 'react'
import { useRouter } from 'next/router'
import {BiHome} from 'react-icons/bi'
import {BsBookmark} from 'react-icons/bs'
import {TbLogout, TbMovie} from 'react-icons/tb'
import { signIn, signOut, useSession } from "next-auth/react";
import { NextPage } from 'next';


const SideBar: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }
  return (
    <div className='pr-5 min-h-screen flex flex-col justify-evenly'>
      <div className="">
      <p className='font-bold text-xl'>JERRIFIED</p>
      <nav className='pt-8'>
        <ul className="flex gap-2 items-center py-3 cursor-pointer group relative" onClick={() => handleNavigation('/')}>
        <BiHome className='text-xl'/> 
          <h3>Home</h3>
          {/* <span className='absolute bottom-0 left-0 w-fit block after:content-[] origin-right after:duration-200  h-1 bg-blue-800 rounded-l-lg group-hover:w-1/2 group-hover:transition-all'></span> */}
          <span className='absolute bottom-0 left-1/2 w-0 h-1 bg-blue-800  group-hover:w-1/2 group-hover:transition-all'></span>
          <span className='absolute bottom-0 right-1/2 w-0 h-1 bg-blue-800 group-hover:w-1/2 group-hover:transition-all transition-duration-100'></span>
        </ul>
        <ul className="flex gap-2 items-center py-3">
        <TbMovie className='text-xl'/> 
          <h3>Movie</h3>
        </ul>
        <ul className="flex gap-2 items-center py-3">
        <BiHome className='text-xl'/> 
          <h3>Tv Series</h3>
        </ul>
        <ul className="flex gap-2 items-center py-3 cursor-pointer">
        <BsBookmark className='text-xl'/> 
          <h3>Bookmarked</h3>
        </ul>
        
      </nav>
      </div>
      <div className="flex gap-2 items-center">
      {session?.user ?
        <button onClick={() => signOut()}>
      <div className="">
      <TbLogout className='text-3xl  ' />
      <p className="">Log Out</p>
      </div>
        </button> : 
        <button onClick={() => handleNavigation('/signin')}>
        <p>log in</p>
      </button>}
      {/* <div className="">
          <TbLogout className='text-3xl  ' />
          <p className="">Log Out</p>
          </div> */}
        </div>
    </div>
  )
}

export default SideBar