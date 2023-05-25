import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Trending from "~/components/Trending";

const Home: NextPage = () => {
  // const  MOVIE_API_KEY = '79fff65d48f861f7c99acdf4d524e1f6'
  // const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_API_KEY}`)
  // const json = await res.json()
  // console.log(json);
  

  // const handleGoogle = () => {
  //   signIn('goggle')
  // }
  
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>

      <main className="my-4">
        <Trending />
      </main>
    </>
  );
};

export default Home;

