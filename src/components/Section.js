// отвечает за отрисовку элементов на странице.
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items; // это массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = containerSelector; // селектор контейнера, в который нужно добавлять созданные элементы.
  }

  // Содержит публичный метод, который отвечает за отрисовку всех элементов.
  addItem(element) {
    this._container.prepend(element);
  }

  // Содержит публичный метод, который отвечает за отрисовку всех элементов
  renderItems(cards) {
    cards.reverse().forEach(item => {
      this._renderer(item);
    });
  }
}