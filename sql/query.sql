-- 1) Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre)

SELECT * FROM polyflixDB.Film WHERE title = 'Hangover';

-- 2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
-- un film a été acheté (DVD) ou visionné

SELECT DISTINCT f.idFilm, f.Genre, f.title, GREATEST(MAX(o_r.rentalDate),MAX(d_p.dateofpurchase)) AS LastDate
FROM polyflixDB.Film f
LEFT JOIN polyflixDB.DVDCopy d_c ON f.idFilm = d_c.idFilm
LEFT JOIN polyflixDB.DVDPurchase d_p ON d_p.idCopy = d_c.idCopy
LEFT JOIN polyflixDB.OnlineRental o_r ON f.idFilm = o_r.idFilm
GROUP BY f.idFilm, f.Genre, f.title
ORDER BY f.Genre, f.title;

-- 3) Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont téléchargés
-- le plus souvent. Par exemple, Amal Z est le membre qui a téléchargé le plus de
-- documentaires animaliers

select distinct mem.name, mem.email, f.genre, ren.watchCount
from polyFlixDB.film f
inner join polyflixDb.onlineRental ren on ren.idfilm = f.idFilm
inner join polyflixDb.member mem on ren.idMember = mem.idMember
where ren.watchcount = (select max(watchCount) 
						from polyflixDb.onlineRental
						where idFilm = ren.idFilm);
    
-- 4) Trouvez le nombre total de films groupés par réalisateur

SELECT a.name, r_a_f.idRole, COUNT(DISTINCT f.idFilm) AS number_Of_Films
    FROM polyflixDB.Film f
        LEFT JOIN polyflixDB.RoleArtistFilm r_a_f ON f.idFilm = r_a_f.idFilm
        LEFT JOIN polyflixDB.Role r ON r_a_f.idRole = r.idRole
        LEFT JOIN polyflixDB.Artist a ON r_a_f.idArtist = a.idArtist
    WHERE r.role = 'Réalisateur'
    GROUP BY a.name, r_a_f.idRole;

-- 5) Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
-- moyenne

select d_p.idMember, sum(d_c.price) as total from polyflixdb.dvdpurchase d_p
inner join polyflixdb.dvdCopy d_c on d_c.idCopy = d_p.idCopy
group by d_p.idMember
HAVING sum(d_c.price) >=
(
	SELECT AVG(inner_table.sums)
	FROM
	(
		select sum(d_c.price) as sums from polyflixdb.dvdpurchase d_p
		inner join polyflixdb.dvdCopy d_c on d_c.idCopy = d_p.idCopy
		group by d_p.idMember
	) as inner_table
);
-- 6) Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
-- téléchargements

select distinct f.idFilm, f.title, (
	select count(*) from polyflixdb.DVDPurchase d_p
	inner join polyflixdb.DVDCopy d_c on d_p.idCopy = d_c.idCopy
	where d_c.idFilm = f.idFilm
)as number_of_purchase,
COALESCE(
	(select sum(ren.watchCount) from polyflixdb.onlineRental ren
	where ren.idFilm = f.idFilm)
,0)as number_of_rental
from polyflixdb.film f
group by f.idFilm, f.title
order by f.idFilm;

    
-- 7) Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
-- qui ont été téléchargés plus de 10 fois

SELECT DISTINCT f.idFilm, f.title, d_c.price
FROM polyflixdb.film f
INNER JOIN polyflixdb.DVDCopy d_c ON d_c.idCopy = f.idFilm
WHERE (
		SELECT COUNT(*) FROM polyflixdb.DVDPurchase d_p
		INNER JOIN polyflixdb.DVDCopy d_c ON d_p.idCopy = d_c.idCopy
		WHERE d_c.idFilm = f.idFilm
	) = 0
AND 
	COALESCE(
		(SELECT SUM(ren.watchCount) FROM polyflixdb.onlineRental ren
		WHERE ren.idFilm = f.idFilm)
	,0) >=10
GROUP BY f.idFilm, f.title, d_c.price
ORDER BY f.idFilm;

-- 8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont téléchargés
-- le plus souvent (soit plus que la moyenne)
SELECT ren.watchCount, a.name, a.birthDate
    FROM polyflixDB.OnlineRental ren
        full outer join polyflixDB.RoleArtistFilm  raf ON ren.idFilm = raf.idFilm
        FULL OUTER JOIN polyflixDB.Artist a ON raf.idArtist = a.idArtist
        FULL OUTER JOIN polyflixDB.Role r ON raf.idRole = r.idRole
    WHERE ren.watchCount > (SELECT AVG(watchCount) AS AVGCOUNT FROM polyflixDB.OnlineRental) AND r.role = 'Acteur'
    ORDER BY ren.watchCount DESC;

--9) Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
--de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
--films qui ont été nominés aux oscars. 
SELECT a.name, t_max.max_times
    FROM ( 
		SELECT MAX(number_of_time) AS max_times FROM (SELECT COUNT(idFilm) AS number_of_time FROM polyflixdb.oscarnomination
		GROUP BY idFilm) AS total_times
	)  t_max, polyflixDB.RoleArtistFilm RAF
    FULL OUTER JOIN polyflixDB.Artist A ON RAF.idArtist = A.idArtist
    FULL OUTER JOIN polyflixDB.Role R ON RAF.idRole = R.idRole
	
    WHERE R.role = 'Réalisateur' and
	t_max.max_times = 
	( 
		SELECT COUNT(idFilm) AS number_of_time
		FROM polyflixdb.oscarnomination o_n
		WHERE o_n.idFilm = RAF.idFilm
		GROUP BY idFilm
	)
	GROUP BY a.name, t_max.max_times;
-- 10) Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
-- n’ont jamais gagné d’oscar

-- les réalisateur qui ont gagné!!
-- 10) Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
-- n’ont jamais gagné d’oscar

select raf.idArtist, count (raf.idArtist) from polyflixdb.oscarnomination o_n
INNER JOIN polyflixdb.oscarcategory o_c on o_n.idcategory = o_c.idcategory
INNER JOIN polyflixdb.roleartistfilm raf on raf.idFilm = o_n.idFilm
INNER JOIN polyflixdb.role r on r.idRole = raf.idRole
WHERE o_n.wontheoscar = false and o_c.category = 'Meilleur réalisateur' AND r.role = 'Réalisateur'
AND raf.idArtist not in (
	select raf.idArtist from polyflixdb.oscarnomination o_n
	INNER JOIN polyflixdb.oscarcategory o_c on o_n.idcategory = o_c.idcategory
	INNER JOIN polyflixdb.roleartistfilm raf on raf.idFilm = o_n.idFilm
	INNER JOIN polyflixdb.role r on r.idRole = raf.idRole
	WHERE o_n.wontheoscar = true and o_c.category = 'Meilleur réalisateur' AND r.role = 'Réalisateur'
)GROUP BY raf.idArtist
HAVING count (raf.idArtist) =( SELECT max(times) FROM (
	select count (raf.idArtist) as times from polyflixdb.oscarnomination o_n
	INNER JOIN polyflixdb.oscarcategory o_c on o_n.idcategory = o_c.idcategory
	INNER JOIN polyflixdb.roleartistfilm raf on raf.idFilm = o_n.idFilm
	INNER JOIN polyflixdb.role r on r.idRole = raf.idRole
	WHERE o_n.wontheoscar = false and o_c.category = 'Meilleur réalisateur' AND r.role = 'Réalisateur'
	AND raf.idArtist not in (
		select raf.idArtist from polyflixdb.oscarnomination o_n
		INNER JOIN polyflixdb.oscarcategory o_c on o_n.idcategory = o_c.idcategory
		INNER JOIN polyflixdb.roleartistfilm raf on raf.idFilm = o_n.idFilm
		INNER JOIN polyflixdb.role r on r.idRole = raf.idRole
		WHERE o_n.wontheoscar = true and o_c.category = 'Meilleur réalisateur' AND r.role = 'Réalisateur'
	)GROUP BY raf.idArtist ) tl );

-- 11) Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
-- réalisateurs et leurs acteurs ;

select f.title, f.dateProd, count(o_n.idFilm),a.name, r.role as number_of_time from polyflixdb.oscarnomination o_n
INNER JOIN polyflixdb.oscarceremony o_c on o_c.idceremony = o_n.idceremony
INNER JOIN polyflixdb.film f on f.idFilm = o_n.idFilm
LEFT JOIN polyflixdb.roleartistfilm raf on raf.idFilm = o_n.idFilm
LEFT JOIN polyflixdb.role r on r.idrole = raf.idrole
LEFT JOIN polyflixdb.artist a on a.idartist = raf.idartist
WHERE o_n.wontheoscar = true AND r.role in ('Acteur', 'Réalisateur')
GROUP BY o_n.idFilm, f.title, f.dateProd, r.role,a.name
having count(o_n.idFilm) = (
select max(number_of_time) from ( select count(o_n.idFilm)as number_of_time from polyflixdb.oscarnomination o_n
WHERE o_n.wontheoscar = true
GROUP BY o_n.idFilm) tl
);

-- 12) Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
-- films ?
SELECT Artist_1,Artist_2, Number_of_times  FROM (
	select Artist1 as Artist_1, Artist2 as Artist_2, count(Artist1) Number_of_times from 
		(select distinct
			raf2.idfilm,
			CASE WHEN a1.name > a2.name THEN a1.name ELSE a2.name END as Artist1,
			CASE WHEN a1.name > a2.name THEN a2.name ELSE a1.name END as Artist2
		FROM polyflixdb.roleartistfilm raf1
		INNER JOIN polyflixdb.artist a1 on a1.idArtist = raf1.idartist, polyflixdb.roleartistfilm raf2
		INNER JOIN polyflixdb.artist a2 on a2.idArtist = raf2.idartist
		WHERE a1.gender = 'F' and a2.gender ='F' and a1.origin = 'Canada' and a2.origin = 'Canada' and a1.idArtist <> a2.idArtist and raf1.idfilm = raf2.idfilm
		ORDER BY raf2.idfilm) inner_inner_table
		GROUP BY artist1, artist2
	) inner_table
	WHERE Number_of_times = (SELECT max(Number_of_times)  FROM (
	select Artist1 as Artist_1, Artist2 as Artist_2, count(Artist1) Number_of_times from 
		(select distinct
			raf2.idfilm,
			CASE WHEN a1.name > a2.name THEN a1.name ELSE a2.name END as Artist1,
			CASE WHEN a1.name > a2.name THEN a2.name ELSE a1.name END as Artist2
		FROM polyflixdb.roleartistfilm raf1
		INNER JOIN polyflixdb.artist a1 on a1.idArtist = raf1.idartist, polyflixdb.roleartistfilm raf2
		INNER JOIN polyflixdb.artist a2 on a2.idArtist = raf2.idartist
		WHERE a1.gender = 'F' and a2.gender ='F' and a1.idArtist <> a2.idArtist and raf1.idfilm = raf2.idfilm
		ORDER BY raf2.idfilm) inner_inner_table
		GROUP BY artist1, artist2
	) inner_table);
	
-- 13) Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
-- film (réalisateur, acteur, etc.) du plus ancien au plus récent)

SELECT f.title, f.dateProd, r.role FROM polyflixdb.roleartistfilm raf 
INNER JOIN polyflixdb.artist a ON a.idartist = raf.idartist
INNER JOIN polyflixdb.role r ON r.idrole = raf.idRole
INNER JOIN polyflixdb.film f ON f.idFilm = raf.idFilm
WHERE a.name = 'Woody Allen'
ORDER BY f.dateProd;
