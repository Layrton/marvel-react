import { useContext } from 'react'
import { BsFillCartFill } from 'react-icons/bs'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

export function Header() {
  const { cart } = useContext(CartContext)

  return (
    <header className="flex sticky z-50 top-0 h-40 items-center justify-between align-middle p-6 bg-[url('/red-bg.jpg')]">
      <div >
        <Link to="/">
          <img src="/marvel-logo.png" alt="Logo do website" className="w-44" />
        </Link>
      </div>
      <Link to="/cart">
        <nav className="flex align-middle items-center justify-center bg-white rounded-xl cursor-pointer p-3 h-14 gap-4">
          <div className="text-xl">{cart.length}</div>
          <BsFillCartFill color='red' size={30} />
        </nav>
      </Link>
    </header>
  )
}