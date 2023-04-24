import { useContext } from 'react'
import { ComicContext, ComicType } from '../context/ComicContext'
import { formatText } from '../services/formatText'

type ComicDataProps = {
  comicData: ComicType
  setIsModalOpen: (props: boolean) => void
}

export function ComicItem({ comicData, setIsModalOpen }: ComicDataProps) {
  const { setSelectedComic, setIsModalLoading } = useContext(ComicContext)
  function handleFetchData() {
    setIsModalOpen(true)
    setSelectedComic(comicData.id)
    setIsModalLoading(true)
  }

  return (
    <div onClick={() => { handleFetchData() }} className=" bg-red-400 w-48 h-80 items-center gap-3 justify-center flex flex-col rounded-xl p-3 cursor-pointer">
      <img src={`${comicData.thumbnail}.${comicData.thumbnailExtension}`} alt={comicData.title} className=" w-auto h-52" />
      <h1>{formatText(comicData.title, 30, true)}</h1>
    </div>
  )
}