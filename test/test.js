'use strict';

/* 
    Unit tests made with inspiration 
    from https://github.com/iamvdo/postcss-opacity
*/

var fs = require('fs');
var postcss = require('postcss');
var plugin = require('../postcss-alter-property-value');

var chai = require('chai'),
    expect = chai.expect;

chai.should();

var test = function (name, opts) {
    var input = read('test/fixtures/' + name + '.css');
    var output = read('test/fixtures/' + name + '.out.css');
    expect(postcss(plugin(opts)).process(input).css).to.eql(output);
};
var testString = function (input, output, opts) {
    expect(postcss(plugin(opts)).process(input).css).to.eql(output);
};
var read = function (path) {
    return fs.readFileSync(path, 'utf-8');
};

describe('postcss-alter-property-value', function () {

    describe('change value for background-color property', function () {
        it('should change value to #fff when value is white', function () {
            test('change-value-when-value-equals', {
                declarations: {
                    'background-color':
                    {
                        task: 'changeValue',
                        to: '#fff',
                        whenValueEquals: 'white'
                    }
                }
            });
        });

    });

    describe('change value for all properties', function () {
        it('should change value to #fff when value is white', function () {
            test('change-all-values-when-value-equals', {
                declarations: {
                    '*':
                    {
                        task: 'changeValue',
                        to: '#fff',
                        whenValueEquals: 'white'
                    }
                }
            });
        });

    });
});
