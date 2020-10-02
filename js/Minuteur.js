class Minuteur {
    constructor(){
        this.secondes;
        this.appel;  
        this.reservationErreur = $("#reservation-erreur");
        this.reservationTemps = $("#reservation--temps");
    }


    /**
     * Permet d'initialiser ou de réinisialiser une réservation de vélo.
     */
    reinitialiserReservation(nombreSeconde) {
        this.secondes = nombreSeconde;
        clearTimeout(this.appel);
        this.activerMinuteur();     
    }

    /**
     * Permet de lancer le compte à rebours de 20 min.
     */
    activerMinuteur() {
        if (this.secondes > 0) {
            this.secondes--;
            sessionStorage.setItem("tempsRestantReservation",this.secondes);//met a jour les secondes dans le session storage
            const secondesVisiblent = this.secondes % 60;
            const minutes = Math.floor(this.secondes / 60);
            this.reservationTemps.html(minutes + "min " + secondesVisiblent + "sec")
            this.appel = setTimeout(this.activerMinuteur.bind(this), 1000)
        } else {
            clearTimeout(this.appel);
            this.reservationErreur.css("display", "block");
            this.reservationErreur.html("Minuteur est arrivé a terme, votre réservation a été annulée");
        }
    }


}

const instanceMinuteur = new Minuteur();








