export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  // оторый возвращает объект с данными пользователя. 
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {name: this._userName.textContent, about: this._userInfo.textContent}
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }
}