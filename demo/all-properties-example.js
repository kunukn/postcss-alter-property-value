/* run in console/terminal:
   node all-properties-example.js
*/

const fs = require('fs');
const postcss = require('postcss');

const plugin = require('../postcss-alter-property-value');
const configuration = {
    declarations: {
        '*': [
            {
                task: 'changeValue',
                to: '#fff',
                whenValueEquals: 'white'
            },
            {
                task: 'changeValue',
                to: '12px',
                whenValueEquals: '10px'
            }
        ]
    }
};

fs.readFile('all-properties-example.css', (err, css) => {
    postcss([plugin(configuration)])
        .process(css, { from: 'all-properties-example.css', to: 'all-properties-example.out.css' })
        .then(result => {
            //console.log(result.css);
            fs.writeFile('all-properties-example.out.css', result.css);
        });
});