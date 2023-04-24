import { Route, Routes } from "react-router-dom"
import App from "./App"
import Cart from "./pages/cart"
import Success from "./pages/success"
import { DefaultLayout } from "./Layouts/DefaultLayout"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  )
}