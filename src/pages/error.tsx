import {useEffect} from 'react'

const Error = ({error, reset}: {error: Error;
reset: () => void}) => {
  useEffect(() => {
    console.error(error);
    
  },[error])

  return (
    <main>
        <h1>Something went wrong!</h1>
    </main>
)
}

export default Error