import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { getMarvelComics, getSpecificComic } from "../services/api";

export type ComicType = {
  amount: number,
  id: number,
  thumbnail: { path: string; extension: string; },
  thumbnailExtension: string,
  title: string,
  subTotal: string,
  formattedPrice: string,
  price?: number
}

export type CurrentModalComic = {
  id: string,
  title: string,
  image: string,
  thumbnailExtension: string,
  description: string,
  price: number
}

interface ComicContextProps {
  comics: ComicType[]
  setComics: Dispatch<SetStateAction<ComicType[]>>
  selectedComic: number,
  setSelectedComic: Dispatch<SetStateAction<number>>
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  isModalLoading: boolean,
  setIsModalLoading: Dispatch<SetStateAction<boolean>>,
  currentModalComic: any,
  setCurrentModalComic: Dispatch<SetStateAction<object>>,
}

interface ComicContextProviderProps {
  children: ReactNode
}

export const ComicContext = createContext({} as ComicContextProps)

export function ComicContextProvider({ children }: ComicContextProviderProps) {
  const [comics, setComics] = useState<ComicType[]>([])
  const [selectedComic, setSelectedComic] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalLoading, setIsModalLoading] = useState(true)
  const [currentModalComic, setCurrentModalComic] = useState({})

  useEffect(() => {
    async function fetchData() {
      const comicsData = await getMarvelComics()
      setComics([...comicsData.map((comic: ComicType) => (
        {
          id: comic.id,
          title: comic.title,
          thumbnail: comic.thumbnail.path,
          thumbnailExtension: comic.thumbnail.extension
        }
      ))]);
      setIsLoading(false)
    }
    fetchData()
  }, [])


  useEffect(() => {
    async function fetchSingleComicData() {
      setIsLoading(true)

      const specificComicData = await getSpecificComic(Number(selectedComic))
      setCurrentModalComic(
        {
          id: specificComicData?.id,
          title: specificComicData?.title,
          image: specificComicData?.thumbnail?.path,
          thumbnailExtension: specificComicData?.thumbnail?.extension,
          description: specificComicData?.description,
          price: specificComicData?.prices[0]?.price
        });
      setIsLoading(false)
      setIsModalLoading(false)
    }
    // setIsModalLoading(false)
    fetchSingleComicData()
  }, [selectedComic])



  return (
    <ComicContext.Provider value={{ comics, setComics, selectedComic, setSelectedComic, isLoading, setIsLoading, currentModalComic, setCurrentModalComic, isModalLoading, setIsModalLoading }}>
      {children}
    </ComicContext.Provider>
  )
}