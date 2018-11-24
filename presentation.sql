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
    "competition_id" integer REFERENCES "competition"("id")
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

INSERT INTO "shooter" ("first_name","last_name","email","phone","handicap","ata_number")
VALUES
    ('Lance','Brewer','auctor.velit.Aliquam@Duisgravida.com','8063170271',16,1674021),
    ('Deanna','Bradshaw','nec.luctus.felis@nonante.co.uk','9371153595',18,1687022),
    ('Regan','Kinney','id@tellus.net','7525321802',17,1653051),
    ('Alexander','Ward','lorem.eget@mauris.co.uk','8075831578',18,1697030),
    ('Daniel','Mitchell','massa@gravida.ca','2647762832',16,1613021),
    ('Chantale','Santiago','cursus.Nunc@volutpatornare.net','5448373525',21,1637072),
    ('Reese','Cervantes','erat.vitae@elit.com','8388347165',21,1691042),
    ('Orson','Hickman','nibh.Aliquam@mi.edu','4734007232',23,1646092),
    ('Gretchen','Hobbs','porttitor.scelerisque@pharetra.ca','9424609872',24,1676081),
    ('Rhonda','Morales','egestas.urna.justo@atarcu.edu','8416777369',22,1678012),
    ('Melyssa','Guthrie','egestas.ligula@ac.net','4852836620',25,2521699),
    ('Gail','Gamble','pede.sagittis@felisadipiscing.edu','2221535183',25,2374899),
    ('Travis','Burt','bibendum@antelectus.com','5748729152',24,1960099),
    ('Bruno','Lucas','nonummy.ipsum.non@adipiscingelit.com','2189899855',25,1606122),
    ('Tobias','Flynn','malesuada@ut.org','4193786605',24,1670081),
    ('Isadora','Mcknight','Cum.sociis@mattis.co.uk','9361899496',27,1626092),
    ('Jackson','Flowers','urna@congueelitsed.ca','2828697772',27,1651030),
    ('Naomi','Vang','enim@Aenean.edu','8235597183',27,1692042),
    ('Peter','Rios','egestas@purus.org','2581841470',26,1660092),
    ('Nolan','Rush','ut.molestie@facilisis.edu','3315637648',26,1617051);

	
	


	*/