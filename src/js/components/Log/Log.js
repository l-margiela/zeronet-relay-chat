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
    this.messages.push(message);
    this.mapping.map(this.messages);
  }

  renderMarkdown(text, node) {
    node.innerHTML = this.md.render(text);
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
