import React, {useState, useEffect, useContext} from "react"

import { Link } from "gatsby"
import PropTypes from "prop-types"
import { ShoppingOutlined } from '@ant-design/icons';
import Logo from '../Icons/Logo';
import { CartContext } from "../../contexts/CartContext"
import './header.css'

const Header = ({ siteTitle }) => {
  const [isDocked, setDocked] = useState(true);
  const {
    cart: {
      checkout: { lineItems },
    },
  } = useContext(CartContext)

  function handleScroll(){
    if (typeof window !== 'undefined') {
      if(window.location.pathname.includes('/product/') || window.location.pathname.includes('/cart')){
        setDocked(false);
      }else{
        if(window.scrollY > 0){
          setDocked(false);
        }else{
          setDocked(true);
        }
      }
    }
  }

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      if(window.location.pathname.includes('/product/') || window.location.pathname.includes('/cart')){
        setDocked(false);
      }
      window.addEventListener('scroll', handleScroll)

      return ()=>{
        window.removeEventListener('scroll', handleScroll)
      }
    }
  },[])
  return (
    <header className={`header ${isDocked?'header-docked':'header-shadow'}`}>
      <div className="app-container">
        <h1 style={{ margin: 0, display:'flex', flexFlow: 'row', alignItems:'center' }}>
          <div style={{flexGrow: 1}}>
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
              <Logo className="header-logo" style={{fill:isDocked?'white':'black'}}/>
            </Link>
          </div>
          <MenuLink to="/collections" text="Collections"/>
          <MenuLink to="/ab" text="About"/>
          <MenuLink to="/collections" text="Contact"/>
          <MenuLink to="/cart">
            <ShoppingOutlined />
            <span>{lineItems.length}</span>
          </MenuLink>
        </h1>
      </div>
    </header>
  )
}

function MenuLink({to, text, children}){
  return(
    <Link
      to={to}
      style={{
        padding:'10px 20px',
        textDecoration: `none`,
        fontSize:'1.3rem'
        }}
      >
      {text}
      {children}
    </Link>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
