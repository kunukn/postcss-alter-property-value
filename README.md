# postcss alter property value
Alter your css declarations.

# about
A tool for changing css declarations from a rule based configuration.

* Change property names
* Change values
* Clone a declaration with a new property name

Usage examples. 
* Simulate flexbox not working by removing `display: flex`
* Remove all `outline` usage
* Correct declaration `mouse: pointer` to `cursor: pointer`
* Simplify `background: #ddd` to `background-color: #ddd` if the value is a hex color
* For all properties, change value from `16px` to `1rem`

# npm
https://www.npmjs.com/package/postcss-alter-property-value


# configuration example
Check **postcss.config.js** for inspiration.

```javascript
{
  /* optional */
  config: {
    /* add debug info */
    addInfo: true,
  },

  /* required */
  declarations: {      
    '*': {
      /* The *-property will evaluate all properties 
        The tasks for *-property is always executed first.
        This is a relative expensive task, I recommend to only use this if you must.
        */
      task: 'changeValue',
      to: 'translateY(2px)',
      whenValueEquals: 'translateY(10px)'
    },
    /* set all font-families to this value */
    'font-family': 'sans-serif',                  
    'mouse': {
      /* replace all mouse properties with cursor */
      task: 'changeProperty',
      to: 'cursor'
    },
    'transform': {
      /* clone a declaration and add before this declaration */
      task: 'cloneBefore',
      to: '-webkit-transform'
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
    'color': {
      /* replace all color names ending with blue */
      task: 'changeValue',
      to: 'orange',
      whenRegex: {
        value: 'blue$',
        flags: 'i' // ignore case sensitivity
      }
    },
    'font-size': {
      /* change to 2rem when value is a rem unit */
      task: 'changeValue',
      to: '2rem',
      whenRegex: {
        value: 'rem',
        flags: 'i'
      }
    },
    'border': [
      /* list of tasks for border property */
      {
        /* change border: 1px solid black
                to border: 1px solid #000 */
        task: 'changeValue',
        to: '#000',
        whenRegex: {
          mode: 'partial',
          value: 'black',
          flags: 'i'
        },
      }, {
        /* change border: 1px solid #000
                to border: 2px solid #000 */
        task: 'changeValue',
        to: '2px',
        whenRegex: {
          mode: 'partial',
          value: '1px',
          flags: 'i'
        }
      }
    ],
    'background': {
      /* simplify background to background-color 
      if value is a hex */
      task: 'changeProperty',
      to: 'background-color',
      whenRegex: {
        value: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
        flags: 'i'
      }
    }
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
    font-size: 2rem /* papv - changeValue from [1rem] */;
    font-family: sans-serif /* papv - changeValue from [Arial] */;
    background-color: #fff /* papv - changeProp from [background] */;
    padding: 1rem;
    color: orange /* papv - changeValue from [dodgerblue] */;
    border: 2px solid #000 /* --papv - changeValue from [1px solid black] */;
    display: flex /* papv - changeValue from [inline-flex] */;
    -webkit-transform: translateY(2px) /* papv - changeValue from [translateY(10px)] */;
    transform: translateY(2px) /* papv - changeValue from [translateY(10px)] */;
}
```



# development
* Git clone the project or download it
* npm install
* npm start
* Open a browser and go to http://localhost:3456/
* Insert your styles in demo/index.css
* Open and make changes to the configuration in postcss.config.js
* Open dev tools in browser and inspect the elements

# command line usage example

`css-changes.js`

```javascript
const fs = require('fs');
const postcss = require('postcss');
const papv = require('postcss-alter-property-value');
const papvConfiguration = {
    /* your configuration */
    declarations: {
        'background-color': {
                task: 'changeValue',
                to: '#fff',
                whenValueEquals: 'white'
            }
    }
};
fs.readFile('my.css', (err, css) => {
    postcss([papv(papvConfiguration)])
        .process(css, { from: 'my.css', to: 'my-new.css' })
        .then(result => {
            fs.writeFile('my-new.css', result.css);
        });
});
```

Run in console/terminal 
where my.css is going to be updated to my-new.css

`node css-changes.js`

