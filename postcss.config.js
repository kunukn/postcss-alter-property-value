module.exports = {
  plugins: [
    require('./postcss-alter-property-value.js')(
      { 
      'border-radius': null, 
      'display':'flex',
      'content': '""',
      'content': "''", 
      'box-shadow': null,
      
      'color': {
        type: 'changeValue',
        whenValueEquals: 'red',
        to: 'orange'
      },
      'mouse': {
        type: 'changeProp',
        forAllValues: true,
        to: 'cursor'
      },
      'background-color': {
        type: 'disable',
        whenValueEquals: 'red'
      },
      'font-size': {
        type: 'changeValue',
        forAllValues: true,
        to: '3rem',
      },
      'outline': {
        type: 'remove',
        forAllValues: true
      },
      'border': {
        type: 'remove',
        whenValueEquals: '1px solid black'
      },
    }),  
  ]
}
