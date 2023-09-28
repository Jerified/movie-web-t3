import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
}

interface CreditsResponse {
  cast: Cast[];
}

const MovieDetails = ({ movieId }: { movieId: string }) => {
  const MOVIE_API_KEY = '79fff65d48f861f7c99acdf4d524e1f6'
  const { data: creditsData, error: creditsError } = useSWR<CreditsResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`,
    fetcher
  );

  if (creditsError) return <div>Failed to load casts</div>;
  if (!creditsData) return <div>Loading...</div>;

  const { cast } = creditsData;
  const remainingCastCount = Math.max(0, cast.length - 7);
  const visibleCast = cast.slice(0, 7);

  return (
    <div className='pt-6'>
      <h2 className="text-2xl font-semibold pt-6 pb-4 ">THE CAST</h2>
      <ul className='flex gap-3 flex-wrap'>
        {visibleCast.map(({ id, name, profile_path }, index) => (
          <li key={id} className='relative'>
            <img loading='lazy'
              className={`w-16 h-16 rounded-full  object-cover inline-block mr-2 ${index === visibleCast.length - 1 && 'opacity-60 brightness-50 mr-0'}`}
              src={`https://image.tmdb.org/t/p/w185/${profile_path}`}
              alt={`${name} profile`}
            />
            {/* Add the `hidden` class to all but the last visible cast member */}
            {index === visibleCast.length - 1 && remainingCastCount > 0 && (
              <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-semibold">
                +{remainingCastCount}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;