import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['iresize-devtools'],
  actions: {
    openDevtools: function() {
      require('nw.gui').Window.get().showDevTools();
    }
  }
});
