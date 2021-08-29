const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where("review_id", reviewId).first();
}

function destroy(reviewId) {
  return knex("reviews").where("review_id", reviewId).del();
}

function update(review) {
  return knex("reviews as r")
    .where("review_id", review.review_id)
    .update(review, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function readCritics(criticId) {
  return knex("critics").where("critic_id", criticId).select("*").first();
}

function listByMovie(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*",
        "c.critic_id as c_critic_id",
        "c.preferred_name",
        "c.surname",
        "c.organization_name",
        "c.created_at as c_created_at",
        "c.updated_at as c_updated_at")
    .where("r.movie_id", movieId);
}

module.exports = {
  read,
  destroy,
  update,
  readCritics,
  listByMovie,
};
