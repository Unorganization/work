const assert = require("assert");

describe("sql_test", function () {
  it("basic", function () {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database(":memory:");

    db.serialize(() => {
      db.run("CREATE TABLE lorem (info TEXT)");

      const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (let i = 0; i < 3; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();
      console.log("aaa");
      db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
      });
    });

    db.close();
  });

  it("join", function () {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database(":memory:");

    db.serialize(() => {
      db.run("CREATE TABLE person (name TEXT)");
      db.run("CREATE TABLE pet (name TEXT, person_name TEXT)");

      db.run("INSERT INTO person VALUES ('Bob')");
      db.run("INSERT INTO person VALUES ('Alice')");

      db.run("INSERT INTO pet (name, person_name) VALUES ('Fidoz', 'Bob')");

      db.each("SELECT rowid AS id, name FROM person", (err, row) => {
        console.log(row.id + ": " + row.name);
      });
      db.each("SELECT rowid AS id, name FROM pet", (err, row) => {
        console.log(row.id + ": " + row.name + ", " + row.person_name);
        console.dir(row);
      });
    });

    db.close();
  });
});
