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
	"ata_number" varchar(15)
);


CREATE TABLE "person" (
	"id" serial PRIMARY KEY,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"competition_id" integer REFERENCES "competition"("id")
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


--inserts 100 rows of random shooter data
INSERT INTO "shooter" ("first_name","last_name","email","phone","handicap","ata_number") VALUES ('Lance','Brewer','auctor.velit.Aliquam@Duisgravida.com','(806) 317-0271',16,'1674021105899'),('Deanna','Bradshaw','nec.luctus.felis@nonante.co.uk','(937) 115-3595',2,'1687022886999'),('Regan','Kinney','id@tellus.net','(752) 532-1802',17,'1653051394099'),('Alexander','Ward','lorem.eget@mauris.co.uk','(807) 583-1578',45,'1697030490399'),('Daniel','Mitchell','massa@gravida.ca','(264) 776-2832',47,'1613021252799'),('Chantale','Santiago','cursus.Nunc@volutpatornare.net','(544) 837-3525',6,'1637072108199'),('Reese','Cervantes','erat.vitae@elit.com','(838) 834-7165',72,'1691042007499'),('Orson','Hickman','nibh.Aliquam@mi.edu','(473) 400-7232',71,'1646092823699'),('Gretchen','Hobbs','porttitor.scelerisque@pharetra.ca','(942) 460-9872',1,'1676081821399'),('Rhonda','Morales','egestas.urna.justo@atarcu.edu','(841) 677-7369',11,'1678012722799'),('Melyssa','Guthrie','egestas.ligula@ac.net','(485) 283-6620',47,'1689062521699'),('Gail','Gamble','pede.sagittis@felisadipiscing.edu','(222) 153-5183',51,'1614112374899'),('Travis','Burt','bibendum@antelectus.com','(574) 872-9152',65,'1611041960099'),('Bruno','Lucas','nonummy.ipsum.non@adipiscingelit.com','(218) 989-9855',54,'1606122036499'),('Tobias','Flynn','malesuada@ut.org','(419) 378-6605',80,'1670081470099'),('Isadora','Mcknight','Cum.sociis@mattis.co.uk','(936) 189-9496',4,'1626092997199'),('Stacey','Dillon','eleifend.non.dapibus@arcuCurabitur.com','(966) 482-8895',26,'1645111397199'),('Erin','Haynes','ultrices.iaculis.odio@sapien.edu','(347) 112-3957',30,'1673032790399'),('Kevin','Sparks','Curabitur@inceptoshymenaeosMauris.edu','(385) 192-8427',8,'1604022075599'),('Rachel','Nguyen','cursus@antebibendumullamcorper.com','(238) 842-2790',99,'1623121954399'),('Brenna','Baxter','Sed.congue.elit@netuset.co.uk','(838) 271-2194',57,'1698031282999'),('India','Bradford','interdum.Nunc@DonecfringillaDonec.net','(454) 654-5079',99,'1608020273499'),('Maia','Santos','sit.amet.dapibus@Nullamlobortisquam.org','(129) 125-3332',66,'1681111613999'),('Illiana','Hensley','metus.Aliquam@consequatenimdiam.com','(700) 525-0772',3,'1690113026399'),('Ahmed','Glenn','placerat.eget@Donecconsectetuer.co.uk','(512) 338-7530',17,'1609072839199'),('Rhea','Morales','mauris@volutpatNulla.ca','(708) 891-7387',30,'1600072175099'),('Edward','Marsh','Quisque.purus@tinciduntnuncac.net','(249) 974-7728',47,'1603040224799'),('Brynn','Cochran','posuere.cubilia@sempertellusid.co.uk','(593) 491-9459',49,'1680081801299'),('Cameran','Jarvis','lorem@egestasrhoncusProin.org','(213) 467-1972',70,'1676061170699'),('Marcia','Graves','risus.Donec@imperdietornare.edu','(687) 210-0282',2,'1692110517799'),('Omar','Wagner','Sed.pharetra@atiaculisquis.net','(983) 588-3901',9,'1679123009099'),('Hyatt','Bryan','Quisque@ataugue.co.uk','(275) 156-6172',38,'1654121846799'),('Yuli','Decker','ridiculus.mus.Donec@at.com','(462) 487-6505',54,'1636022684499'),('Desirae','Conley','eget.venenatis@antedictum.ca','(247) 559-9495',88,'1616010502699'),('Virginia','Petersen','semper.dui.lectus@tinciduntnibh.edu','(551) 646-7657',93,'1605091780199'),('Autumn','Terry','Aliquam.ultrices@Donecconsectetuer.edu','(816) 383-5275',95,'1656071076499'),('James','Mitchell','in.faucibus@Seddiamlorem.org','(388) 375-3285',30,'1621070875599'),('Elijah','Terrell','lacus.Nulla@penatibuset.co.uk','(351) 849-0915',11,'1617021144299'),('Cadman','Clayton','erat.volutpat.Nulla@nonsapien.net','(177) 654-6762',85,'1616122603499'),('Bo','Quinn','ipsum.Donec.sollicitudin@egestasAliquamfringilla.ca','(526) 519-4543',74,'1654011864299'),('Allen','Booth','nulla.In@consequatnecmollis.org','(452) 387-1491',25,'1677091676399'),('Herman','Chen','vel.turpis@blandit.org','(708) 801-6227',49,'1618040717599'),('Vaughan','Compton','pede@amet.net','(731) 795-0673',38,'1677092838899'),('Ira','Fletcher','odio.Nam.interdum@mauris.org','(974) 901-6738',54,'1603120465399'),('Jaime','Dejesus','feugiat@Duisami.net','(792) 558-1491',69,'1658102111499'),('Jack','Hinton','nibh.Phasellus.nulla@malesuadavel.edu','(513) 601-5525',78,'1633091812699'),('Kato','Cohen','at@Maecenas.com','(428) 621-3556',57,'1682030572299'),('Zelenia','Barnett','luctus@dictum.co.uk','(421) 609-0100',38,'1651052182399'),('August','Hicks','scelerisque.neque@ut.net','(823) 789-7895',82,'1687080834499'),('Nora','Daugherty','cursus.Integer@eget.org','(573) 205-4758',9,'1649040220299'),('Lawrence','Bond','tellus.id@placerateget.co.uk','(158) 191-5298',92,'1657111676799'),('Ocean','Langley','Quisque.libero@In.edu','(737) 336-4599',45,'1691120675199'),('Travis','Peck','natoque.penatibus@faucibusut.com','(408) 109-3769',26,'1614102227299'),('Alana','Clayton','in.felis@bibendumDonec.co.uk','(901) 998-1477',42,'1604110496999'),('Dante','Guy','sit.amet@nibhPhasellus.com','(534) 634-3996',37,'1687081593399'),('Jackson','Flowers','urna@congueelitsed.ca','(282) 869-7772',12,'1651030183499'),('Naomi','Vang','enim@Aenean.edu','(823) 559-7183',34,'1692042861599'),('Peter','Rios','egestas@purus.org','(258) 184-1470',15,'1660092135599'),('Nolan','Rush','ut.molestie@facilisis.edu','(331) 563-7648',64,'1617051152299'),('Robert','Simon','Cras.eget.nisi@posuereatvelit.com','(263) 154-3896',5,'1676070127599'),('Carissa','Allen','congue.elit.sed@mattisvelit.ca','(983) 805-0169',23,'1614090499499'),('Ross','Perkins','aliquet.sem.ut@lectuspede.co.uk','(741) 844-9460',58,'1666120984199'),('Reece','Martin','ac.ipsum@Utsagittislobortis.ca','(460) 627-2487',65,'1646072119099'),('Boris','King','at@nec.org','(250) 488-3841',58,'1635030617399'),('Judah','Shepherd','bibendum.fermentum@Aeneangravidanunc.ca','(355) 146-1708',44,'1639092501399'),('Desirae','Olsen','ut@IntegerurnaVivamus.com','(535) 349-6672',98,'1641052990399'),('Andrew','Jefferson','dignissim.magna@cubilia.edu','(651) 855-8997',62,'1663012438599'),('Maisie','Phillips','enim.Suspendisse@metusIn.net','(937) 231-4646',77,'1630072564899'),('Ryder','Huff','Donec.fringilla.Donec@consectetuerrhoncusNullam.co.uk','(469) 168-2437',2,'1616111167399'),('Cassandra','Cooper','molestie.tellus@Mauriseuturpis.net','(586) 948-2924',50,'1619081199999'),('Timothy','Dale','iaculis@neceuismodin.org','(625) 228-8101',60,'1623102004199'),('Nolan','Mcdowell','feugiat.metus.sit@hendrerit.co.uk','(772) 999-9227',17,'1657022237099'),('Irene','Evans','In@Morbinon.ca','(132) 754-2403',45,'1651020113999'),('Sarah','Maxwell','lacus@Donecfelis.ca','(921) 350-4866',69,'1631041654099'),('Coby','Willis','ac@fringillacursuspurus.ca','(714) 639-3062',18,'1653042657999'),('Nayda','Cantu','ornare.lectus@montesnasceturridiculus.net','(350) 983-5634',76,'1688081755599'),('Amal','Oneal','a@a.com','(482) 305-6800',10,'1628022603799'),('Slade','Bradshaw','id.ante.dictum@tortor.ca','(341) 752-1148',7,'1643020926999'),('Claire','Barrera','fringilla.porttitor@venenatislacus.ca','(912) 595-4926',4,'1610112761099'),('Echo','Shaw','fermentum@uteratSed.com','(945) 110-3694',1,'1640071259099'),('Davis','Baxter','eget@Donec.com','(143) 119-9686',10,'1600110253999'),('Ariel','Knight','massa.non@arcu.org','(478) 591-4394',36,'1679040577799'),('Stone','Dotson','ultrices@malesuada.org','(409) 973-2075',4,'1647081706299'),('Quincy','Mcfarland','rhoncus.Donec.est@pede.ca','(359) 405-9151',1,'1653010615199'),('Ivan','Mercado','imperdiet@semperauctorMauris.edu','(618) 664-2270',27,'1662092099999'),('Dominique','Maxwell','Mauris@estarcu.ca','(935) 473-2698',76,'1687042028599'),('Adara','Charles','mollis@ac.co.uk','(813) 741-2019',39,'1614061436699'),('Jasmine','Shepard','adipiscing.elit.Aliquam@luctussit.co.uk','(851) 946-2524',7,'1612100313899'),('Allegra','Rush','Mauris@netus.org','(218) 233-4451',71,'1677122963499'),('Piper','Lang','cursus.Nunc@Etiamvestibulum.net','(810) 530-8291',87,'1665080721799'),('Clio','Cortez','vitae@nisiCumsociis.com','(189) 734-5430',16,'1632021283699'),('Lawrence','Koch','lacinia.orci.consectetuer@maurissit.com','(743) 280-4750',58,'1687042553599'),('Slade','Mcguire','condimentum.Donec@Aeneanegetmetus.edu','(484) 881-9643',88,'1645042118399'),('Ethan','Lloyd','lacus.varius.et@fringilla.ca','(891) 457-5863',27,'1688111062399'),('Donna','Morin','dis@Integersemelit.ca','(511) 960-8925',64,'1608011524199'),('Ethan','Thompson','et.rutrum.non@Phasellusdapibusquam.com','(709) 241-5495',79,'1646110143599'),('Benedict','Castaneda','elit.pellentesque@laciniaorci.org','(652) 123-4102',24,'1696081538099'),('Harlan','Hartman','parturient.montes.nascetur@Aeneanmassa.org','(124) 988-1862',88,'1624032821999'),('Lynn','Marshall','sit.amet.risus@dolor.co.uk','(893) 441-4680',96,'1697011848599'),('Yoko','Mayo','fringilla.Donec.feugiat@arcu.org','(227) 133-5098',3,'1627041245799');


--creates a new competition with default values
INSERT INTO "competition" DEFAULT VALUES;