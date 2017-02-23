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
check the postcss.config.js file for inspiration

```javascript
module.exports = {
  plugins: [
    require('./postcss-alter-property-value.js')(
      {
        'outline': { task: 'disable' },
        'display': {
          task: 'disable',
          whenValueEquals: 'flex'
        },
        'color': {
          task: 'changeValue',
          whenRegex: {
            value: 'blue$',
            flags: 'i',
          },
          to: 'orange'
        },
        'mouse': {
          task: 'changeProp',
          to: 'cursor'
        },
        'background-color': {
          task: 'disable',
          whenValueRegex: '^dark'
        },
        'font-size': {
          task: 'changeValue',
          to: '2rem',
        },        
      }),
  ]
}
```

A css file with these rules

```css
.box {    
    mouse: pointer;             /* this will be changed */     
    background-color: darkred;  /* this will be disabled */
    font-size: 1rem;            /* this will be changed */     
    color: dodgerblue;          /* this will be changed */
    outline: 3px dashed blue;   /* this will be disabled */
    display: flex;              /* this will be disabled */
}
```

Would be changed to
```css
.box {    
    cursor: pointer /* papv - changeProp from [mouse] */;
    background-color__papv_disable: darkred;
    font-size: 2rem /* papv - changeValue from [1rem] */;
    color: orange;
    outline__papv_disable: 3px dashed blue;
    display__papv_disable: flex;
}
```



# development
* Git clone the project or download it
* npm install
* npm start
