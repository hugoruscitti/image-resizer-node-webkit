import Ember from 'ember';

export default Ember.Controller.extend({
  _init: function() {

    window.ondragover = function(e) {
      e.preventDefault();
      return false;
    };

    window.ondrop = function(e) {
      e.preventDefault();
      return false;
    };

  }.on('init')
});
