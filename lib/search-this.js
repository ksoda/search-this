'use babel';

import { CompositeDisposable } from 'atom';
import { shell } from 'electron';

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'search-this:search': () => this.search()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      state: {}
    };
  },

  search() {
    console.log('search was triggered!');
    const editor = atom.workspace.getActiveTextEditor();
    const wordToSearchFor = editor.getSelectedText() || editor.getWordUnderCursor();
    return (
      shell.openExternal(`https://www.google.co.jp/search?q=${wordToSearchFor}`)
    );
  }

};
