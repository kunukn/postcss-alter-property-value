module.exports =
  {
    /* optional */
    config: {
      /* add debug info */
      addInfo: true,
    },

    /* required */
    declarations: {      
      '*': {
        /* The *-property will evaluate all properties */
        /* The tasks for *-property is always executed first */
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
        /* list of task for border property */
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
