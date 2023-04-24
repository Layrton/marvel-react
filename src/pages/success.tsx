import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export default function Success() {
  document.title = "Sucesso | Compra finalizada"
  const { deliveryAddress } = useContext(CartContext)
  console.log(deliveryAddress)

  return (
    <div className="flex align-middle justify-center content-center h-screen gap-16">
      <div className="flex flex-col align-middle justify-center">
        <h1 className="font-bold text-6xl">Sucesso na compra</h1>
        <p className="text-2xl">Os produtos serão entregues no endereço informado: </p>
      </div>
      <div className="flex flex-col align-middle justify-center">
        {
          deliveryAddress && (
            <ul>
              <li className="text-xl">{deliveryAddress[0]?.value}</li>
              <li className="text-xl">{deliveryAddress[1]?.value}</li>
              <li className="text-xl">{deliveryAddress[2]?.value}</li>
              <li className="text-xl">{deliveryAddress[3]?.value}</li>
              <li className="text-xl">{deliveryAddress[4]?.value}</li>
            </ul>
          )
        }
      </div>
    </div>
  )
}