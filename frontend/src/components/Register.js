import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="auth auth_type_register">
      <div className="auth__container">
        <h2 className="auth__header">Регистрация</h2>
        <form
          onSubmit={handleSubmit}
          className="auth__form auth__form_type_register"
          noValidate
        >
          <input
            onChange={handleChangeEmail}
            value={email}
            className="auth__input auth__input_type_register-email"
            name="register-email"
            id="register-email"
            type="text"
            placeholder="Email"
            required
          />
          <input
            onChange={handleChangePassword}
            value={password}
            className="auth__input auth__input_type_register-password"
            name="register-password"
            id="register-password"
            type="password"
            placeholder="Пароль"
            required
          />
          <button
            type="submit"
            className="auth__submit-button"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="auth__signin">
          <p className="auth__signin-text">Уже зарегистрированы?</p>
          <Link to="signin" className="auth__login-link">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
