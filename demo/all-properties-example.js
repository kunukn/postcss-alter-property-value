/* run in console/terminal:
   node all-properties-test.js
*/

const fs = require('fs');
const postcss = require('postcss');

const papv = require('../postcss-alter-property-value');
const papvConfiguration = {
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
    postcss([papv(papvConfiguration)])
        .process(css, { from: 'all-properties-example.css', to: 'all-properties-example.papv.css' })
        .then(result => {
            //console.log(result.css);
            fs.writeFile('all-properties-example.papv.css', result.css);
        });
});