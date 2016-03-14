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
        "user": "",
        "room": "zrc",
        "type": "message",
        "body": "Welcome to 0rc! If you see this message, the page itself has loaded fine. However, it might take a little while for all of the messages to load, and then display. Loading messages...",
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
                  }, [h('span.bold.text-centered', {'title': source.user}, [this.filterUsername(source.user)])]),
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
    this.messages.push(message);
    this.mapping.map(this.messages);
  }

  renderMarkdown(text, node) {
    node.innerHTML = this.md.render(text);
  }

  filterUsername(username) {
    if(username.endsWith('@zeroid.bit')) {
      return username.replace('@zeroid.bit', '');
    } else {
      return username;
    }
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
