/* run in console/terminal:
   node all-properties-test.js
*/

const fs = require('fs');
const postcss = require('postcss');

const papv = require('../postcss-alter-property-value');
const papvConfiguration = {
    declarations: {
        '*': {
            task: 'changeValue',
            to: '#fff',
            whenValueEquals: 'white'
        }
    }
};

fs.readFile('all-properties-test.css', (err, css) => {
    postcss([papv(papvConfiguration)])
        .process(css, { from: 'all-properties-test.css', to: 'all-properties-test.papv.css' })
        .then(result => {
            fs.writeFile('all-properties-test.papv.css', result.css);            
        });
});