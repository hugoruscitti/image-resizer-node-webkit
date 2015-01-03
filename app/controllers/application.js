import Ember from 'ember';
import resizer from 'image-resizer-node-webkit/utils/resizer';

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

    window.resizer = resizer;

  }.on('init')
});
