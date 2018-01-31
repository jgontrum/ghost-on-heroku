var App = require('ghost-app'),
    myHelpers;

myHelpers = App.extend({

    install: function() {},

    uninstall: function() {},

    activate: function() {
        this.ghost.helpers.register('compare', this.compareHelper);
        this.ghost.helpers.register('firstimage', this.firstimageHelper);
    },

    deactivate: function() {},

    compareHelper: function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2)  ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2)  ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2)   ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2)  ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2)   ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2)  ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2)  ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2)  ? options.fn(this) : options.inverse(this);
            case 'typeof':
                return (typeof v1 == v2)  ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },

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
  }
});

module.exports = myHelpers;
