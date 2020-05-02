SET search_path = POLYFLIXDB;

INSERT INTO POLYFLIXDB.Admin (username, password, name)	VALUES ('admin','2e79bd9751aed841f42f52263d7fb6aa:1b77c4ffa6ad6456ee0cee005ba838ae','Administrateur');
	
-- INSERT INTO POLYFLIXDB.Genre (genre) VALUES ('Thriller');	
-- INSERT INTO POLYFLIXDB.Genre (genre) VALUES ('Science-fiction');	
-- INSERT INTO POLYFLIXDB.Genre (genre) VALUES ('Action');	
-- INSERT INTO POLYFLIXDB.Genre (genre) VALUES ('Aventure');	
-- INSERT INTO POLYFLIXDB.Genre (genre) VALUES ('Comédie');

INSERT INTO POLYFLIXDB.Film	(title, dateProd, duration, genre, youtubeid) VALUES ('Star Wars épisode IV', '1977-05-25', 121, 'Science-fiction', 'QsQYrW0Cc5Y');
INSERT INTO POLYFLIXDB.Film	(title, dateProd, duration, genre, youtubeid) VALUES	('Hangover', '2009-06-05', 100,'Comédie','IkdmOVejUlI');
INSERT INTO POLYFLIXDB.Film	(title, dateProd, duration, genre, youtubeid) VALUES ('Le Seigneur des anneaux : La Communauté de l''anneau', '2001-12-19', 178, 'Aventure', 'G1IbRujko-A');
INSERT INTO POLYFLIXDB.Film	(title, dateProd, duration, genre, youtubeid) VALUES ('Le Seigneur des anneaux : Les Deux Tours', '2002-12-18', 179, 'Aventure', 'G1IbRujko-A');
INSERT INTO POLYFLIXDB.Film	(title, dateProd, duration, genre, youtubeid) VALUES ('Titanic', '1997-11-18', 194, 'Drame','4xwKTrI98yc');
			
INSERT INTO POLYFLIXDB.Address (address, city, postalCode, province, country) VALUES ('10 grand-fort','Montréal','k3d4d4','QC','Canada');
INSERT INTO POLYFLIXDB.Address (address, city, postalCode, province, country) VALUES ('123 jacques','Gatineau','g2f3d4','QC','Canada');
INSERT INTO POLYFLIXDB.Address (address, city, postalCode, province, country) VALUES ('3445 Papineau','Joliette','h3e4k5','QC','Canada');
INSERT INTO POLYFLIXDB.Address (address, city, postalCode, province, country) VALUES ('12 Bernard','Québec','k4j4k5','QC','Canada');
			
INSERT INTO POLYFLIXDB.Member (email, password, idAddress, subType, name) VALUES ('bobo@hotmail.com','d415f390eb8fecbdd0829f4408ea2e35:93bb39bcda70ea89e483284dfcabb355',1,'PPV', 'Bernard');
INSERT INTO POLYFLIXDB.Member (email, password, idAddress, subType, name) VALUES ('tommy@hotmail.com','efb31ac268aa963c4ec4e3666d027ec2:7cb560eaa5205d55d80b9d2e8958dcb4',2,'PPV', 'Tommy');
INSERT INTO POLYFLIXDB.Member (email, password, idAddress, subType, name) VALUES ('ben@hotmail.com','79b6b088f80c727b07ee045aa4e9699b:8522d59b232780897ab456abbbf24bc9',3,'MTH', 'Benoit');
INSERT INTO POLYFLIXDB.Member (email, password, idAddress, subType, name) VALUES ('toto@hotmail.com','555c87fc0d335947e620837575d08312:ee63604d2b64cbb5a7c7e2eef7214ac5',4,'MTH', 'Titi9');
			
INSERT INTO POLYFLIXDB.CreditCard (number, holder, expDate, CCV, idMember) VALUES (1234567890123456,'Benoit Charles', '2022-12-12',123,1);
INSERT INTO POLYFLIXDB.CreditCard (number, holder, expDate, CCV, idMember) VALUES (1231231231231233,'Charles Pinot', '2022-10-12',321,2);
INSERT INTO POLYFLIXDB.CreditCard (number, holder, expDate, CCV, idMember) VALUES (0987654321098765,'Jacques Bernard', '2022-02-12',432,3);
INSERT INTO POLYFLIXDB.CreditCard (number, holder, expDate, CCV, idMember) VALUES (4552342345674641,'Mike Bossy', '2022-10-02',678,4);
			
INSERT INTO POLYFLIXDB.SubscriptionMTH (price, startDate, endDate, idMember) VALUES (123.23,'2020-01-01', '2021-01-01',3);
INSERT INTO POLYFLIXDB.SubscriptionMTH (price, startDate, endDate, idMember) VALUES (234.32,'2020-03-03', '2022-03-03',4);
			
INSERT INTO POLYFLIXDB.SubscriptionPPV (film_payperview, idMember) VALUES (0,1);
INSERT INTO POLYFLIXDB.SubscriptionPPV (film_payperview, idMember) VALUES (2,2);

INSERT INTO POLYFLIXDB.Role (role) VALUES ('Acteur');
INSERT INTO POLYFLIXDB.Role (role) VALUES ('Producteur');
INSERT INTO POLYFLIXDB.Role (role) VALUES ('Réalisateur');
INSERT INTO POLYFLIXDB.Role (role) VALUES ('Directeur photo');
			
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('John Snow', '1980-02-03','M','Finlande');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Woody Allen', '1999-02-03','M','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Jacques Demers', '1912-02-03','M','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Jacqueline Deschamps', '2000-01-04','F','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Samsagace Gamegie', '1990-01-04','M','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Frodon Sacquet', '1988-01-04','M','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Gandalf', '1600-01-04','M','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Jannette Bertrand', '1600-01-04','F','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Isabelle Boulay', '1600-01-04','F','Canada');
INSERT INTO POLYFLIXDB.Artist (name, birthDate, gender, origin) VALUES ('Celine', '1600-01-04','F','Canada');
			
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,1,1,1000000);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (3,2,3,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (3,2,1,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,2,1,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,2,2,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,2,3,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,2,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (2,2,1,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (2,3,3,500430);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (2,1,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,5,3,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,6,3,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,7,3,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,5,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,6,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,7,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (4,4,3,502300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (3,4,2,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (2,4,4,502300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (2,4,1,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,4,1,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (2,8,1,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (3,8,1,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,8,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,9,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (3,9,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,9,2,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,10,4,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,10,3,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,10,2,504300);
INSERT INTO POLYFLIXDB.RoleArtistFilm (idRole, idArtist, idFilm, salary) VALUES (1,10,1,504300);
			
INSERT INTO POLYFLIXDB.OscarCeremony (date, host, place) VALUES ('2010-02-02','Benoit Pouliot', 'Los-Angeles');
INSERT INTO POLYFLIXDB.OscarCeremony (date, host, place) VALUES ('2011-02-02','James Bond', 'Canton');
INSERT INTO POLYFLIXDB.OscarCeremony (date, host, place) VALUES ('2012-02-02','Mike Modano', 'Trois-Rivières');
INSERT INTO POLYFLIXDB.OscarCeremony (date, host, place) VALUES ('2013-02-02','Dave Morissette', 'Joliette');
INSERT INTO POLYFLIXDB.OscarCeremony (date, host, place) VALUES ('2014-02-02','Silvain Cossette', 'Blainville');
			
INSERT INTO POLYFLIXDB.OscarCategory (category) VALUES ('Meilleur film');
INSERT INTO POLYFLIXDB.OscarCategory (category) VALUES ('Meilleur acteur');
INSERT INTO POLYFLIXDB.OscarCategory (category) VALUES ('Meilleur réalisateur');
			
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (1,1,1,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (1,1,2,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (1,1,3,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (2,2,2,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (2,2,3,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (2,1,2,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (1,3,3,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (1,3,1,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (1,3,2,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (1,3,4,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (2,3,3,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (2,3,1,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (2,3,2,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (2,3,4,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (3,3,3,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (3,3,1,true);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (3,3,2,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (3,3,4,false);
INSERT INTO POLYFLIXDB.OscarNomination (idCeremony, idCategory,idFilm,wonTheOscar) VALUES (4,3,4,false);
			
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (1, 12.00);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (1, 12.00);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (1, 12.00);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (1, 12.00);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (2, 9.89);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (2, 9.89);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (3, 11.25);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (3, 11.25);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (4, 9.99);
INSERT INTO POLYFLIXDB.DVDCopy (idFilm, price) VALUES (4, 9.99);
			
INSERT INTO POLYFLIXDB.DVDPurchase (idCopy, dateOfPurchase,idCreditCard,idMember,isDelivered) VALUES (1,'2020-02-02',1,1,true);
INSERT INTO POLYFLIXDB.DVDPurchase (idCopy, dateOfPurchase,idCreditCard,idMember,isDelivered) VALUES (2,'2020-02-04',2,2,true);
INSERT INTO POLYFLIXDB.DVDPurchase (idCopy, dateOfPurchase,idCreditCard,idMember,isDelivered) VALUES (3,'2020-02-07',3,3,false);
INSERT INTO POLYFLIXDB.DVDPurchase (idCopy, dateOfPurchase,idCreditCard,idMember,isDelivered) VALUES (4,'2020-03-03',4,4,true);
INSERT INTO POLYFLIXDB.DVDPurchase (idCopy, dateOfPurchase,idCreditCard,idMember,isDelivered) VALUES (5,'2020-03-05',2,2,true);
INSERT INTO POLYFLIXDB.DVDPurchase (idCopy, dateOfPurchase,idCreditCard,idMember,isDelivered) VALUES (6,'2020-03-15',3,3,false);
			
INSERT INTO POLYFLIXDB.DVDDelivery (idPurchase, deliveryDate,cost) VALUES (1,'2020-02-07',123.32);
INSERT INTO POLYFLIXDB.DVDDelivery (idPurchase, deliveryDate,cost) VALUES (2,'2020-02-07',34.32);
INSERT INTO POLYFLIXDB.DVDDelivery (idPurchase, deliveryDate,cost) VALUES (4,'2020-03-17',234.32);
INSERT INTO POLYFLIXDB.DVDDelivery (idPurchase, deliveryDate,cost) VALUES (5,'2020-02-17',43.32);
			
INSERT INTO POLYFLIXDB.OnlineRental (idCreditCard, idFilm,rentalDate,idMember,currenttime, watchCount) VALUES (1,1,'2020-01-03',1,0,2);
INSERT INTO POLYFLIXDB.OnlineRental (idCreditCard, idFilm,rentalDate,idMember,currenttime, watchCount) VALUES (2,2,'2020-02-03',2,200,3);
INSERT INTO POLYFLIXDB.OnlineRental (idCreditCard, idFilm,rentalDate,idMember,currenttime, watchCount) VALUES (3,1,'2020-03-03',3,3003.2,6);
INSERT INTO POLYFLIXDB.OnlineRental (idCreditCard, idFilm,rentalDate,idMember,currenttime, watchCount) VALUES (4,3,'2020-03-13',4,5003,10);