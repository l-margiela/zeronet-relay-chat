/*jshint esversion: 6 */
require('./Settings.css');

let maquette = require("maquette");
let h = maquette.h;

export default class Settings {
  constructor(name) {
    this.Name = name;
  }

  render() {
    return h('div#SettingsPanel',
    [
      h('div#SettingsHeader', [
        h('h1#SettingsTitle', [this.Name]),
        h('a#SettingsBack', {
          'href': '#'
        }, [
          h('i.icono-caretLeftCircle#SettingsButton'),
        ]),
      ])
    ]);
  }
}
