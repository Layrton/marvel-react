import { ReactNode, createContext, useState } from "react";
import { ComicType } from "./ComicContext";
import { toast } from 'react-toastify';
import { getSpecificComic } from "../services/api";

export type DeliveryAddressType = {
  deliveryAddress: any
}

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: ComicType[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  deliveryAddress: object;
  setDeliveryAddress: any;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartContextProvider({ children }: CartProviderProps): JSX.Element {
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressType[]>([])
  const [cart, setCart] = useState<ComicType[]>(() => {

    if (typeof window !== 'undefined') {
      const storagedCart = localStorage.getItem('@MarvelComics:cart')
      // const item = localStorage.getItem('key')

      if (storagedCart) {
        return JSON.parse(storagedCart);
      }
    }
    return [];
  });

  console.log(cart)

  const addProduct = async (productId: number) => {
    try {
      const productAlreadyInCart = cart.find(product => product.id === productId)

      if (!productAlreadyInCart) {
        const product = await getSpecificComic(Number(productId))

        setCart([...cart, {
          amount: 1,
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail.path,
          thumbnailExtension: product.thumbnail.extension,
          price: product?.prices[0].price !== 0 ? product?.prices[0].price : 9.99, // preço padrão de 9.99 caso não haja preço
          subTotal: "",
          formattedPrice: ""
        }])
        localStorage.setItem('@MarvelComics:cart', JSON.stringify([...cart, {
          amount: 1,
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail.path,
          thumbnailExtension: product.thumbnail.extension,
          price: product?.prices[0].price !== 0 ? product?.prices[0].price : 9.99
        }]))
        toast('Produto adicionado com sucesso!')
        return;
      }

      if (productAlreadyInCart) {
        const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
          ...cartItem,
          amount: Number(cartItem.amount) + 1
        } : cartItem)

        setCart(updatedCart)
        localStorage.setItem('@MarvelComics:cart', JSON.stringify(updatedCart))
        return;

      }
    } catch {
      toast.error('Erro na adição do produto')
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExists = cart.some(cartProduct => cartProduct.id === productId)
      if (!productExists) {
        toast.error('Erro na remoção do produto');
        return
      }

      const updatedCart = cart.filter(cartItem => cartItem.id !== productId)
      setCart(updatedCart)
      localStorage.setItem('@MarvelComics:cart', JSON.stringify(updatedCart))
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) {
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const productExists = cart.some(cartProduct => cartProduct.id === productId)
      if (!productExists) {
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
        ...cartItem,
        amount: amount
      } : cartItem)
      setCart(updatedCart)
      localStorage.setItem('@MarvelComics:cart', JSON.stringify(updatedCart))
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  const clearCart = async () => {
    localStorage.setItem('@MarvelComics:cart', JSON.stringify([]))
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, updateProductAmount, deliveryAddress, setDeliveryAddress, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

