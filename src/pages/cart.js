import React, { useContext } from 'react';
import DefaultLayout from '../components/layout';
import {Helmet} from "react-helmet";
import { CartContext, useGoToCheckout, useRemoveLineItems } from '../contexts/CartContext';
import './cart.css';

const Cart = () => {
  const {
    cart: {
      checkout: { lineItems },
    },
  } = useContext(CartContext);

  const formatter = new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR',
  });

  function getTotalAmount() {
    const prices = lineItems.map(item=>{
      return item.variant.price * item.quantity
    });
    const amount = prices.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    return formatter.format(amount);
  }

  const goToCheckout = useGoToCheckout();
  const removeLineItems = useRemoveLineItems();
  return (
    <DefaultLayout dockNavigation={false}>
      <Helmet>
        <title>Pure - Cart</title>
        <meta name="description" content="Checkout" />
        <link rel="canonical" href="https://www.purethebrand.gr/cart" />
      </Helmet>
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'center', marginTop: 200,
      }}
      >
        <h1>My cart</h1>
      </div>
      <ul
        className="cart-container"
      >
        <div style={{
          display: 'flex', width: '100%', marginBottom: 30, borderBottom: '1px solid #e8e8e8',
        }}
        >
          <p style={{ flexBasis: '20%', display: 'flex', justifyContent: 'center' }}>Product</p>
          <p style={{ flexBasis: '40%' }} />
          <p style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>Price</p>
        </div>
        {lineItems.length == 0 ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <h2>No items in the cart</h2>
          </div>
        ) : null}
        {lineItems.map((item, i) => (
          <li
            key={i}
            style={{
              width: '100%',
              listStyleType: 'none',
              textAlign: 'center',
              display: 'flex',
              flexFlow: 'row',
              margin: '10px 0',
            }}
          >
            <figure style={{ flexBasis: '20%', margin: 0 }}>
              <img
                src={item.variant.image.src}
                className="cart-product-image"
              />
            </figure>
            <div className="cart-product-wrapper">
              <p className="cart-product-name">{item.title}</p>
              <p className="cart-product-quantity">
                Quantity:
                {' '}
                {item.quantity}
              </p>
              <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => removeLineItems(item.id)}>Remove</p>
            </div>
            <div style={{
              flexGrow: 1, display: 'flex', flexFlow: 'column', alignItems: 'center',
            }}
            >
              <p style={{ fontWeight: 300 }}>{formatter.format(item.variant.price * item.quantity)}</p>
              <p style={{ fontWeight: 300, fontSize: '0.8rem', color: '#4e4e4e' }}>
                (
                {item.quantity}
                {' '}
                x
                {' '}
                {formatter.format(item.variant.price)}
                )
              </p>
            </div>
          </li>
        ))}
      </ul>
      {lineItems.length>0?
      <div className="cart-container" style={{flexFlow:'row'}}>
        <div className="gapper-1"></div>
        <div className="gapper-2" />
        <div style={{flexGrow:1, display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center'}}>
          <p style={{ fontWeight: 300 }}>
            Total: {getTotalAmount()}
          </p>
          <button className="checkout-button cool-font" onClick={goToCheckout}>Complete order</button>
        </div>
      </div>:null}
      
    </DefaultLayout>
  );
};

export default Cart;