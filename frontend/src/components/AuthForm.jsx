
export default function AuthForm({children, title, isValid, handleSubmit, titleButton}) {

  const formInputs = [children[0], children[1], children[2], children[3]]
  const loginLink = children[4]

  return(
    <section className="authorization">
      <h1 className="authorization__title">{title}</h1>
      <form className="authorization__form" noValidate onSubmit={handleSubmit}>
        {formInputs}
        <button
          className={`authorization__button ${isValid ? "" : "authorization__button_type_inactive"}`}
          type="submit"
          disabled={!isValid}
        >
          {titleButton}
        </button>
      </form>
      {loginLink}
    </section>
  )
}
