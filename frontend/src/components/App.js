import React from "react";
import {useEffect, useState} from "react";
import { Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from "./Login";
import Register from "./Register";

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from './ImagePopup';
import InfoTooltip from "./InfoTooltip";

import api from '../utils/Api.js';
import auth from '../utils/Auth.js';

import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isOk, setIsOk] = useState(false);
  const [infoText, setInfoText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [loggedOn, setLoggedOn] = useState(false);

  const [topButton, setTopButton] = useState('');
  const [topButtonLink, setTopButtonLink] = useState('');
  const [emailInfo, setEmailInfo] = useState('');

  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true); };
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true); };
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true); };
  
  function handleTopButtonChange(text, link, email) {
    setTopButton(text);
    setTopButtonLink(link);
    setEmailInfo(email);
  }

  function handleRegisterSubmit(userData) {
    auth.register(userData)
      .then((userInfo) => {
        setIsOk(true);
        setInfoText('Вы успешно зарегистрировались!');
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsOk(false);
        setInfoText('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLoginSubmit(userData) {
    auth.authorize(userData)
    .then((userInfo) => {
      if (userInfo.token) {
        setEmailInfo(userData.email);
        setLoggedOn(true);
        localStorage.setItem('token', userInfo.token);
        history.push('/')
      }
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setIsOk(false);
      setInfoText('Что-то пошло не так! Попробуйте ещё раз.');
    });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setCurrentUser('');
    setLoggedOn(false);
    history.push('/signin');
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  function handleConfirmationClick(card) { 
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true); 
  };

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => 
      {setIsLoading(false)});
  }

  function handleUpdateUserAvatar(userData) {
    setIsLoading(true);
    api.setUserAvatar(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => 
      {setIsLoading(false)});
  }

  function handleAddPlaceSubmit (data) {
    setIsLoading(true);
    api.postNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => 
    {setIsLoading(false)});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteOwnersCard(card._id).then(() => {
      const newCards = cards.filter((element) => element._id === card._id ? false : true)
      setCards(newCards);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if (loggedOn) {
      api.setHeaders(localStorage.getItem('token'));
      Promise.all([
        api.getProfileInfo(),
        api.getInitialCards()])
        .then(([userInfo, cardsInfo]) => {
          setCurrentUser(userInfo);
          setCards(cardsInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedOn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.validate({token})
        .then(res => {
          if (res) {
            setEmailInfo(res.data.email);
            setLoggedOn(true);
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    }
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header 
          text={topButton}
          link={topButtonLink}
          email={emailInfo}
          onClick={handleLogout}
        />
        <Switch>
          <Route path="/signin">
            <Login handleTopButtonChange={handleTopButtonChange} onAuthSubmit={handleLoginSubmit}/>
          </Route>
          <Route path="/signup">
            <Register handleTopButtonChange={handleTopButtonChange} onAuthSubmit={handleRegisterSubmit}/>
          </Route>
          <ProtectedRoute exact path="/"
            loggedOn={loggedOn}
            component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              setCards={setCards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmationClick}
              handleTopButtonChange={handleTopButtonChange}
              emailInfo={emailInfo}
            />
        </Switch>   

        <EditAvatarPopup onClose={closeAllPopups} onUpdateAvatar={handleUpdateUserAvatar} isOpen={isEditAvatarPopupOpen} isLoading={isLoading} />
        <EditProfilePopup onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} isLoading={isLoading} />
        <AddPlacePopup onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} isLoading={isLoading} />
        <ConfirmationPopup card={selectedCard} onClose={closeAllPopups} isOpen={isConfirmationPopupOpen} onDelete={handleCardDelete}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} isOk={isOk} infoText={infoText}/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
