import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx'
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import React from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom'
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.jsx';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen]= React.useState(false);
  const [isRegistrInfoPopupOpen, setIsRegistrInfoPopupOpen] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState('')

  const [isLoading, setIsLodaing] = React.useState(false)

  const[loggedIn, setLoggedIn] = React.useState(false)
  const[emailAuth, setEmailAuth] = React.useState('')
  const[registrationStatus, setRegistrationStatus] = React.useState(false)

  const navigate = useNavigate()


  React.useEffect(() => {
    handletokenCheck()
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo().then(data => {
        setCurrentUser(data)
      }).catch(err => console.log(`Ошибка: ${err}`));

      api.getInitialCards().then(data => {
        setCards(data)
      }).catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSubmitRegistr() {
    setIsRegistrInfoPopupOpen(true)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function closeRegistrInfoPopup() {
    setIsRegistrInfoPopupOpen(false)
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards(cards => cards.filter((c) => c._id !== card._id))
    }).catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateUser(name, description) {
    setIsLodaing(true)
    api.setUserInfo(name, description).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    }).catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setIsLodaing(false))
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLodaing(true)
    api.setUserAvatar(avatarLink).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    }).catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setIsLodaing(false))
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLodaing(true)
    api.setAddCard(cardData).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    }).catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setIsLodaing(false))
  }

  function handleLogin() {
    setLoggedIn(true)
  }

  function handletokenCheck() {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if(res) {
          setEmailAuth(res.data.email)
          setLoggedIn(true);
          navigate('/')
        }
      }).catch((err) => console.log(`Ошибка: ${err}`))
    }
  }

  function handleAuthUser(password, email) {
    auth.authorize(password, email).then((data) => {
      if (data) {
        setEmailAuth(email)
        handleLogin()
        navigate('/')
      }
    }).catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleRegistrUser(password, email) {
    auth.registr(password, email).then((res) => {
      console.log(res)
      if (res.data) {
        setRegistrationStatus(true)
        handleSubmitRegistr()
        navigate('/sign-in')
      }
      if(res.error) {
        setRegistrationStatus(false)
        handleSubmitRegistr()
      }
    }).catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  function signOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setEmailAuth('')
    navigate('/sign-in')
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header signOut={signOut} userEmail={emailAuth} />
          <Routes>
            <Route path="/sign-up" element={<Register onRegistrUser={handleRegistrUser} />} />
            <Route path="/sign-in" element={<Login onAuthUser={handleAuthUser} />} />
            <Route path="/" element={<ProtectedRouteElement element={Main} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen = {handleEditAvatarClick} onCardClick={handleCardClick} loggedIn={loggedIn} />} />
          </Routes>
          {loggedIn ? <Footer /> : ''}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

          <PopupWithForm name = {'confirm-deletion'} title = {'Вы уверены?'} ></PopupWithForm>

          <InfoTooltip isOpen={isRegistrInfoPopupOpen} onClose={closeRegistrInfoPopup} registrationStatus={registrationStatus}/>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
