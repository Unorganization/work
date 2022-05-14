import * as mymath from './mymath.js'

export function priceWithTax(price, tax) {
    return mymath.multiply(price, mymath.add(1, tax))
} 
