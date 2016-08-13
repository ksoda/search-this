'use babel';

import SearchThisView from './search-this-view';
import { CompositeDisposable } from 'atom';

export default {

  searchThisView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.searchThisView = new SearchThisView(state.searchThisViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.searchThisView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'search-this:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.searchThisView.destroy();
  },

  serialize() {
    return {
      searchThisViewState: this.searchThisView.serialize()
    };
  },

  toggle() {
    console.log('SearchThis was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
