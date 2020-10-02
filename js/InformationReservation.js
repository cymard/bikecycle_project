class InformationReservation{
    constructor(nom,prenom,adresse,etatStation,nombrePlace,VeloDisponible,placeDisponible,terminalDePaiement){
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.etatStation = etatStation;
        this.nombrePlace = nombrePlace;
        this.VeloDisponible = VeloDisponible;
        this.placeDisponible = placeDisponible;
        this.terminalDePaiement = terminalDePaiement;
    }

    /**
     * Permet de mettre un objet dans le session storage
     * @param {string} objetStation - la station sous forme d'objet           
     */
    metObjetDansSessionStorage(objetStation){
        const objetEnString = JSON.stringify(objetStation);
        sessionStorage.setItem("stationReservation", objetEnString);
    }
    
}


