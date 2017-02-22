var postcss = require('postcss');

module.exports = postcss.plugin('postcss-alter-property-value', function (options) {
  var options = options || {};

  return function (root, result) {

    var props = Object.keys(options);
    props.map(function (prop, index) {
      root.walkDecls(prop, function (decl) {
          var value = options[prop];
          if (typeof value === 'string') {
            if (value === decl.value) {
              decl.prop = prop + '__papv__disable';
            } else if (value === '') {
              decl.prop = prop + '__papv__disable-all';
            }
          } else if (value === null) {
            decl.prop = prop + '__papv__disable-all';
          } else if (typeof value === 'object' && value !== null) {
            
            switch (value.type) {
              case 'disable':
                if (value.forAllValues) {
                  decl.prop = prop + '__papv__disable-all';
                } else if (value.whenValueEquals === decl.value) {
                  decl.prop = prop + '__papv__disable';
                }
                break;
              case 'changeProp':
                if (value.forAllValues) {
                  decl.value = decl.value + ' /* papv - changePropAll from [' + decl.prop + '] */';
                  decl.prop = value.to;
                } else if (value.whenValueEquals === decl.value) {
                  decl.value = decl.value + ' /* papv - changeProp from [' + decl.prop + '] */';
                  decl.prop = value.to;
                }
                break;
              case 'changeValue':
                if (value.forAllValues) {
                  decl.value = value.to + ' /* papv - changeValueAll from [' + decl.value + '] */';
                } else if (value.whenValueEquals === decl.value) {
                  decl.value = value.to + ' /* papv - changeValue from [' + decl.value + '] */';
                }
                break;
              case 'remove':
                if (value.forAllValues) {
                  decl.remove();
                } else if (value.whenValueEquals === decl.value) {
                  decl.remove();
                }
                break;
              default:
                result.warn('unknown type: ' + value.type);
                break;
            }
          }

        })
    });
  };
});
