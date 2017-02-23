module.exports = {
  plugins: [
    require('./postcss-alter-property-value.js')(
      {             
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
      'outline': { task: 'remove'},
      'border': {
        task: 'remove',
        whenValueEquals: '1px solid black'
      },
    }),  
  ]
}
