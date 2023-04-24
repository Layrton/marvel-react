import { useContext } from "react";
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from 'react-icons/md'
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../services/format";

type ProductType = {
  amount: number,
  id: number,
  thumbnail: { path: string; extension: string; },
  thumbnailExtension: string,
  title: string,
  subTotal: string,
  formattedPrice: string
}

export function CheckoutCart() {
  const { cart, removeProduct, updateProductAmount } = useContext(CartContext)

  const formattedCart = cart.map(product => ({
    ...product, formattedPrice: formatPrice(Number(product.price)), subTotal: formatPrice(Number(product.price) * Number(product.amount))
  }))

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        sumTotal += Number(product.price) * Number(product.amount)

        return sumTotal
      }, 0)
    )

  function handleProductIncrement(product: ProductType) {
    const incrementArguments = {
      productId: product.id,
      amount: product.amount + 1
    }
    updateProductAmount(incrementArguments)
  }

  function handleProductDecrement(product: ProductType) {
    const decrementArguments = {
      productId: product.id,
      amount: product.amount - 1
    }
    updateProductAmount(decrementArguments)
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  return (
    <div>
      <div>Resumo dos produtos:</div>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {formattedCart.map(product => (
            <tr key={product.id} className="bg-slate-100 grid grid-cols-2 align-middle items-center justify-center rounded-lg my-3 p-4 w-96 gap-3">
              <td className="flex items-center justify-center">
                <img src={`${product.thumbnail}.${product.thumbnailExtension}`} alt={product.title} />
              </td>
              <td>
                <div className="text-xl">{product.title}</div>
                <div>{product.formattedPrice}</div>
              </td>
              <td className="flex items-center justify-center">
                <div className="flex items-center justify-center gap-3">
                  <button className="disabled:opacity-40" type="button" disabled={product.amount <= 1} onClick={() => handleProductDecrement(product)}>
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input type="text" readOnly value={product.amount} className="w-6 text-center rounded-md" />
                  <button type="button" onClick={() => handleProductIncrement(product)}>
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td className="flex items-center justify-between gap-5">
                <strong>{product.subTotal}</strong>
                <button type="button" onClick={() => handleRemoveProduct(product.id)}>
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="flex items-center justify-center text-2xl">
        <span className="font-bold ">Total da compra: {total}</span>
      </footer>
    </div>
  )

}