import { Controller } from 'stimulus';

export default class extends Controller {
  static values = {
    loader: String
  }

  connect() {
    this.element.addEventListener('ajax:beforeSend', this._beforeSend);
  }

  disconnect() {
    this.element.removeEventListener('ajax:beforeSend', this._beforeSend);
  }

  _beforeSend = ({ target }) => {
    if (target.dataset.showLoader) {
      App.dispatchEvent(this.loaderValue, 'loader:show');
      target.addEventListener('ajax:success', this._success.bind(this), { once: true });
    }
  }

  _success({ target }) {
    if (target.dataset.showLoader) {
      App.dispatchEvent(this.loaderValue, 'loader:hide');
    }
  }
}
