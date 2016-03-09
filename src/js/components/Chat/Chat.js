/*jshint esversion: 6 */
require('./Chat.css');

let maquette = require("maquette");
let h = maquette.h;

import Log from '../Log';
import UserInput from '../UserInput';

export default class Chat {
  constructor() {
    this.Log = new Log();
    this.UserInput = new UserInput(this.messageHandler.bind(this));
  }

  messageHandler(message, cb) {
    this.Log.addMessage(message);
    cb();
  }

  render() {
    return h('div#Chat', [
      this.Log.render(),
      this.UserInput.render()
    ]);
  }
}
