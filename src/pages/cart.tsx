import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from "react";
import Places from '../components/Places';
import { CartContext } from '../context/CartContext';
import { CheckoutCart } from '../components/CheckoutCart';
import { useNavigate } from 'react-router-dom';

const addressSchema = z.object({
  name: z.string().min(1),
  street: z.string().min(1),
  neighbourhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1)
})

export default function Cart() {
  const navigate = useNavigate()
  const { deliveryAddress, clearCart, cart } = useContext<any>(CartContext)
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(addressSchema),
  })

  function handlePurchaseSubmit() {
    navigate('/success')
    clearCart()
  }

  useEffect(() => {
    setValue('street', deliveryAddress[0]?.value)
    setValue('neighbourhood', deliveryAddress[1]?.value)
    setValue('city', deliveryAddress[2]?.value)
    setValue('state', deliveryAddress[3]?.value)
    setValue('country', deliveryAddress[4]?.value)
  }, [deliveryAddress, setValue])

  return (
    <div className="grid grid-cols-2 mx-32 my-32">
      <div className="flex align-middle items-center h-full justify-center">
        <CheckoutCart />
      </div>
      <div className="flex flex-col align-middle items-center h-full justify-start">
        <Places />
        <div className="flex flex-col gap-3 w-full mx-48 ">
          <input className="p-3 rounded-md mx-9 outline-4 outline-slate-500 bg-slate-100" type="text" placeholder="Nome" {...register('name')} />
          <input className="p-3 rounded-md mx-9 outline-4 outline-slate-500 bg-slate-100" type="text" placeholder="Rua" {...register('street')} />
          <input className="p-3 rounded-md mx-9 outline-4 outline-slate-500 bg-slate-100" type="text" placeholder="Bairro" {...register('neighbourhood')} />
          <input className="p-3 rounded-md mx-9 outline-4 outline-slate-500 bg-slate-100" type="text" placeholder="Cidade" {...register('city')} />
          <input className="p-3 rounded-md mx-9 outline-4 outline-slate-500 bg-slate-100" type="text" placeholder="Estado" {...register('state')} />
          <input className="p-3 rounded-md mx-9 outline-4 outline-slate-500 bg-slate-100" type="text" placeholder="País" {...register('country')} />
          <button disabled={cart.length === 0} className="bg-red-500 rounded-lg p-3 mt-3 mx-9 text-slate-100 disabled:opacity-30" type="submit" onClick={handleSubmit(handlePurchaseSubmit)}>Finalizar compra</button>
        </div>
      </div>
    </div>
  )
}

