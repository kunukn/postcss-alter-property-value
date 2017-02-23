# postcss alter property value

# about
todo


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
        'border': {
          task: 'disable',
          whenValueEquals: '1px solid black'
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
    mouse: pointer;
    background-color: darkred;
    font-size: 1rem;        
    color: dodgerblue;
    outline: 13px dashed blue;
    border: 1px solid black;
}
```

Would be changed to
```css
.box {    
    cursor: pointer /* papv - changePropAll from [mouse] */;
    background-color__papv_disable: darkred;
    font-size: 2rem;
    color: orange;
    outline__papv_disable: 13px dashed blue;
    border__papv_disable: 1px solid black;
}
```



# development
* Git clone the project or download it
* npm install
* npm start
