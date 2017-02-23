var postcss = require('postcss');

/* postcss alter property value (papv) */

module.exports = postcss.plugin('postcss-alter-property-value', function (options) {
  var options = options || {};

  return function (root, result) {
    var props = Object.keys(options);
    props.map(function (prop, index) {
      root.walkDecls(prop, function (decl) {
        var value = options[prop];

        if (typeof value === 'object') {

          if (!value) {
            decl.prop = prop + '__papv__disable-all-by-not-set';
          }
          else if (!value.task) {
            // no task if not set
          }

          else {
            switch (value.task) {
              case 'disable':
                if (value.whenValueEquals === undefined && value.whenRegex === undefined) {
                  decl.prop = prop + '__papv_disable-all';
                }
                else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                  decl.prop = prop + '__papv_disable-by-value';
                }
                else if (value.whenRegex) {
                  var regexTest = regexTest(value.whenRegex, decl);
                  if (regexTest) {
                    decl.prop = prop + '__papv_disable_by-regex';
                  }
                }
                break;
              case 'changeProp':
                if (value.whenValueEquals === undefined && value.whenRegex === undefined) {
                  decl.value = decl.value + ' /* papv - changePropAll from [' + decl.prop + '] */';
                  decl.prop = value.to;
                } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                  decl.value = decl.value + ' /* papv - changeProp from [' + decl.prop + '] */';
                  decl.prop = value.to;
                }
                else if (value.whenRegex) {
                  var regexTest = regexTest(value.whenRegex, decl);
                  if (regexTest) {
                    decl.value = decl.value + ' /* papv - changeProp from [' + decl.prop + '] */';
                    decl.prop = value.to;
                  }
                }
                break;
              case 'changeValue':
                if (value.whenValueEquals === undefined && value.whenValueRegex === undefined) {
                  decl.value = value.to + ' /* papv - changeValueAll from [' + decl.value + '] */';
                } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                  decl.value = value.to + ' /* papv - changeValue from [' + decl.value + '] */';
                } else if (value.whenRegex) {
                  decl.value = value.to + ' /* papv - changeValue from [' + decl.value + '] */';
                }
                break;
              case 'remove':
                if (value.whenValueEquals === undefined && value.whenValueRegex === undefined) {
                  decl.remove();
                } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                  decl.remove();
                } else if (value.whenRegex) {
                  decl.remove();
                }
                break;
              default:
                result.warn('unknown task: [' + value.task + ']');
                break;
            }
          }
        }
      });
    });
  };

  /* Helper util */
  function regexTest(whenRegex, decl) {
    if (!whenRegex || !decl || typeof whenRegex !== 'object') {
      return false;
    }

    if (whenRegex.value !== undefined) {
      var regex = new RegExp(whenRegex.value, whenRegex.flags || '');
      if (regex.test(decl.value)) {
        return { ok: true, type: 'value' };
      }
    } else if (whenRegex.prop !== undefined) {
      var regex = new RegExp(value.whenRegex.prop, value.whenRegex.flags || '');
      if (regex.test(decl.prop)) {
        return { ok: true, type: 'prop' };
      }
    }
    return false;
  }

});
