$(document).ready(function() {

    /**
     * Permet de trouver la station qui correspond a l'id du feature
     * @param {number} idFeature - l'id du feature
     */
    function renvoyerStationCorrespondanteAId(idFeature) {
        for (let i = 0; i < tableauStations.length; i++) {
            //recherche
            if (idFeature === tableauStations[i].identifiant) {
                return tableauStations[i]
            }
        }
    }

    //Instance de la Map
    const instanceMap = new Map();
    instanceMap.cursorPointer(event)
    let stationCorrespondante;

    const tableauStations = [];//tableau pour contenir les stations(objet)
    let station;
    creationStationEtPoint(tableauStations);

    /**
     * Permet de creer un objet class pour chaque station et des les mettre dans un tableau
     */
    function creationStationEtPoint(tableau) {

        $.get("https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=7c72847cd6266c6ed07ffee6ed677e352dd94aa0", function (data) {

            for (let i = 0; i < data.length; i++) {

                let pasAdresse;

                if(data[i].address == ""){
                    pasAdresse = "Pas d'adresse disponible";
                }else{
                    pasAdresse = data[i].address;
                }

                station = new Station(
                    data[i].number, //number
                    pasAdresse, //address
                    data[i].position.longitude, //longitude
                    data[i].position.latitude, //latitude
                    i, //identifiant
                    data[i].totalStands.capacity, //nombrePlace
                    data[i].status, //status
                    data[i].totalStands.availabilities.bikes, //nombreVelo
                    data[i].totalStands.availabilities.stands, //placeDisponnible
                    data[i].banking //borneDePaiement
                )

                tableau.push(station);
            }

            const tableauDeFeatures = instanceMap.creerTableauDeFeatures(tableauStations);//creer et rempli un tableau de features correspondant a chaque stations
            instanceMap.addLayer(tableauDeFeatures) // place les features grace au addlayer

        })

        .fail(function (error) {
            alert("erreur API : " + error);
        });
    }
    
    instanceMap.onClickFeature(function(idDuFeature){
        stationCorrespondante = renvoyerStationCorrespondanteAId(idDuFeature); //Permet de trouver la station qui correspond a l'id du feature
        station.afficherInformationUtilisateur(stationCorrespondante);
    })
    
    ////reservation
    const inputPrenom = $("#prenom");
    const inputNom = $("#nom");
    const reservationPrenom = $("#reservation--prenom");
    const reservationNom = $("#reservation--nom");

    /**
     * Permet de remplir la valeur d'un champs avec une valeur dans le localStorage
     * @param {string} nomInput - le nom de l'input
     * @param {string} nomItem 
     * @param {string} champsARemplir - l'endroit que l'on va remplir avec la valeur
     */
    function remplirInputAvecItem (nomInput,nomItem,champsARemplir){
        if (localStorage.getItem(nomItem)) {
            nomInput.val(localStorage.getItem(nomItem));//remplir champs de l'input
            champsARemplir.html(localStorage.getItem(nomItem));//remplir texte de reservation
        }
    }

    codeRemplissageInputNomPrenom();

    /**
     * encadre le code de remplissage de l'input nom et prenom
     */
    function codeRemplissageInputNomPrenom (){
        remplirInputAvecItem(inputPrenom,"prenom",reservationPrenom);
        remplirInputAvecItem(inputNom,"nom",reservationNom);    
    }
    
    //creer le message de reservation
    const reservationParagraphe = $("#reservation--paragraphe")
    const reservationStation = document.getElementById("reservation--station");
    const reservationErreur = $("#reservation-erreur");
    const divCanvas = $("#formulaire-body-canvas");

    
    //modal pour faire apparaître la signature    
    $("#formulaire").on("submit", function(event){

        //reinitialise le message d'erreur
        reservationErreur.html("");
        
        //Mise en place des valeurs des inputs nom et prenom dans localstorage
        localStorage.setItem("prenom",inputPrenom.val());
        localStorage.setItem("nom",inputNom.val());
        codeRemplissageInputNomPrenom();

        //submit du formulaire
        event.preventDefault();
        
        //gestion des erreurs d'étapes de réservation du visiteur
        if (inputPrenom.val() == "" || inputNom.val() == "" || stationCorrespondante == undefined) {
            console.log("cas 1");
            reservationErreur.css("display", "block");
            return reservationErreur.html("Réservation impossible <br> Veuillez suivre cette logique d'étape : <br> 1) Choisissez une station <br> 2) Remplissez les champs de réservation ")
        } else if (stationCorrespondante.nombreVelo == 0) {
            console.log("cas 2");
            reservationErreur.css("display", "block");
            return  reservationErreur.html("Réservation impossible <br> Plus de vélo disponnible dans cette station.");
        } else if (stationCorrespondante.status === "CLOSED") {
            console.log("cas 3");
            reservationErreur.css("display", "block");
            return  reservationErreur.html("Réservation impossible <br> La station choisie est fermée");
        } else {
            divCanvas.css("visibility", "visible");//afficher la modal
        }
    });

    //fermer la modal
    const boutonFermer = $("#fermer");

    boutonFermer.on("click",function(){
        divCanvas.css("visibility", "hidden");
    })

    //objet session storage de string a object
    if(sessionStorage.getItem("stationReservation")){
        const getStationString = sessionStorage.getItem("stationReservation");
        const parseStation = JSON.parse(getStationString);
        reservationParagraphe.css("display", "block");
        reservationStation.innerHTML = parseStation.adresse;
        instanceMinuteur.reinitialiserReservation(sessionStorage.getItem("tempsRestantReservation"));//Relance le comtpe a rebours avec la valeur de session storage
    }


    //cliquer pour reserver
    $("#reserver").on("click", function (e) {
        e.preventDefault();

        //Permet de voir si la position de x ou y est differente de 0 ou pas.
        let utiliserCanva = instanceCanva.testChangementPositionXY();

        if(utiliserCanva === false){

            //faire disparaitre la modal
            divCanvas.css("visibility", "hidden");

            //gestion de la non signature du visiteur
            reservationErreur.css("display", "block");
            return reservationErreur.html("Réservation impossible <br> veuillez signer dans l'encadrement");

        }else{
            //faire apparaître la phrase de réservation
            reservationParagraphe.css("display", "block");

            //faire disparaitre la modal
            divCanvas.css("visibility", "hidden");
    
            //création de l'objet de réservation :
            const stationReservation = new InformationReservation(
                localStorage.getItem("nom"),
                localStorage.getItem("prenom"),
                station.adresse.innerHTML,
                station.etatStation.innerHTML,
                parseInt(station.place.innerHTML),
                parseInt(station.veloDisponibles.innerHTML),
                parseInt(station.placesDisponibles.innerHTML),
                station.bornePaiement.innerHTML,
            )

            stationReservation.metObjetDansSessionStorage(stationReservation);
            
            //affiche l'adresse de la station dans le texte en dessous de la carte
            reservationStation.innerHTML = stationReservation.adresse;

            //lance le minuteur
            instanceMinuteur.reinitialiserReservation(1200);
        }

    })
});
