/* postcss alter property value (papv) */
/* ES5 code */

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-alter-property-value', function (options) {
  var options = options || {};
  var declarations = options.declarations || {};
  var config = options.config || {};

  return function (root, result) {
//    try {
      var props = Object.keys(declarations);

      props.map(function (prop, index) {
        root.walkDecls(prop, function (decl) {
          var value = declarations[prop];
          var copyProp = decl.prop + '';
          var copyVal = decl.value + '';

          if (typeof value === 'string') {
            decl.value = value;
            addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
          }
          else if (typeof value === 'object' || value === undefined) {

            if (!value) {
              decl.prop = prop + '__papv__disable';
            }
            else if (!value.task) {
              // no task to do  if not set
            }

            else {
              switch (value.task) {
                case 'disable':
                  if (value.whenValueEquals === undefined && value.whenRegex === undefined) {
                    decl.prop = prop + '__papv_disable';
                  }
                  else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                    decl.prop = prop + '__papv_disable';
                  }
                  else if (value.whenRegex && regexTest(value.whenRegex, decl)) {
                    decl.prop = prop + '__papv_disable';
                  }
                  break;
                case 'changeProperty':
                  if (value.whenValueEquals === undefined && value.whenRegex === undefined) {
                    addInfoToValue(decl, ' /* papv - changeProp from [' + copyProp + '] */');
                    decl.prop = value.to;
                  } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                    addInfoToValue(decl, ' /* papv - changeProp from [' + copyProp + '] */');
                    decl.prop = value.to;
                  }
                  else if (value.whenRegex && regexTest(value.whenRegex, decl)) {
                    addInfoToValue(decl, ' /* papv - changeProp from [' + copyProp + '] */');
                    decl.prop = value.to;
                  }
                  break;
                case 'changeValue':
                  if (value.whenValueEquals === undefined && value.whenValueRegex === undefined) {
                    decl.value = value.to;
                    addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
                  } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                    decl.value = value.to;
                    addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
                  } else if (value.whenRegex && regexTest(value.whenRegex, decl)) {
                    decl.value = value.to;
                    addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
                  }
                  break;
                case 'remove':
                  if (value.whenValueEquals === undefined && value.whenValueRegex === undefined) {
                    decl.remove();
                  } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                    decl.remove();
                  } else if (value.whenRegex && regexTest(value.whenRegex, decl)) {
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

    // } catch (ex) {
    //   result.warn(JSON.stringify(ex));
    // }

  };

  /* Helper utils */

  function regexTest(whenRegex, decl) {
    if (!whenRegex || !decl || typeof whenRegex !== 'object') {
      return false;
    }

    if (whenRegex.value !== undefined) {
      var regex = new RegExp(whenRegex.value, whenRegex.flags || '');
      if (regex.test(decl.value)) {
        return { ok: true, type: 'value' };
      }
    } else if (whenRegex.property !== undefined) {
      var regex = new RegExp(value.whenRegex.property, value.whenRegex.flags || '');
      if (regex.test(decl.prop)) {
        return { ok: true, type: 'prop' };
      }
    }
    return false;
  }

  function addInfoToValue(decl, str) {
    if (config.addInfo) { decl.value += str; }
  }

});
