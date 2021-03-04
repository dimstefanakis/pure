import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import {Drawer} from 'antd';
import {ShoppingOutlined, MenuOutlined} from '@ant-design/icons';
import {useMediaQuery} from 'react-responsive';
import Logo from '../Icons/Logo';
import {CartContext} from '../../contexts/CartContext';
import './header.css';

const Header = ({siteTitle}) => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'});
  const [visible, setVisible] = useState(false);
  const [isDocked, setDocked] = useState(true);
  const {
    cart: {
      checkout: {lineItems},
    },
  } = useContext(CartContext);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  function handleScroll() {
    if (typeof window !== 'undefined') {
      // we want to match both /product and /products
      if (
        window.location.pathname.includes('/product') ||
        window.location.pathname.includes('/cart') ||
        window.location.pathname.includes('/about') ||
        window.location.pathname.includes('/contact')
      ) {
        setDocked(false);
      } else {
        if (window.scrollY > 0) {
          setDocked(false);
        } else {
          setDocked(true);
        }
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname.includes('/product') ||
        window.location.pathname.includes('/cart') ||
        window.location.pathname.includes('/about') ||
        window.location.pathname.includes('/contact')
      ) {
        setDocked(false);
      }
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  return (
    <header
      className={`header ${isDocked ? 'header-docked' : 'header-shadow'}`}>
      <div className="app-container">
        <h1
          style={{
            margin: 0,
            display: 'flex',
            flexFlow: 'row',
            alignItems: 'center',
          }}>
          <div style={{flexGrow: 1}}>
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}>
              <Logo
                className="header-logo"
                style={{fill: isDocked ? 'white' : 'black'}}
              />
            </Link>
          </div>
          <Drawer onClose={onClose} visible={visible} placement="left">
            <div style={{display:'flex', flexFlow:'column'}}>
              <DrawerMenuLink to="/collections" text="Collections"/>
              <DrawerMenuLink to="/about" text="About" />
              <DrawerMenuLink to="/contact" text="Contact" />
              <DrawerMenuLink to="/cart">
                <ShoppingOutlined />
                <span>{lineItems.length}</span>
              </DrawerMenuLink>
            </div>
          </Drawer>
          {!isTabletOrMobile ? (
            <>
              <MenuLink to="/collections" text="Collections" />
              <MenuLink to="/about" text="About" />
              <MenuLink to="/contact" text="Contact" />
              <MenuLink to="/cart">
                <ShoppingOutlined />
                <span>{lineItems.length}</span>
              </MenuLink>
            </>
          ) : (
            <MenuOutlined
              style={{color: isDocked ? 'white' : 'black'}}
              onClick={showDrawer}
            />
          )}
        </h1>
      </div>
    </header>
  );
};

function MenuLink({to, text, children}) {
  return (
    <Link
      to={to}
      style={{
        padding: '10px 20px',
        textDecoration: `none`,
        fontSize: '1.3rem',
      }}>
      {text}
      {children}
    </Link>
  );
}

function DrawerMenuLink({to, text, children}) {
  return (
    <Link
      to={to}
      style={{
        padding: '10px 20px',
        textDecoration: `none`,
        fontSize: '2.3rem',
        color: 'black'
      }}>
      {text}
      {children}
    </Link>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
