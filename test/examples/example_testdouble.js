import assert from 'assert'
//import * as price from './price.js'
// import * as td from 'testdouble' // https://github.com/testdouble/testdouble.js/blob/main/examples/node-esm/test/lib/car-test.mjs

//td.replace('../path/to/module'[, customReplacement])

describe('yo yo', function () {
  beforeEach(async function () {

        // this.price = await td.replace('./price.js')

        // this.price = await td.replaceEsm('../price.js')
        // this.price = await td.replaceEsm('/git/work/test/examples/price.js')


    // this.price = await td.replaceEsm('file://./test/examples/price.js')

    // this.gasPedal = (await td.replaceEsm('../../lib/gas-pedal.mjs')).default // <-- a plain ol' function
    // this.accelerometer = await td.replaceEsm('../../lib/accelerometer.mjs') // <-- a named export
    // this.Brake = (await td.replaceEsm('../../lib/brake.mjs')).default // <-- a constructor function
    // await td.replaceEsm('../../lib/copilot.mjs', undefined, function () { return 'HIGHFIVE' }) // <-- a manual override
    // this.subject = await import('../../lib/mymath.mjs')
    // this.subject = await import('./price.js')
  })

  // afterEach(function () {
  //   td.reset()
  // })

  it('blah blah', function () {
    // assert.equal(this.subject.priceWithTax(8, .25), 10);
//    assert.equal(price.priceWithTax(8, .25), 10);

    // td.when(this.subject.add()).thenReturn(55)

    // td.verify(this.subject.add(55))
  })

});
