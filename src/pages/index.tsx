import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Trending from "~/components/Trending";
import Allmovies from "~/components/Allmovies";
import { Suspense } from "react";
import useSWR from 'swr'

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

const Home: NextPage = () => {
const data = useSession()
console.log(data)

  return (
    <>

      <main className="my-4">
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Trending />
        <Allmovies />
        {/* </Suspense> */}
      </main>
    </>
  );
};

export default Home;

