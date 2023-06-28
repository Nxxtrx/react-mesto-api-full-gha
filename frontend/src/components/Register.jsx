import React from "react"
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useValidationInput";
import AuthForm from "./AuthForm";

export default function Register({onRegistrUser}) {

  const {values, errors, isValid, setIsValid, handleChange} = useFormAndValidation()
  const {email, password } = values

  React.useEffect(() => {
    if(!email && !password) {
      setIsValid(false)
    }
  }, [email, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistrUser(password, email)
  }

  return (
    <AuthForm
      title="Регистрация"
      isValid={isValid}
      handleSubmit={handleSubmit}
      titleButton="Зарегистрироваться"
    >
      <input
        className="authorization__input authorization__input_type_email"
        type="email"
        placeholder="Email"
        name="email"
        minLength="3"
        required
        value={email || ""}
        onChange={handleChange}
      />
      <span className="authorization__input-error">{errors.email}</span>
      <input
        className="authorization__input authorization__input_type_password"
        type="password"
        placeholder="Пароль"
        name="password"
        minLength="3"
        required
        value={password || ""}
        onChange={handleChange}
      />
      <span className="authorization__input-error">{errors.password}</span>
      <p className="authorization__login-in">
        Уже зарегистрированы? &nbsp;
        <Link className="authorization__entry-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}
