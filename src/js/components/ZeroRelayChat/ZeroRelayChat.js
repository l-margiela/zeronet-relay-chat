/*jshint esversion: 6 */
// let maquette = require('../lib/maquette.min.js');
let maquette = require("maquette");
let h = maquette.h;

import ZeroFrame from '../ZeroFrame';
import Header from '../Header';
import Log from '../Log';
import UserInput from '../UserInput';
import Settings from '../Settings';

export default class ZeroRelayChat extends ZeroFrame {
  constructor() {
    super();
    this.Name = 'Testing';
    this.Description = 'A room where I can test all of the latest changes.'
    this.Header = new Header(this.Name, this.Description);
    this.Log = new Log();
    this.UserInput = new UserInput(this.messageHandler.bind(this));
    this.Settings = new Settings(this.Name);
  }

  messageHandler(message, cb) {
    this.Log.addMessage(message);
    cb();
  }

  render() {
    return h("div#ZeroRelayChat", [
      this.Header.render(),
      this.Log.render(),
      this.UserInput.render(),
      this.Settings.render()
    ]);
  }
}
