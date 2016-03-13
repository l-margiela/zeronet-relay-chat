/*jshint esversion: 6 */
require('./Settings.css');

let maquette = require("maquette");
let h = maquette.h;

export default class Settings {
  constructor(name, currentID, cmdHandler) {
    this.Name = name;
    this.currentID = currentID;
    console.log(this.currentID);
    this.newCmdHandler = cmdHandler;
  }

  get newCmdHandler() {
    return this._newCmdHandler;
  }

  set newCmdHandler(cmdHandler) {
    this._newCmdHandler = cmdHandler;
  }

  selectID(e) {
    this.newCmdHandler("certSelect", [["zeroid.bit"]], () => {});
  }

  render(currentID) {
    console.log("Settings rerendered");
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
