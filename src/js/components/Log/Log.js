/*jshint esversion: 6 */
require('./Log.css');

let maquette = require("maquette");
let h = maquette.h;

let Remarkable = require("remarkable");
let moment = require("moment");

export default class Log {
  constructor() {
    this.messages = [
      {
        "user": "hhes",
        "room": "zrc",
        "type": "message",
        "body": "Hello, there",
        "date_added": Date.now()/1000
      },
      {
        "user": "erkan",
        "room": "zrc",
        "type": "message",
        "body": "Lorem *ipsum* dolor sit amet, consectetur adipiscing elit. Sed in risus vehicula, porta ligula sed, pulvinar elit. Nulla euismod libero nec ~~risus~~ eleifend, a molestie ipsum luctus.",
        "date_added": Date.now()/1000
      },
      {
        "user": "server@server",
        "room": "zrc",
        "type": "message",
        "body": "Loading messages...",
        "date_added": Date.now()/1000
      }
    ];

    this.md = new Remarkable({
      'typographer': true
    });
    this.md.block.ruler.disable([
      'table',
      'heading',
      'lheading',
      'blockquote',
    ]);

    this.mapping = maquette.createMapping(
      (source) => { return source.date_added },
      (source) => {
        this.currentMessage = source;
        let renderMarkdown = this.renderMarkdown.bind(this, source.body);
        return {
          renderMaquette: () => {
            return h("row", { 'key': source.date_added, 'enterAnimation': this.newMessageAnimation }, [
                  h('column', {
                    'cols': '1'
                  }, [h('span.muted.smaller.right', [moment.unix(source.date_added).fromNow()])]),
                  h('column', {
                    'cols': '0.5'
                  }, [h('span.bold.text-centered', [source.user])]),
                  h('column', {
                    'cols': '8'
                  }, [h('div.message-body', { 'afterCreate': renderMarkdown }, [source.body])])
                ]);
          }
        }
      },
      () => {}
    );
    this.mapping.map(this.messages);
  }

  addMessage(message) {
    window.projector.scheduleRender();
    message["body"] = this.replaceURLs(message["body"]);
    this.messages.push(message);
    this.mapping.map(this.messages);
  }

  renderMarkdown(text, node) {
    node.innerHTML = this.md.render(text);
  }

  replaceURLs(body) {
    const replacePattern0 = /(http:\/\/127.0.0.1:43110\/)/gi;
    const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    const replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    const replacePattern4 = /0net:\/\/([-a-zA-Z0-9+&@#+\/%?=~_|!:,.;]*)/g;
    const replacePattern5 = /(([a-zA-Z0-9\-\_\.])+)\/\/0mail/gim;

    let replacedText = body.replace(replacePattern0, '0net://');
    replacedText = replacedText.replace('@zeroid.bit', '//0mail');
    replacedText = replacedText.replace(replacePattern1, '<a href="$1" target="_blank" style="color: red; font-weight: bold;">$1</a>');
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" style="color: red; font-weight: bold;">$2</a>');
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" style="color: red; font-weight: bold;">$1</a>');
    replacedText = replacedText.replace(replacePattern4, '<a href="http://127.0.0.1:43110/$1" target="_blank" style="color: green; font-weight: bold;">0net://$1</a>');
    replacedText = replacedText.replace(replacePattern5, '<a href="http://127.0.0.1:43110/Mail.ZeroNetwork.bit/?to=$1" target="_blank" style="color: green; font-weight: bold;">$1@zeroid.bit</a>');

    return replacedText;
  }

  newMessageAnimation(domNode, properties) {
  }

  render() {
    return h('div#Log', [
      this.mapping.results.map((component) => {
        return component.renderMaquette();
      })
    ]);
  };
}
