-- Ici on obtiendrait la distance entre l'adresse de livraison et Polytechnique (d'où on enverrait les DVDs)
-- dans notre application avec l'API de Google tel que présenté ici:
-- https://developers.google.com/maps/documentation/distance-matrix/intro
-- Ensuite, on détermine un prix par kilomètre pour la livraison, arbitraire.
-- On insère dans la table DVDDelivery de notre schéma le résultat du calcul distance * cost_per_km.

DROP TRIGGER IF EXISTS calculate_cost_trigger ON POLYFLIXDB.DVDPurchase CASCADE;

DROP FUNCTION IF EXISTS calculate_cost;

-- Valeur arbitraire...
DECLARE cost_per_km NUMERIC (10,7) DEFAULT 0.2500000;

CREATE FUNCTION calculate_cost(distance float, cost float) RETURNS trigger AS $purchase$
BEGIN
INSERT INTO POLYFLIXDB.DVDDelivery (idPurchase,deliveryDate,cost) values (NEW.idPurchase,current_timestamp,
    distance * cost_per_km);
UPDATE POLYFLIXDB.DVDPurchase SET isDelivered=true WHERE idPurchase = NEW.idPurchase;
RETURN NEW;
END;
$purchase$ LANGUAGE plpgsql;

--
CREATE TRIGGER calculate_cost_trigger
AFTER INSERT
ON POLYFLIXDB.DVDPurchase
FOR EACH ROW
EXECUTE FUNCTION calculate_cost ();

--INSERT INTO POLYFLIXDB.DVDPurchase (idCopy, dateOfPurchase,idCreditCard,idMember,isDelivered) VALUES (2,'2020-03-15',3,3,false);
			

--select * from  POLYFLIXDB.DVDDelivery;
--select * from  POLYFLIXDB.DVDPurchase;
