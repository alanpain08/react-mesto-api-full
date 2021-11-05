import React, { useState } from "react";


function Login(props) {
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
    props
      .onLogin(email, password);
  }

  return (
    <section className="auth auth_type_login">
      <div className="auth__container">
        <h2 className="auth__header">Вход</h2>
        <form onSubmit={handleSubmit} className="auth__form auth__form_type_login" noValidate>
          <input
            onChange={handleChangeEmail}
            className="auth__input auth__input_type_login-email"
            name="login-email"
            id="login-email"
            type="text"
            placeholder="Email"
            value={email}
            required
          />
          <input
            onChange={handleChangePassword}
            className="auth__input auth__input_type_login-password"
            name="login-password"
            id="login-password"
            type="password"
            placeholder="Пароль"
            value={password}
            required
          />
          <button type="submit" className="auth__submit-button">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
