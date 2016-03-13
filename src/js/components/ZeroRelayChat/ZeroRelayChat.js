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
    this.currentID = undefined;
    this.Name = 'Testing';
    this.Description = 'A room where I can test all of the latest changes.'
    this.Header = new Header(this.Name, this.Description);
    this.Log = new Log();
    this.UserInput = new UserInput(this.messageHandler.bind(this));
    this.Settings = new Settings(this.Name, this.currentID, this.cmdHandler.bind(this));
    this.loadMessages();
  }

  messageHandler(message, cb) {
    this.Log.addMessage(message);
    cb();
  }

  cmdHandler(cmd, data, cb) {
    this.cmd(cmd, data, cb);
  }

  loadMessages () {
    let query = "SELECT message.*, keyvalue.value AS cert_user_id FROM message\nLEFT JOIN json AS data_json USING (json_id)\nLEFT JOIN json AS content_json ON (\n    data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n)\nLEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\nORDER BY date_added";
    this.cmd("dbQuery", [query], (messages) => {
      for (let i = 0, len = messages.length; i < len; i++) {
        let message = messages[i];
        let message_json = {
          "user": message.cert_user_id,
          "room": "zrc",
          "type": "message",
          "body": message.body.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
          "date_added": message.date_added/1000,
        }
        this.Log.addMessage(message_json);
      }
    });
  }

  render() {
    return h("div#ZeroRelayChat", [
      this.Header.render(),
      this.Log.render(),
      this.UserInput.render(),
      this.Settings.render(this.currentID)
    ]);
  }

  route(command, message) {
    if(command === "setSiteInfo") {
      if(message.params.cert_user_id) {
        this.currentID = message.params.cert_user_id;
      }
    }
  }

  onOpenWebsocket(e) {
    this.cmd("siteInfo", {}, (siteInfo) => {
      if (siteInfo.cert_user_id) {
        console.log("Id changed");
        this.currentID = siteInfo.cert_user_id;
        window.projector.scheduleRender();
        console.log(this.currentID);
      }
    });
  }
}
