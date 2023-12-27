import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from '~/utils/api'


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

interface BookmarksState {
  [key: string]: boolean;
}

interface BookmarkContextType {
  toggleBookmark: (movie: Movie) => void;
  bookmarks: Movie[];
  isBookmarked: (movie: Movie) => boolean

}

const bookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false
});

const BookmarksProvider = ({ children }: {children: ReactNode}) => {
  // const addBookmark = api.addtoBookmark.add.useMutation({

  // })

  const [bookmarks, setBookmarks] = useState<Movie[]>([]);

  // const handleToggle = (id: string) => {
  //   return (event: React.MouseEvent<HTMLDivElement>) => {
  //     event.stopPropagation();
  //     setBookmarks((prevBookmarks) => {
  //       const newBookmarks = {
  //         ...prevBookmarks,
  //         [id]: !prevBookmarks[id]
  //       };
  //       return newBookmarks;
  //     });
  //   };
  // };

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks")
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks))
    }
  }, []);

  useEffect(() => {
     localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }, []);

  const toggleBookmark = (movie: Movie) => {
    const index = bookmarks.findIndex((m) => m.id === movie.id)
    if (index !== -1) {
      setBookmarks((prev) => prev.filter((m) => m.id !== movie.id))
    } else {
      setBookmarks((prev) => [...prev, movie])
    }
  }

  const isBookmarked = (movie: Movie) => {
    return bookmarks.some((m) => m.id === movie.id)
  }
  
  return (
    <bookmarkContext.Provider value={{ toggleBookmark, bookmarks, isBookmarked }}>
      {children}
    </bookmarkContext.Provider>
  );
};

export { bookmarkContext, BookmarksProvider };