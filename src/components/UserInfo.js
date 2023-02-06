export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  // оторый возвращает объект с данными пользователя. 
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {name: this._userName.textContent, info: this._userInfo.textContent}
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, info) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}