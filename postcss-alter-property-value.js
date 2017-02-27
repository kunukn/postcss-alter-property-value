/* postcss alter property value (papv) */
/* ES5 code */

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-alter-property-value', function (options) {
  var options = options || {},
    declarations = options.declarations || {},
    config = options.config || {};

  return function (root, result) {
    var props = Object.keys(declarations);

    props.map(function (prop, index) {
      if (prop === '*') {
        root.walkDecls(function (decl) {          
          declarationParser({ value: declarations[prop], decl: decl });
        });
      }
      else{
        root.walkDecls(prop, function (decl) {          
          declarationParser({ value: declarations[prop], decl: decl });
        });
      }
    });
  };

  /* Helper utils */

  function declarationParser(data) {
    if (Array.isArray(data.value)) {
      var valueArray = data.value;
      valueArray.map(function (value, index) {
        data.value = value;
        declarationParserHelper(data);
      });
    }
    else {
      declarationParserHelper(data);
    }
  }

  function declarationParserHelper(data) {
    var value = data.value,
        decl = data.decl,
        copyProp = decl.prop + '',
        copyVal = decl.value + '';

    if (typeof value === 'string') {
      decl.value = value;
      addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
    } else if (typeof value === 'object' || value === undefined) {

      if (!value) {
        decl.prop = prop + '__papv__disable';
      } else if (!value.task) {
        // no task to do if not set, then don't do anything.
      } else {

        if (value.whenRegex && typeof value.whenRegex === 'object') {
          regexParser({ value: value, decl: decl });
        } else {

          switch (value.task) {
            case 'remove':
              if (hasNoFields(value)) {
                decl.remove();
              } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                decl.remove();
              }
              break;
            case 'cloneBefore':
              var node = decl.cloneBefore({ prop: value.to });
              break;
            case 'cloneAfter':
              var node = decl.cloneAfter({ prop: value.to });
              break;
            case 'disable':
              if (hasNoFields(value)) {
                decl.prop = prop + '__papv_disable';
              } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                decl.prop = prop + '__papv_disable';
              }
              break;
            case 'changeProperty':
              if (hasNoFields(value)) {
                decl.prop = value.to;
                addInfoToValue(decl, ' /* papv - changeProp from [' + copyProp + '] */');
              } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                decl.prop = value.to;
                addInfoToValue(decl, ' /* papv - changeProp from [' + copyProp + '] */');
              }
              break;
            case 'changeValue':
              if (hasNoFields(value)) {
                decl.value = value.to;
                addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
              } else if (value.whenValueEquals !== undefined && value.whenValueEquals === decl.value) {
                decl.value = value.to;
                addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
              }
              break;

            default:
              result.warn('unknown task: [' + value.task + ']');
              break;
          }
        }
      }
    }
  }


  function regexParser(data) {
    var value = data.value,
      decl = data.decl,
      whenRegex = value.whenRegex;

    if (whenRegex.value === undefined) {
      return; // nothing to do when value is not set
    }

    var copyProp = decl.prop + '',
        copyVal = decl.value + '',
        task = value.task;

    var regex = new RegExp(whenRegex.value, whenRegex.flags || '');

    switch (task) {
      case 'disable':
        if (regex.test(decl.value))
          decl.prop = prop + '__papv_disable';
        break;
      case 'remove':
        if (regex.test(decl.value))
          decl.remove();
        break;
      case 'changeProperty':
        if (regex.test(decl.value)) {
          decl.prop = value.to;
          addInfoToValue(decl, ' /* papv - changeProp from [' + copyProp + '] */');
        }
        break;
      case 'changeValue':
        switch (whenRegex.mode) {
          case 'partial':
            decl.value = decl
              .value
              .replace(regex, value.to);
            addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
            break;
          case 'replace':
          default:
            if (regex.test(decl.value)) {
              decl.value = value.to;
              addInfoToValue(decl, ' /* papv - changeValue from [' + copyVal + '] */');
            }
            break;
        }
        break;
    }
  }

  function hasNoFields(value) {
    return value.whenValueEquals === undefined && value.whenRegex === undefined;
  }

  function addInfoToValue(decl, str) {
    if (config.addInfo && !containsString(decl.value, '/*')) {
      decl.value += str;
    }
  }

  function containsString(str, substr){
    return str && ~str.indexOf(substr)
  }

});
