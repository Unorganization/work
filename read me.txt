Tiny curry

// Tiny, recursive autocurry
const curry = (
  f, arr = []
) => (...args) => (
  a => a.length === f.length ?
    f(...a) :
    curry(f, a)
)([...arr, ...args]);

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const trace = label => value => {
  console.log(`${ label }: ${ value }`);
  return value;
}

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);


---


distinct in terms of reduce:
a.filter((v,i,a)=>a.indexOf(v)==i)

map in terms of reduce:
a.reduce((acc, v) => [...acc, v * 2], [])

filter in terms of reduce:
a.reduce((acc, v) => v > 2 ? [...acc, v] : acc, [])

flatMap in terms of reduce
people.reduce((acc, v) => [...acc, ...v], [])

https://gist.github.com/NWCalvank/ec77b0c124f1048304cd8a08716a402f

module.exports = {
  compose,
  concat,
};

function apply(x, f) {
  return f(x);
}

function compose(...funcs) {
  return x => funcs.reduceRight(apply, x);
}

function concat(xs, val) {
  return xs.concat(val);
}
----


var lift = (f) => compose(unit, f);
var unit = (x) => [x, ''];

var bind = (f) => function(tuple) {
  const [x, s] = tuple,
        [y, t] = f(x);
  return [y, s + t];
};
const compose = arr => val => arr.reduce((f1,f2) => f2(f1), val)
const x2 = compose2( [a => a + a, a => a * a] )
const x = compose( [a => a + a, a => a * a] )


# title
nodejs tools.

Directory content:
* `.env` -- file containint secrets stored as environment variables. .gitignore'ed.
* `.gitignore` -- from https://github.com/github/gitignore/blob/main/Node.gitignore
* `example.env` -- checked in version of `.env`, with no secrets, for new clones.
* `server.js` -- main entry point.
* `try.js` -- scratch pad.

# how to run
1. npm install
2. npm start

# test
(runs stop script)
1. npm install
2. npm run test

or:
1. npm install-test

# how to stop the server
(runs stop script)
1. npm stop

# Notes

http://localhost:3000/queryworkitems?witquerybyname=Shared%20Queries/Team/EB/PI%20EB%20User%20Stories

text/csv
