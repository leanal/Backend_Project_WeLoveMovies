const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where("review_id", reviewId)
        .first();
}

function destroy(reviewId) {
    return knex("reviews")
        .where("review_id", reviewId)
        .del();
}

function update(review) {
    return knex("reviews as r")
        .where("review_id", review.review_id)
        .update(review, "*")
        .then(updatedRecords => updatedRecords[0])
        // .returning("*")
}

function readCritics(criticId) {
    return knex("critics")
    .where("critic_id", criticId)
    .select("*")
    .first()
}

module.exports = {
    read,
    destroy,
    update,
    readCritics
}