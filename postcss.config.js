module.exports = (ctx) => {
    return {
        plugins: [require('./postcss-alter-property-value')(require('./papv-configuration'))]
    }
}
