import headerLogo from "../images/Vector.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header page__header">
      <img src={headerLogo} alt="логотип страницы" className="logo header__logo" />
      <div className="header__nav">
        <Switch>
          <Route exact path="/">
            <p className="header__text">{props.userMail}</p>
            <button onClick={props.onSignOut} className="header__button">
              Выйти
            </button>
          </Route>
          <Route path="/signin">
            <Link to="/signup" className="header__link">Регистрация</Link>
          </Route>
          <Route path="/signup">
            <Link to="/signin" className="header__link">Войти</Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
