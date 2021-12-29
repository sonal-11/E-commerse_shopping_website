import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import { Link, useLocation } from "react-router-dom";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
import "./style.scss";

import logo from "../../assets/logo.PNG";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state)
});

const Header = (props) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(false);
  const dispatch = useDispatch();
  const { currentUser,totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
    console.log("sonal");
  };

  useEffect(() => {
    setActiveMenu(false);
  }, [location]);

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="simpleTut LOGO" />
          </Link>
        </div>

        <nav className={`mainMenu ${activeMenu ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>

            <li>
              <Link to="/cart">
                YOUR CART ({totalNumCartItems})
              </Link>
            </li>

            {currentUser && [
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li>
                <span onClick={() => signOut()}>Logout</span>
              </li>
            ]}

            {!currentUser && [
              <li>
                <Link to="/registration">Register</Link>
              </li>,
              <li>
                <Link to="/login">login</Link>
              </li>
            ]}
          </ul>

          <li className="mobileMenu">
            <span onClick={() => setActiveMenu(!activeMenu)}>
              <i className="fas fa-bars"></i>
            </span>
          </li>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
