# postcss alter property value
Alter your css declarations.

# about
A tool for changing css declarations with given configuration.

* Change property name
* Change value
* Clone declaration with a new property name

Usage examples. 
* Simulate flexbox not working by removing `display: flex`
* Remove all `outline` usage
* Correct property name `mouse: pointer` to `cursor: pointer`
* Simplify `background: #ddd` to `background-color: #ddd` if the value is a hex color

# npm
https://www.npmjs.com/package/postcss-alter-property-value


# configuration example
Check the postcss.config.js file for inspiration

```javascript
{
  /* optional */
  config: {
    /* add debug info */
    addInfo: true
  },

  /* required */
  declarations: {
    /* set all font-families to this value */
    'font-family': 'sans-serif',
    'mouse': {
      /* replace all mouse properties with cursor */
      task: 'changeProperty',
      to: 'cursor'
    },
    'font-size': {
      /* change font-size to 2rem */
      task: 'changeValue',
      to: '2rem',
    },
    'display': {
      /* conditional change value */
      task: 'changeValue',
      to: 'flex',
      whenValueEquals: 'inline-flex'
    },
    'outline': {
      /* remove all outlines */
      task: 'remove'
    },
    'border': {
      /* change border: 1px solid black
            to border: 1px solid #000 */
      task: 'changeValue',
      to: '#000',
      whenRegex: {
        mode: 'partial',
        value: 'black',
        flags: 'i'
      }
    },
    'color': {
      /* replace all color names ending with blue */
      task: 'changeValue',
      to: 'orange',
      whenRegex: {
        value: 'blue$',
        flags: 'i'
      }
    },
    'background': {
      /* simplify background to background-color
      if value is a hex */
      task: 'changeProperty',
      to: 'background-color',
      whenRegex: {
        value: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
        flags: 'i'
      }
    },
    'transform': {
      /* clone this declaration 
      and add before this declaration */
      task: 'cloneBefore',
      to: '-webkit-transform'
    },
  } // end declarations
}
```

A css file with these rules

```css
body {
    font-family: Helvetica;
    background: #FFD700;
    mouse: pointer;
    max-width: 900px;
    margin: 0 auto;
    color: LightbluE;
}

p {    
    font-size: 1rem;
    font-family: Arial;
    background: #fff;
    padding: 1rem;    
    color: dodgerblue;    
    outline: 2px dashed red;
    border: 1px solid black;
    display: inline-flex;
    transform: translateY(10px);
}
```

Is modified to
```css
body {
    font-family: sans-serif /* papv - changeValue from [Helvetica] */;
    background-color: #FFD700 /* papv - changeProp from [background] */;
    cursor: pointer /* papv - changeProp from [mouse] */;
    max-width: 900px;
    margin: 0 auto;
    color: orange /* papv - changeValue from [LightbluE] */;
}

p {    
    font-size: 2rem /* --papv - changeValue from [1rem] */;
    font-family: sans-serif /* papv - changeValue from [Arial] */;
    background-color: #fff /* papv - changeProp from [background] */;
    padding: 1rem;
    color: orange /* papv - changeValue from [dodgerblue] */;
    border: 1px solid #000 /* --papv - changeValue from [1px solid black] */;
    display: flex /* papv - changeValue from [inline-flex] */;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
}
```



# development
* Git clone the project or download it
* npm install
* npm start
* Open dev tools in browser and inspect the elements
