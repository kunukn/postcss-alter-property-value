module.exports = {
  plugins: [require('./postcss-alter-property-value.js')({

      config: {
        addInfo: true, // add debug info
      },

      declarations: {
        'font-family': 'sans-serif', // set all properties with this value
        'mouse': {
          task: 'changeProperty',
          to: 'cursor' // change all mouse properties with this property
        },
        'transform': {
          task: 'cloneBefore', // add a clone before this declaration
          to: '-webkit-transform' // with this property name
        },
        'display': {
          task: 'changeValue',
          to: 'flex',
          whenValueEquals: 'inline-flex'
        },
        'outline': {
          task: 'remove'
        },
        // e.g. border: 1px solid black -> border: 1px solid #000
        'border': {
          task: 'changeValue',
          to: '#000',
          whenRegex: {
            mode: 'partial',
            value: 'black', 
            flags: 'i'
          }
        },
        'color': {
          task: 'changeValue',
          to: 'orange',
          whenRegex: {
            /* mode: 'replace', // default mode */
            value: 'blue$',
            flags: 'i'
          }
        },
        'font-size': {
          task: 'changeValue',
          to: '2rem'
        },
        'background': {
          task: 'changeProperty',
          to: 'background-color',
          whenRegex: {
            value: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
            flags: 'i'
          }
        }
      } // end declarations

    })]
}
