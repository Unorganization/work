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

