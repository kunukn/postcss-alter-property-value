# postcss alter property value
Alter your css property names or values.

# about
A tool to simulate the browser behaviour if certain properties are missing.
Remove/change unwanted properties.

e.g. 
* Simulate flexbox not working by disabling `display: flex`
* Remove all outlines `outline: 1px solid red`
* Change property names `mouse: pointer -> cursor: pointer`

# npm
https://www.npmjs.com/package/postcss-alter-property-value


# usage
Check the postcss.config.js file for inspiration

```javascript
declarations: {
  'border': '10px', // if value is type string, all properties will be set with this    
  'mouse': {
    task: 'changeProperty',
    to: 'cursor' // all mouse properties are change to cursor
  },
  'transform': {
    task: 'cloneBefore',
    to: '-webkit-transform'
  },             
  'display': {
    task: 'changeValue',
    to: 'flex',
    whenValueEquals: 'inline-flex' // condition
  },
  'outline': { task: 'remove' },
  'border': {
    task: 'remove',
    whenValueEquals: '1px solid black'
  },
  'color': {
    task: 'changeValue',
    to: 'orange',
    whenRegex: {
      value: 'blue$', // lightblue and dodgerblue are changed
      flags: 'i',
    },            
  },
  'font-size': {
    task: 'changeValue',
    to: '2rem',
  },
  'background': {
    task: 'changeProperty',
    to: 'background-color',
    whenRegex: {
      value: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
      flags: 'i',              
    },            
  },          
}
```

A css file with these rules

```css
body {
    font-family: sans-serif;
    background: #FFD700;
    mouse: pointer;
    max-width: 1200px;
    margin: 0 auto;
    color: lightblue;
}

p {    
    font-size: 1rem;
    background: #fff;
    padding: 1rem;    
    color: dodgerblue;    
    outline: 13px dashed red;
    border: 1px solid black;
    display: inline-flex;
    transform: translateY(10px);
}
```

Would be changed to
```css
body {
    font-family: sans-serif;
    background-color: #FFD700 /* papv - changeProp from [background] */;
    cursor: pointer /* papv - changeProp from [mouse] */;
    max-width: 1200px;
    margin: 0 auto;
    color: orange /* papv - changeValue from [lightblue] */;
}

p {    
    font-size: 2rem /* papv - changeValue from [1rem] */;
    background-color: #fff /* papv - changeProp from [background] */;
    padding: 1rem;
    color: orange /* papv - changeValue from [dodgerblue] */;
    display: flex /* papv - changeValue from [inline-flex] */;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
}
```



# development
* Git clone the project or download it
* npm install
* npm start
