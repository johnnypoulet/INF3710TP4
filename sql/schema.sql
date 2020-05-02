SET search_path = POLYFLIXDB;

DROP SCHEMA IF EXISTS POLYFLIXDB CASCADE;
CREATE SCHEMA POLYFLIXDB;

CREATE DOMAIN POLYFLIXDB.genderType AS VARCHAR(1)
	CHECK (VALUE IN ('M', 'F'));

CREATE DOMAIN POLYFLIXDB.subscriptionType AS VARCHAR(3)
	CHECK (VALUE IN ('PPV', 'MTH'));

CREATE DOMAIN POLYFLIXDB.province AS VARCHAR(2)
	CHECK (VALUE IN ('NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU'));

CREATE TABLE IF NOT EXISTS POLYFLIXDB.Admin (
		idAdmin		SERIAL,
		username	VARCHAR(20) NOT NULL,
		password	VARCHAR(65) NOT NULL,
		name		VARCHAR(75) NOT NULL,
		PRIMARY KEY	(idAdmin)
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.Film (
		idFilm		SERIAL,
		title		VARCHAR(75)		NOT NULL,
		dateProd	DATE			NOT NULL,
		duration	NUMERIC(3,0)	NOT NULL,
		genre		VARCHAR(20),
		youtubeID 	VARCHAR(20)	NOT NULL,
		PRIMARY KEY (idFilm)
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.Address (
		idAddress	SERIAL,
		address		varchar(100) NOT NULL,
		city		varchar(100) NOT NULL,
		postalCode	VARCHAR(6)		NOT NULL,
		province	POLYFLIXDB.province	NOT NULL,
		country		VARCHAR(20) NOT NULL,
		PRIMARY KEY (idAddress)
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.Member (
		idMember	SERIAL,
		email		VARCHAR(75) 	UNIQUE NOT NULL,
		password	VARCHAR(65)		NOT NULL,
		idAddress	INTEGER,
		name		VARCHAR(50)		NOT NULL,
		subType		POLYFLIXDB.subscriptionType NOT NULL,
		PRIMARY KEY (idMember),
		FOREIGN KEY (idAddress) REFERENCES polyflixDB.Address(idAddress) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.CreditCard (
		idCreditCard SERIAL,
		number		NUMERIC(16,0)		UNIQUE NOT NULL,
		holder		VARCHAR(75)			NOT NULL,
		expDate		DATE				NOT NULL,
		CCV			NUMERIC(3,0)		NOT NULL,
		idMember	INTEGER				NOT NULL,
		PRIMARY KEY	(idCreditCard),
		FOREIGN KEY	(idMember) REFERENCES polyflixDB.Member(idMember) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.SubscriptionMTH (
		idSubMTH	SERIAL,
		price		NUMERIC(5,2)		NOT NULL,
		startDate	DATE				NOT NULL,
		endDate		DATE				NOT NULL,
		idMember	INTEGER				NOT NULL,
		PRIMARY KEY (idSubMTH),
		FOREIGN KEY	(idMember) REFERENCES polyflixDB.Member(idMember) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.SubscriptionPPV (
		idSubPPV		SERIAL,
		film_payperview	INTEGER,
		idMember		INTEGER				NOT NULL,
		PRIMARY KEY 	(idSubPPV),
		FOREIGN KEY		(idMember) REFERENCES polyflixDB.Member(idMember) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.Role (
		idRole		SERIAL,
		role		VARCHAR(20),
		PRIMARY KEY (idRole)
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.Artist (
		idArtist	SERIAL,
		name		VARCHAR(75)	NOT NULL,
		birthDate	DATE		NOT NULL,
		gender		genderType	NOT NULL,
		origin		VARCHAR(20)	NOT NULL,
		PRIMARY KEY (idArtist)
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.RoleArtistFilm (
		idRole		INTEGER			NOT NULL,
		idArtist	INTEGER			NOT NULL,
		idFilm		INTEGER			NOT NULL,
		salary		NUMERIC(10,2)	NOT NULL,
		PRIMARY KEY	(idRole, idArtist, idFilm),
		FOREIGN KEY (idRole) REFERENCES polyflixDB.Role(idRole) ON DELETE CASCADE,
		FOREIGN KEY (idArtist) REFERENCES polyflixDB.Artist(idArtist) ON DELETE CASCADE,
		FOREIGN KEY (idFilm) REFERENCES polyflixDB.Film(idFilm) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.OscarCeremony (
		idCeremony	SERIAL,
		date		DATE		NOT NULL,
		host		VARCHAR(75)	NOT NULL,
		place		VARCHAR(75)	NOT NULL,
		PRIMARY KEY (idCeremony)
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.OscarCategory (
		idCategory	SERIAL,
		category	VARCHAR(75),
		PRIMARY KEY (idCategory)
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.OscarNomination (
		idCeremony	INTEGER	NOT NULL,
		idCategory	INTEGER NOT NULL,
		idFilm		INTEGER NOT NULL,
		wonTheOscar	BOOLEAN NOT NULL,
		PRIMARY KEY	(idCeremony, idCategory, idFilm),
		FOREIGN KEY (idCeremony) REFERENCES polyflixDB.OscarCeremony(idCeremony) ON DELETE CASCADE,
		FOREIGN KEY (idCategory) REFERENCES polyflixDB.OscarCategory(idCategory) ON DELETE CASCADE,
		FOREIGN KEY (idFilm) REFERENCES polyflixDB.Film(idFilm) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.DVDCopy (
		idCopy	SERIAL NOT NULL,
		idFilm	INTEGER NOT NULL,
		price	numeric(5,2) NOT NULL,
		PRIMARY KEY (idCopy),
		FOREIGN KEY (idFilm) REFERENCES polyflixDB.Film(idFilm) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.DVDPurchase (
		idPurchase		SERIAL,
		idCopy			INTEGER NOT NULL,
		dateOfPurchase	DATE NOT NULL,
		idCreditCard	INTEGER NOT NULL,
		idMember		INTEGER NOT NULL,
		isDelivered		BOOLEAN NOT NULL,
		PRIMARY KEY (idPurchase),
		FOREIGN KEY (idCopy) REFERENCES polyflixDB.DVDCopy(idCopy) ON DELETE CASCADE,
		FOREIGN KEY (idCreditCard) REFERENCES polyflixDB.CreditCard(idCreditCard) ON DELETE CASCADE,
		FOREIGN KEY (idMember) REFERENCES polyflixDB.Member(idMember) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.DVDDelivery (
		idDelivery		SERIAL,
		idPurchase		INTEGER NOT NULL,
		deliveryDate	DATE,
		cost			NUMERIC(5,2),
		PRIMARY KEY (idDelivery),
		FOREIGN KEY (idPurchase) REFERENCES polyflixDB.DVDPurchase(idPurchase) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POLYFLIXDB.OnlineRental (
		idRental		SERIAL,
		idCreditCard	INTEGER NOT NULL,
		idFilm			INTEGER NOT NULL,
		rentalDate		DATE NOT NULL,
		idMember		INTEGER NOT NULL,
		currenttime		INTEGER,
		watchCount		INTEGER,
		PRIMARY KEY (idRental),
		FOREIGN KEY (idCreditCard) REFERENCES polyflixDB.CreditCard(idCreditCard) ON DELETE CASCADE,
		FOREIGN KEY (idFilm) REFERENCES polyflixDB.Film(idFilm) ON DELETE CASCADE,
		FOREIGN KEY (idMember) REFERENCES polyflixDB.Member(idMember) ON DELETE CASCADE
);
