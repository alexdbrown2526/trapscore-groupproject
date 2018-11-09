CREATE DATABASE "trap_score";

CREATE TABLE "competition" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL DEFAULT 'New Competition',
	"location" varchar(150) NOT NULL DEFAULT 'Anytown, USA',
	"date" DATE NOT NULL DEFAULT NOW() + INTERVAL '7 days',
	"isActive" BOOLEAN NOT NULL DEFAULT 'true'
);


CREATE TABLE "shooter" (
	"id" serial PRIMARY KEY,
	"first_name" varchar(200) NOT NULL,
	"last_name" varchar(200) NOT NULL,
	"email" varchar(200),
	"phone" varchar(200),
	"handicap" integer,
	"ata_number" integer
);


CREATE TABLE "person" (
	"id" serial PRIMARY KEY,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"competition_id" integer NOT NULL REFERENCES "competition"("id")
);


CREATE TABLE "trap" (
	"id" serial PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL
);


CREATE TABLE "event" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"competition_id" integer NOT NULL REFERENCES "competition"("id")
);


CREATE TABLE "shooter_event" (
	"id" serial PRIMARY KEY,
	"event_id" integer NOT NULL REFERENCES "event"("id"),
	"shooter_id" integer NOT NULL REFERENCES "shooter"("id")
);


CREATE TABLE "squad" (
	"id" serial PRIMARY KEY,
	"trap_id" integer NOT NULL REFERENCES "trap"("id"),
	"event_id" integer NOT NULL REFERENCES "event"("id"),
	"name" varchar(50) NOT NULL
);


CREATE TABLE "shooter_squad" (
	"id" serial PRIMARY KEY,
	"shooter_id" integer NOT NULL REFERENCES "shooter"("id"),
	"squad_id" integer NOT NULL REFERENCES "squad"("id"),
	"squad_position" integer NOT NULL
);


CREATE TABLE "score" (
	"id" serial PRIMARY KEY,
	"shooter_event_id" integer NOT NULL REFERENCES "shooter_event"("id"),
	"trap_id" integer NOT NULL REFERENCES "trap"("id"),
	"score" integer NOT NULL
);