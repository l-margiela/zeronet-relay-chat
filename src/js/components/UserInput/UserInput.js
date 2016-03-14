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
    if(e.keyCode == 13 && e.shiftKey) {
      e.target.style.height = "";
      e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px";
    }
    else if(e.keyCode == 13) {
      let value = e.target.value;
      let type = 'message';
      if(value === '' || value === "\n" || value === "/me") {
        e.target.value = '';
        return;
      }
      if(value.startsWith('/me ')) {
        type = 'action';
        value = value.slice(4);
      }
      this.newMessageHandler({
        "user": "hhes",
        "room": "zrc",
        "type": type,
        "body": value,
        "date_added": moment().unix()
      }, () => { e.target.value = ''; e.target.style.height = "";});
    }
  }

  render() {
    return h("div#UserInput", [
      h('textarea#MessageBox.input-big.width-12', {
        'rows': '1',
        'placeholder': 'Write it down here',
        'onkeyup': this._keyupHandler
      })
    ]);
  }
}
