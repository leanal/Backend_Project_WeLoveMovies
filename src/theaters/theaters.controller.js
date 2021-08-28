const theatersService = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res) {
  const data = await theatersService.list();
  const {
    theater_id,
    name,
    address_line_1,
    address_line_2,
    city,
    state,
    zip,
    created_at,
    updated_at,
    movie_id,
    title,
    runtime_in_minutes,
    rating,
    description,
    image_url,
    movie_created_at,
    movie_updated_at,
    is_showing,
    mt_theater_id
  }  = data;

  const reduceTheaterAndMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    movie_created_at: ["movies", null, "created_at"],
    movie_updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    mt_theater_id: ["movies", null, "theater_id"],
  });

//   console.log(JSON.stringify(reduceTheaterAndMovies(data), null, 4));
  res.json({ data: reduceTheaterAndMovies(data) });
}
module.exports = {
  list: [asyncErrorBoundary(list)],
};
