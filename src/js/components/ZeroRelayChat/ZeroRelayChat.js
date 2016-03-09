/*jshint esversion: 6 */
// let maquette = require('../lib/maquette.min.js');
let maquette = require("maquette");
let h = maquette.h;

import Chat from '../Chat';
import Header from '../Header';

export default class ZeroRelayChat {
  constructor() {
    this.Chat = new Chat();
    this.Header = new Header();
  }

  render() {
    return h("div#ZeroRelayChat", [
      this.Header.render(),
      this.Chat.render(),
    ]);
  }
}
