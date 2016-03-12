/*jshint esversion: 6 */
require('./Settings.css');

let maquette = require("maquette");
let h = maquette.h;

export default class Settings {
  constructor() {

  }

  render() {
    return h('div#SettingsPanel',
    [
      h('a', {
        'href': '/#'
      }, [
        h('i.icono-caretLeftCircle#SettingsButton.right.text-centered'),
      ]),
      h('div#SettingsPanel', [
        h('h1#SettingsTitle'),
      ])]);
  }
}
