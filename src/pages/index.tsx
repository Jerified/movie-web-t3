import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: session } = useSession()
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>

      <main className="my-10">
        <nav>
          <ul>
            <li>
              <p className="font-semibold text-xl ">Movie</p>
            </li>
            
          </ul>
        </nav>
        {session?.user ?
        <button onClick={() => signOut()}>
          <p>log out {session.user.name}</p>
        </button> : 
        <button onClick={() => signIn()}>
        <p>log in</p>
      </button>}
      </main>
    </>
  );
};

export default Home;

