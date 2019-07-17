const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

//returns an array of schemes in the db
function find() {
  return db("schemes");
}

//return a single scheme in the db by their id; always return null if id is invalid
function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then(scheme => {
      if (scheme) {
        return scheme;
      } else {
        return null;
      }
    });
}

function findSteps(id) {
  return db("steps as s")
    .innerJoin("schemes as sc", "sc.id", "s.step_number")
    .select("s.id", "sc.scheme_name", "s.step_number", "s.instructions")
    .where("s.id", id);
}

//add a new scheme to db
function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(id => {
      return findById(id[0]);
    });
}

//update scheme name
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

//remove scheme name
function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}
