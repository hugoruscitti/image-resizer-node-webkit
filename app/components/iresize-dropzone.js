import Ember from 'ember';

export default Ember.Component.extend({
  onmessage: null,
  onerror: null,
  ondrop: null,
  tagName: 'div',
  classNames: ['iresize-dropzone'],

  _init: function(){
    var holder = this.$()[0];
    var self = this;

    holder.ondragover = function () {
      this.className = 'iresize-dropzone hover';
      return false;
    };
    window.holder = holder;

    holder.ondragleave = function () {
      this.className = 'iresize-dropzone';
      return false;
    };

    holder.ondrop = function (e) {
      e.preventDefault();

      for (var i = 0; i < e.dataTransfer.files.length; ++i) {
        var path = e.dataTransfer.files[i].path;
        self.sendAction('ondrop', path);
      }

      this.className = 'iresize-dropzone';
      return false;
    };

  }.on('didInsertElement'),

  actions: {
    button: function() {
      this.sendAction('ondrop');
    }
  }
});
