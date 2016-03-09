/*jshint esversion: 6 */
require('./UserInput.css');

let maquette = require("maquette");
let h = maquette.h;

let moment = require("moment");

export default class UserInput {
  constructor(messageHandler) {
    this.newMessageHandler = messageHandler;
    this._keyupHandler = this.keyupHandler.bind(this);
  }

  get newMessageHandler() {
    return this._newMessageHandler;
  }

  set newMessageHandler(messageHandler) {
    this._newMessageHandler = messageHandler;
  }

  keyupHandler(e) {
    if(e.keyCode == 13) { // Enter key
      if(e.target.value === '') return;
      this.newMessageHandler({
        "user": "hhes",
        "room": "zrc",
        "type": "message",
        "body": e.target.value,
        "date_added": moment().unix()
      }, () => { e.target.value = '' });
    }
  }

  render() {
    return h("div#UserInput", [
      h('input#MessageBox.input-big.width-12', {
        'type': 'text',
        'placeholder': 'Write it down here',
        'onkeyup': this._keyupHandler
      })
    ]);
  }
}
