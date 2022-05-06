import {stringify} from 'csv-stringify/sync'

let x = stringify([
  { year: 'XXXX', phone: 'XXX XXXX' },
  { year: 'YYYY', phone: 'YYY YYYY' }
],{
  header: true
});
console.log(x)