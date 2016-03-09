/*jshint esversion: 6 */
require('../../node_modules/imperavi-kube/css/kube.css');
require('../../node_modules/icono/build/icono.css');
require('../css/main.css');
let maquette = require("maquette");

import ZeroRelayChat from './components/ZeroRelayChat';

var h = maquette.h;
var domNode = document.body;
window.projector = maquette.createProjector();

let ZeroRelayChatInst = new ZeroRelayChat();
function renderMaquette() {
  return ZeroRelayChatInst.render();
}

window.projector.append(domNode, renderMaquette);
