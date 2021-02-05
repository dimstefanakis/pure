import React from "react"

import { CartContextProvider } from "./src/contexts/CartContext"
import { Provider } from './src/contexts/StoreContext';

export const wrapRootElement = ({ element }) => (
  <CartContextProvider>
    <Provider>
      {element}
    </Provider>
  </CartContextProvider>
)