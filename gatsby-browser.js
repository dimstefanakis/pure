import React from "react"
import { ToastContainer, toast } from 'react-toastify';
import { CartContextProvider } from "./src/contexts/CartContext"
import { Provider } from './src/contexts/StoreContext';
import 'react-toastify/dist/ReactToastify.css';

export const wrapRootElement = ({ element }) => (
  <CartContextProvider>
    <Provider>
      {element}
      <ToastContainer />
    </Provider>
  </CartContextProvider>
)
