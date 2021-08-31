# WeLoveMovies Backend Project

[Deployed version](https://fast-coast-25771.herokuapp.com/)

## Objectives

- [x] Install and use common middleware packages
- [x] Receive requests through routes
- [x] Access relevant information through route and query parameters
- [x] Create an error handler for the case where a route doesn't exist
- [x] Build an API following RESTful design principles
- [x] Create and customize a knexfile.js file
- [x] Create a connection to database with Knex
- [x] Write database queries to complete CRUD routes in an Express server
- [x] Return joined and nested data with Knex
- [x] Write database migrations using Knex's migration tool

### GET /movies

This route will return a list of all movies. The response from the server looks like the following:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/..."
    }
    // ...
  ]
}
```

### GET /movies?is_showing=true

In the event where `is_showing=true` is provided, the route return _only those movies where the movie is currently showing in theaters.

### GET /movies/:movieId

This route will return a single movie by ID. The response from the server looks like the following.

```json
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}
```

### GET /movies/:movieId (incorrect ID)

If the given ID does not match an existing movie, a response like the following will be returned with `404` status code:

```json
{
  "error": "Movie cannot be found."
}
```

### GET /movies/:movieId/theaters

This route will return all the `theaters` where the movie is playing. This checks
the `movies_theaters` table.

The response from the server for a request to `/movies/1/theaters` should look like the following.

```json
{
  "data": [
    {
      "theater_id": 2,
      "name": "Hollywood Theatre",
      "address_line_1": "4122 NE Sandy Blvd.",
      "address_line_2": "",
      "city": "Portland",
      "state": "OR",
      "zip": "97212",
      "created_at": "2021-02-23T20:48:13.342Z",
      "updated_at": "2021-02-23T20:48:13.342Z",
      "is_showing": true,
      "movie_id": 1
    }
    // ...
  ]
}
```

### GET /movies/:movieId/reviews

This route will return all the `reviews` for the movie, including all the `critic` details added to a `critic` key of the review.

The response from the server for a request to `/movies/1/reviews` will look like the following.

```json
{
  "data": [
    {
      "review_id": 1,
      "content": "Lorem markdownum ...",
      "score": 3,
      "created_at": "2021-02-23T20:48:13.315Z",
      "updated_at": "2021-02-23T20:48:13.315Z",
      "critic_id": 1,
      "movie_id": 1,
      "critic": {
        "critic_id": 1,
        "preferred_name": "Chana",
        "surname": "Gibson",
        "organization_name": "Film Frenzy",
        "created_at": "2021-02-23T20:48:13.308Z",
        "updated_at": "2021-02-23T20:48:13.308Z"
      }
    }
    // ...
  ]
}
```

### DELETE /reviews/:reviewId

The server will respond with `204 No Content`.

### DELETE /reviews/:reviewId (incorrect ID)

If the given ID does not match an existing review, a `404` status code and the following will be returned:

```json
{
  "error": "Review cannot be found."
}
```

### PUT /reviews/:reviewId

A body like the following can be passed along with the request:

```json
{
  "score": 3,
  "content": "New content..."
}
```

The response will include the entire review record with the newly patched content, and the critic information set to the `critic` property.

```json
{
  "data": {
    "review_id": 1,
    "content": "New content...",
    "score": 3,
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z",
    "critic_id": 1,
    "movie_id": 1,
    "critic": {
      "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z"
    }
  }
}
```

### PUT /reviews/:reviewId (incorrect ID)

If the given ID does not match an existing review, a response like the following will be returned with `404` as the status code:

```json
{
  "error": "Review cannot be found."
}
```

### GET /theaters

This route will return all the `theaters` and, the movies playing at each theatre added to the `movies` key. This checks the `movies_theaters` table.

The response from the server will look like the following.

```json
{
  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        // ...
      ]
    }
    // ...
  ]
}
```
