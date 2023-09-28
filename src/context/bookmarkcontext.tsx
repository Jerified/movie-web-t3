import React, { ReactNode, createContext, useState } from "react";
import { api } from '~/utils/api'



interface BookmarksState {
  [key: string]: boolean;
}

interface BookmarkContextType {
  handleToggle: (id: string, add: any) => void;
  bookmarks: BookmarksState;
}

const bookmarkContext = createContext<BookmarkContextType | null>(null);

const BookmarksProvider = ({ children }: {children: ReactNode}) => {
  const addBookmark = api.addtoBookmark.add.useMutation({

  })

  const [bookmarks, setBookmarks] = useState<BookmarksState>({});

  const handleToggle = (movie: any) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [movie.id]: !prevBookmarks[movie.id]
    }));
    addBookmark.mutate({
      // imdb_id: movie.imdb_id,
      // original_title: movie.original_title,
      movieId: movie.id,
      // imdb_id: "",
      // adult: false,
      // backdrop_path: "",
      // media_type: movie.media_type,
      // original_language: "",
      // overview: "",
      // poster_path: "",
      // title: "",
      // release_date: "",
      // vote_average: 0,
      // vote_count: 0,
      // runtime: 0
    })
  };

  return (
    <bookmarkContext.Provider value={{ handleToggle, bookmarks }}>
      {children}
    </bookmarkContext.Provider>
  );
};

export { bookmarkContext, BookmarksProvider };