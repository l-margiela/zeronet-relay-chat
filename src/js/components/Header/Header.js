/*jshint esversion: 6 */
require('./Header.css');

let maquette = require("maquette");
let h = maquette.h;

export default class Header {
  constructor() {

  }

  render() {
    return h('div#Header',
    [
      h('a', {
        'href': '#SettingsPanel'
      }, [
        h('i.icono-caretRightCircle#SettingsButton.left.text-centered'),
      ]),
      h('h1#Topic.title', ["Testing Room"])]);
  }
}
