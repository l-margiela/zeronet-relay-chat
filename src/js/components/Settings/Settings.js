/*jshint esversion: 6 */
require('./Settings.css');

let maquette = require("maquette");
let h = maquette.h;

export default class Settings {
  constructor(name, currentID, cmdHandler) {
    this.Name = name;
    this.currentID = currentID;
    console.log("cmdHandler at Settings:\n" + cmdHandler);
    this.newCmdHandler = cmdHandler;
  }

  get newCmdHandler() {
    console.log("inside get:\n" + this._newCmdHandler);
    return this._newCmdHandler;
  }

  set newCmdHandler(cmdHandler) {
    console.log("inside set:\n" + cmdHandler);
    this._newCmdHandler = cmdHandler;
  }

  selectID(e) {
    console.log("cmdHandler at selectID():\n" + this.newCmdHandler);
    this.newCmdHandler("certSelect", [["zeroid.bit"]], () => {});
  }

  render(currentID) {
    return h('div#SettingsPanel',
    [
      h('div#SettingsHeader', [
        h('h1#SettingsTitle', [this.Name]),
        h('a#SettingsBack', {
          'href': '#'
        }, [
          h('i.icono-caretLeftCircle#SettingsButton'),
        ]),
      ]),
      h('div#SelectID', [
        h('hr'),
        h('button', { type: "primary", outline: "" , onclick: this.selectID }, [currentID ? currentID : "Select ID"])
      ])
    ]);
  }
}
