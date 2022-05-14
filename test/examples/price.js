const mymath = require('./mymath.js');

function priceWithTax(price, tax) {
    return mymath.multiply(price, mymath.add(1, tax))
} 

exports.priceWithTax = priceWithTax
