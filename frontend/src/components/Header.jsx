import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import logo from '../images/header-logo.svg'


export default function Header({signOut, userEmail}) {

  const location = useLocation()

  return (
    <header className="header">
      <img src={logo} alt="Логотип место" className="header__logo" />

      {location.pathname === "/sign-up" ? (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      ) :
        ""
      }
      {location.pathname === "/sign-in" ? (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      ) :
        ""
      }
      {location.pathname === "/" ? (
        <div className="header__container">
          <p className="header__user">{userEmail}</p>
          <button className="header__output-btn" onClick={signOut}>
            Выйти
          </button>
        </div>
      ) :
        ""
      }
    </header>
  );
}
