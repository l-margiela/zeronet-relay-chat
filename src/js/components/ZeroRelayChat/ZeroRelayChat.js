/*jshint esversion: 6 */
// let maquette = require('../lib/maquette.min.js');
let maquette = require("maquette");
let h = maquette.h;

import Header from '../Header';
import Log from '../Log';
import UserInput from '../UserInput';

export default class ZeroRelayChat {
  constructor() {
    this.Header = new Header();
    this.Log = new Log();
    this.UserInput = new UserInput(this.messageHandler.bind(this));
  }

  messageHandler(message, cb) {
    this.Log.addMessage(message);
    cb();
  }

  render() {
    return h("div#ZeroRelayChat", [
      this.Header.render(),
      this.Log.render(),
      this.UserInput.render()
    ]);
  }
}
