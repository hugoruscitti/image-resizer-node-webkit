import Ember from 'ember';

var path = require('path');
var os = require('os');

export default function resizer() {

  function resize(input_path, output_path, width, height) {
    var im = require('imagemagick');

    if (os.platform() === 'darwin') {
      console.log("configurando rutas para osx");

      im.convert.path = 'binarios/ImageMagick_osx32/bin/convert';
      im.identify.path = 'binarios/ImageMagick_osx32/bin/identify';

    } else {
      console.log("configurando rutas para windows");

      im.convert.path = 'binarios/ImageMagick_win32/convert.exe';
      im.identify.path = 'binarios/ImageMagick_win32/identify.exe';

    }


    var promise = new Ember.RSVP.Promise(function(resolve, reject) {

      var params = [input_path, '-resize', width + 'x' + height, output_path];

      if (!fs.existsSync(im.convert.path)) {
        reject("Cuidado, no existe el archivo: " + im.convert.path);
        return;
      }

      im.convert(params, function(err, stdout) {

        if (err) {
          reject(err);
        } else {
          resolve({output: path.basename(output_path), stdout: stdout});
        }
      });

    });

    return promise;
  }

  return {
    resize: resize
  };
}
