module.exports = {
  plugins: [
    require('./postcss-alter-property-value.js')(
      {
        config: {
          addInfo: true,
        },
        declarations: {
          'border': '10px',          
          'mouse': {
            task: 'changeProperty',
            to: 'cursor'
          },
          'display': {
            task: 'changeValue',
            to: 'flex',
            whenValueEquals: 'inline-flex'
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
              value: 'color$',
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
      }),
  ]
}
