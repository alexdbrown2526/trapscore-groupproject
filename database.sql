-- These are for clearing out data for testing

DROP TABLE "competition" CASCADE;
DROP TABLE "shooter" CASCADE;
DROP TABLE "person" CASCADE;
DROP TABLE "trap" CASCADE;
DROP TABLE "event" CASCADE;
DROP TABLE "shooter_event" CASCADE;
DROP TABLE "squad" CASCADE;
DROP TABLE "squad_trap" CASCADE;
DROP TABLE "score" CASCADE;


-- Database name is "trap_score"

CREATE TABLE "competition" (
    "id" serial PRIMARY KEY,
    "name" varchar(100) NOT NULL UNIQUE,
    "location" varchar(150) NOT NULL DEFAULT 'Anytown, USA',
    "date" DATE NOT NULL DEFAULT NOW() + INTERVAL '7 days',
    "isActive" BOOLEAN NOT NULL DEFAULT 'true',
	"secret_url" varchar(255)
);


CREATE TABLE "shooter" (
    "id" serial PRIMARY KEY,
    "first_name" varchar(200) NOT NULL,
    "last_name" varchar(200) NOT NULL,
    "email" varchar(200),
    "phone" varchar(15),
    "handicap" integer,
    "ata_number" integer
);


CREATE TABLE "person" (
    "id" serial PRIMARY KEY,
    "username" varchar(80) NOT NULL UNIQUE,
    "password" varchar(1000) NOT NULL,
    "competition_id" integer REFERENCES "competition"("id"),
		"is_admin" boolean NOT NULL DEFAULT 'false'
);


CREATE TABLE "trap" (
    "id" serial PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "competition_id" integer REFERENCES "competition"("id")
);


CREATE TABLE "event" (
    "id" serial PRIMARY KEY,
    "name" varchar(100) NOT NULL,
    "competition_id" integer NOT NULL REFERENCES "competition"("id")
);

CREATE TABLE "squad" (
    "id" serial PRIMARY KEY,
    "event_id" integer NOT NULL REFERENCES "event"("id"),
    "name" varchar(50) NOT NULL DEFAULT 'New Squad'
);

CREATE TABLE "shooter_event" (
    "id" serial PRIMARY KEY,
    "event_id" integer NOT NULL REFERENCES "event"("id"),
    "shooter_id" integer NOT NULL REFERENCES "shooter"("id"),
		"squad_id" integer REFERENCES "squad"("id"),
		"post_position" INTEGER
);

CREATE TABLE "squad_trap" (
  "id" serial PRIMARY KEY,
  "squad_id" integer NOT NULL REFERENCES "squad"("id"),
  "trap_id" integer REFERENCES "trap"("id"),
  "box_number" integer,
  "place_in_line" integer,
	"current_rotation" integer DEFAULT 1
);


CREATE TABLE "score" (
    "id" serial PRIMARY KEY,
    "shooter_event_id" integer NOT NULL REFERENCES "shooter_event"("id"),
    "squad_trap_id" integer REFERENCES "squad_trap"("id"),
    "score" integer NOT NULL
);

