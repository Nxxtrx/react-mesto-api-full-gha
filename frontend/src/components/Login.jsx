import React from "react"
import { useFormAndValidation } from "../hooks/useValidationInput";
import AuthForm from "./AuthForm";

export default function Login({onAuthUser}) {
  const { values, errors, isValid, setIsValid, handleChange } =
    useFormAndValidation();

  const { email, password } = values;

  React.useEffect(() => {
    if (!email && !password) {
      setIsValid(false);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthUser(password, email);
  };

  return (
      <AuthForm
        title="Вход"
        isValid={isValid}
        handleSubmit={handleSubmit}
        titleButton="Войти"
      >
        <input
          className="authorization__input authorization__input_type_email"
          type="email"
          placeholder="Email"
          name="email"
          required
          minLength="3"
          value={email || ""}
          onChange={handleChange}
        />
        <span className="authorization__input-error">{errors.email}</span>
        <input
          className="authorization__input authorization__input_type_password"
          type="password"
          placeholder="Пароль"
          name="password"
          required
          minLength="3"
          value={password || ""}
          onChange={handleChange}
        />
        <span className="authorization__input-error">{errors.password}</span>
      </AuthForm>
  );
}
