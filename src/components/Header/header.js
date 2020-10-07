import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useState, useEffect} from "react"
import Logo from '../Icons/Logo';
import './header.css'

const Header = ({ siteTitle }) => {
  const [isDocked,setDocked] = useState(true);

  function handleScroll(){
    if (typeof window !== 'undefined') {
      if(window.scrollY > 0){
        setDocked(false);
      }else{
        setDocked(true);
      }
    }
  }

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)

      return ()=>{
        window.removeEventListener('scroll', handleScroll)
      }
    }
  },[])
  return (
    <header className={`header ${isDocked?'':'header-shadow'}`} style={{backgroundColor:isDocked?'transparent':'white'}}>
      <div className="app-container">
        <h1 style={{ margin: 0, display:'flex', flexFlow: 'row', alignItems:'center' }}>
          <div style={{flexGrow: 1}}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
                
              }}
            >
              <Logo className="header-logo" style={{fill:isDocked?'white':'black'}}/>
            </Link>
          </div>
          <MenuLink to="/collections" text="Collections"/>
          <MenuLink to="/ab" text="About"/>
          <MenuLink to="/collections" text="Contact"/>

        </h1>
      </div>
    </header>
  )
}

function MenuLink({to,text}){
  return(
    <Link
      to={to}
      style={{
        padding:'10px 20px',
        color: `white`,
        textDecoration: `none`,
        fontSize:'1.3rem'
        }}
      >
      {text}
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
