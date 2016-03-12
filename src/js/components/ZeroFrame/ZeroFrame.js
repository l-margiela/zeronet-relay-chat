/*jshint esversion: 6 */
export default class ZeroFrame {
	constructor() {
    this.onMessage = this.onMessage.bind(this);
    this.route = this.route.bind(this);
    this.onOpenWebsocket = this.onOpenWebsocket.bind(this);
    this.onCloseWebsocket = this.onCloseWebsocket.bind(this);
		this.waiting_cb = {};
		this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
		this.connect();
		this.next_message_id = 1;
		this.init();
  }

	init() {
		return this;
  }

	connect() {
		this.target = window.parent;
		window.addEventListener("message", this.onMessage, false);
		return this.cmd("innerReady");
  }

	onMessage(e) {
    const message = e.data;
    const cmd = message.cmd;
    if (cmd === "response") {
      if (this.waiting_cb[message.to] != null) {
        return this.waiting_cb[message.to](message.result);
      } else {
        return this.log("Websocket callback not found:", message);
      }
    } else if (cmd === "wrapperReady") {
      return this.cmd("innerReady");
    } else if (cmd === "ping") {
      return this.response(message.id, "pong");
    } else if (cmd === "wrapperOpenedWebsocket") {
      return this.onOpenWebsocket();
    } else if (cmd === "wrapperClosedWebsocket") {
      return this.onCloseWebsocket();
    } else {
      return this.route(cmd, message);
    }
  }

	route(cmd, message) {
		return this.log("Unknown command", message);
  }

	response(to, result) {
    return this.sendCmd({
      "cmd": "response",
      "to": to,
      "result": result
    });
  }

	cmd(cmd, params, cb) {
    if (params == null) {
      params = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.sendCmd({
      "cmd": cmd,
      "params": params
    }, cb);
  }

	sendCmd(message, cb=null) {
    if (cb == null) {
      cb = null;
    }
		message.wrapper_nonce = this.wrapper_nonce;
    message.id = this.next_message_id;
    this.next_message_id += 1;
    this.target.postMessage(message, "*");
    if (cb) {
      return this.waiting_cb[message.id] = cb;
    }
  }

	log(...args) {
		console.log("[ZeroFrame]", ...args);
  }

	onOpenWebsocket() {
		this.log("Websocket open");
  }

	onCloseWebsocket() {
		this.log("Websocket close");
  }
}

window.ZeroFrame = new ZeroFrame();
