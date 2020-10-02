//class constructeur pour les stations de vélo
class Station {
    constructor(number, address, longitude, latitude, identifiant, nombrePlace, status, nombreVelo, placeDisponnible, borneDePaiement) {
        this.number = number;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.identifiant = identifiant;
        this.nombrePlace = nombrePlace;
        this.status = status;
        this.nombreVelo = nombreVelo;
        this.placeDisponnible = placeDisponnible;
        this.borneDePaiement = borneDePaiement;
        
        //les paragraphes d'information sur les stations, que l'on va remplir lors du clique
        this.adresse = document.getElementById("adresse");
        this.veloDisponibles = document.getElementById("velo-disponibles");
        this.place = document.getElementById("place");
        this.etatStation = document.getElementById("etat-station");
        this.placesDisponibles = document.getElementById("place-disponibles");
        this.bornePaiement = document.getElementById("borne-paiement");

    }

    /**
     * Permet de retourner une valeur compréhensible  l'utilisateur
     */
    traduitValeurBorneDePaiement(valeurBorneDePaiement) {
        if (valeurBorneDePaiement === true) {
            return "Présence d'un terminal de paiement"
        } else {
            return "Non présence d'un terminal de paiement"
        };
    }

    /**
     * Permet de retourner une valeur compréhensible  l'utilisateur
     */
    traduitValeurVerifStatus(valeurStatus) {
        if (valeurStatus === "OPEN") {
            return "ouverte"
        } else {
            return "fermée"
        };
    }


    /**
     * Permet de remplir les champs d'information sur une station avec les valeurs de la station séléctionnée
     * @param {string} stationSelectionnee - l'objet de la station selectionnée
     */
    afficherInformationUtilisateur(stationSelectionnee) {
        this.bornePaiement.innerHTML = this.traduitValeurBorneDePaiement(stationSelectionnee.borneDePaiement);
        this.placesDisponibles.innerHTML = stationSelectionnee.placeDisponnible;
        this.etatStation.innerHTML = this.traduitValeurVerifStatus(stationSelectionnee.status);
        this.veloDisponibles.innerHTML = stationSelectionnee.nombreVelo;
        this.place.innerHTML = stationSelectionnee.nombrePlace;
        this.adresse.innerHTML = stationSelectionnee.address;
    }

    
}

