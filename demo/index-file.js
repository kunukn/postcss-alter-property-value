const fs = require('fs');
const postcss = require('postcss');
const plugin = require('../postcss-alter-property-value');
const configuration = require( '../papv-configuration');

fs.readFile('index.css', (err, css) => {
    postcss([plugin(configuration)])
        .process(css, { from: 'index.css', to: 'index.out.css' })
        .then(result => {
            fs.writeFile('index.out.css', result.css);
            if ( result.map ) fs.writeFile('index.out.css.map', result.map);
        });
});