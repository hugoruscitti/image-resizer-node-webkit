import Ember from 'ember';
var path = require('path');
import resizer from 'image-resizer-node-webkit/utils/resizer';

export default Ember.Controller.extend({
  messages: [],
  working: false,

  /**
   * Genera una ruta de salida para un archivo agregando un sufijo.
   *
   * Por ejemplo:
   *
   *     > this._get_output_path('/ruta/ejemplo.png', 'small')
   *     "/ruta/ejemplo_small.png"
   *
   */
  _get_output_path: function(input, sufix) {
    var last_name = path.basename(input);
    var last_extension = path.extname(input);
    var last_name_no_extension = last_name.replace(last_extension, '');

    var new_name = last_name_no_extension + '_' + sufix + last_extension;
    return path.join(path.dirname(input), new_name);
  },

  actions: {
    uploadImage: function(input_path) {
      var self = this;

      var path_small = this._get_output_path(input_path, '200');
      var path_normal = this._get_output_path(input_path, '400');

      self.set('working', true);

      resizer().resize(input_path, path_small, 200, 200).
        then(function(data) {
          self.get('messages').pushObject("Creando " + data.output);
          return resizer().resize(input_path, path_normal, 400, 400);
        }).then(function(data) {
          self.get('messages').pushObject("Creando " + data.output);
          self.set('working', false);
        }).catch(function(err) {
          console.error(err);
          alert(err);
          self.set('working', false);
        });

    },
    printMessage: function(message) {
      this.get('messages').pushObject(message);
    },
    printError: function(error) {
      this.get('messages').pushObject("ERROR: " + error);
    }
  }
});
