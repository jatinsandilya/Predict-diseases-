'use strict';

export default function toImageUrl(src, callback, outputFormat) {
    var MAX_WIDTH = 1200;
    var MAX_HEIGHT = 1200;
    var OUTPUT_QUALITY = .75;

  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
}