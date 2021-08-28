exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.increments("movies_theaters_id").primary(); // sets movies_theaters_id as the primary key
    table.boolean("is_showing");
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table.integer("theater_id").unsigned().notNullable();
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};