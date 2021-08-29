const reviewsService = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function destroy(req, res) {
  await reviewsService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
    const newReview = {
        ...req.body.data,
        review_id: Number(req.params.reviewId)
    }
    await reviewsService.update(newReview)
    const data = await reviewsService.read(newReview.review_id) // performed another read for SQLite testing purposes. Server does not automatically respond with an array of updated records like PostgreSQL does
    res.locals.review = data;
    next();
}

async function readCritic(req, res) {
    const critic = await reviewsService.readCritics(res.locals.review.critic_id)
    const data = {
        ...res.locals.review,
        critic
    }
    res.json({ data: data })
}

async function listByMovie(req, res) {
  const { movieId } = req.params;
  const reviews = await reviewsService.listByMovie(movieId);
  // destructure
  const data = reviews.map(review => {
    const {
      review_id,
      content,
      score,
      created_at,
      updated_at,
      critic_id,
      movie_id,
      c_critic_id,
      preferred_name,
      surname,
      organization_name,
      c_created_at,
      c_updated_at,
      } = review;
      return {
        review_id,
        content,
        score,
        created_at,
        updated_at,
        critic_id,
        movie_id,
        critic: {
          critic_id: c_critic_id,
          preferred_name,
          surname,
          organization_name,
          created_at: c_created_at,
          updated_at: c_updated_at
        }
      }
  });
  res.json({ data: data });
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update), asyncErrorBoundary(readCritic)],
  list: [asyncErrorBoundary(listByMovie)]
};
