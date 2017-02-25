const fs = require('fs');
const postcss = require('postcss');
const papvConfiguration = require( '../papv-configuration');
const papv = require('../postcss-alter-property-value');

fs.readFile('index.css', (err, css) => {
    postcss([papv(papvConfiguration)])
        .process(css, { from: 'index.css', to: 'index.papv.css' })
        .then(result => {
            fs.writeFile('index.papv.css', result.css);
            if ( result.map ) fs.writeFile('index.papv.css.map', result.map);
        });
});