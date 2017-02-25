module.exports = {
  plugins: [
    require('./postcss-alter-property-value.js')(
      {
        config: {
          addInfo: true, // add debug info
        },
        declarations: {
    
          'font-family': 'sans-serif',   
          'mouse': {
            task: 'changeProperty',
            to: 'cursor'
          },
          
           
          'transform': {
            task: 'cloneBefore',
            to: '-webkit-transform'
          },
                       
          'display': {
            task: 'changeValue',
            to: 'flex',
            whenValueEquals: 'inline-flex'
          },
          
          'outline': { task: 'remove' },
          
          'border': {
            task: 'changeValue',
            to: '#000',
            whenRegex: {
              mode: 'replace',
              value: 'black',
              flags: 'i',
            },        
          },
          'color': {
            task: 'changeValue',
            to: 'orange',
            whenRegex: {
              value: 'blue$',
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
      
      } // end declarations 
        
      }),
  ]
}
