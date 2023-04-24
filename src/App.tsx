import { ComicItem } from './components/ComicItem';
import { useContext, useState } from 'react';
import Modal from '@mui/material/Modal';
import { AiFillCloseCircle } from 'react-icons/ai'
import { CartContext } from './context/CartContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ComicContext } from './context/ComicContext';
import './styles/globals.css'

function App() {
  document.title = "Home | Comprar quadrinhos"
  const { comics, currentModalComic, isModalLoading, setIsModalLoading, setSelectedComic } = useContext(ComicContext)
  const { addProduct } = useContext(CartContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log(currentModalComic)

  async function handleBuyComic() {
    addProduct(currentModalComic.id)
    setIsModalOpen(false)
    setIsModalLoading(false)
    setSelectedComic(0)
  }

  return (
    <main className="flex">
      <div className="flex flex-1 gap-14 justify-center flex-wrap items-center sm:mx-0 md:mx-24 lg:mx-56 my-24">
        <Modal
          open={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedComic(0) }}
        >
          <div className="absolute top-1/2 left-1/2 translate-y-center translate-x-center bg-slate-100 border-slate-300 border-2 rounded-lg p-6 shadow-2xl">
            {isModalLoading ? <p>Carregando...</p> : (
              <div className="flex flex-col items-end">
                <button onClick={() => { setIsModalOpen(false) }}>
                  <AiFillCloseCircle size={34} color={"#000000"} />
                </button>
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-6">
                    <div className="text-2xl font-bold">
                      {currentModalComic.title}
                    </div>
                    <div>
                      {currentModalComic.description === null ? "Esta edição não tem descrição" : currentModalComic.description}
                    </div>
                  </div>
                  <div>
                    <img src={`${currentModalComic.image}.${currentModalComic.thumbnailExtension}`} alt="e" />
                  </div>
                  <div className="text-3xl flex justify-center">
                    {currentModalComic.price === 0 ? "R$ 9.99" : `R$ ${currentModalComic.price}`}
                    {/* Se não houver preço na API, aplicando preço padrão de 9.99 */}
                  </div>
                  <button className="bg-red-500 rounded-md p-2 text-slate-100" onClick={() => { handleBuyComic() }}>Comprar</button>
                </div>
              </div>
            )}
          </div>
        </Modal>
        {comics.map((comic) => (
          <ComicItem key={comic.id} comicData={comic} setIsModalOpen={setIsModalOpen} />
        ))}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </main>
  )
}

export default App
