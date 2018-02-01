var App = require('ghost-app'),
    myHelpers;

myHelpers = App.extend({

    install: function() {},

    uninstall: function() {},

    activate: function() {
        console.log('myhelpers: activate()');
        this.ghost.helpers.register('firstimage', this.firstimageHelper);
        this.ghost.helpers.register('imageresize', this.imageResizeHelper);
    },

    deactivate: function() {},

    firstimageHelper: function (input) {
      var result = String(input).match(/<img.*?>/g);
      if (result) {
        var url = result[0].match(/src="(.*?)"/g);
        if (url) {
          url = url[0].substr(5);
          return url.substr(0, url.length - 1);
        }
      }
      return false;
  },

  imageResizeHelper: function(url, width) {
    if (url && url[0] === '/') return url;
    return 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy'
    + '?container=focus'
    + '&resize_w=' + width
    + '&url=' + url;
  }
});

module.exports = myHelpers;
