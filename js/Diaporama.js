class Diaporama{

    constructor(slider){
        this.slider = slider;
        this.continuer = true;
        this.i = 0;
        this.timeout = 0;
    }

    /**
     * Permet de changer de slide toute les 5 secondes.
     */
    changerDeSlide() {
        if (this.continuer) {
            if (this.i === 0) {
                this.slider[this.i].style.display = "block";
                this.i++;
                this.timeout = setTimeout(this.changerDeSlide.bind(this), 5000);
            }
            else if (this.i > 0 && this.i < this.slider.length) {
                this.i--;
                this.slider[this.i].style.display = "none";
                this.i++;
                this.slider[this.i].style.display = "block";
                this.i++;
                this.timeout = setTimeout(this.changerDeSlide.bind(this), 5000);
            } else {
                this.i--;
                this.slider[this.i].style.display = "none";
                this.i = 0;
                this.changerDeSlide();
            }
        }
    }

    /**
     * Permet d'arrêter le diapo.
     */
    arreterLeDiapo() {
        this.continuer = false;
        clearTimeout(this.timeout);
    }

    /**
     * Permet de remettre en marche le diapo.
     */
    continuerDiapo() {
        this.continuer = true;
        this.changerDeSlide();
    }

    /**
     * arreter ou continuer le diapo en fonction de this.continuer
     */
    arreterOuContinuerDiaporama(){
        if (this.continuer) {
            this.arreterLeDiapo();
        } else if (this.continuer === false) {
            this.continuerDiapo();
        }
    }

    /**
     * Permet d'avancer le diapo d'une slide.
     */
    afficherSlideSuivant() {
        this.arreterLeDiapo();
        this.continuerDiapo();
    }

    /**
     * Permet de revenir sur la slide précedente
     */
    afficherSlidePrecedent() {
        this.arreterLeDiapo();
        if (this.i > 1 && this.i <= this.slider.length) {
            this.i--;
            this.slider[this.i].style.display = "none";
            this.i--;
            this.slider[this.i].style.display = "block";
            this.i++;
            this.continuer = true;
            this.timeout = setTimeout(this.changerDeSlide.bind(this), 5000);
        } else if (this.i === 1) {
            this.i--;
            this.slider[this.i].style.display = "none";
            this.i = 3;
            this.slider[this.i].style.display = "block";
            this.i++;
            this.continuer = true;
            this.timeout = setTimeout(this.changerDeSlide.bind(this), 5000);
        }
    }

}

// clique sur le diapo pour arrêter ou pour continuer :
$("#diaporama").on("dblclick", function () {
    instance.arreterOuContinuerDiaporama();
});


//bouton pour avancer d'une slide :
$("#avancer").on("click", function () {
    instance.afficherSlideSuivant();
});

//bouton pour reculer d'une slide :
$("#reculer").on("click", function () {
    instance.afficherSlidePrecedent();
})

/*
Changer de diapo avec le clavier
39 c'est la flèche de droite;
37 c'est la flèche de gauche;
32 c'est la barre d'espace;
*/
$("body").on("keydown", function (e) {
    const touche = e.which; //cible la touche appuyée
    if (touche === 39) {
        instance.afficherSlideSuivant();
    } else if (touche === 37) {
        instance.afficherSlidePrecedent();
    } else if (touche === 32) {
        instance.arreterOuContinuerDiaporama();
    } else {
        console.log("cette touche n'a aucun effet " + e.which);
    }
});


//Diaporama
const instance = new Diaporama([document.getElementById("diapo1"),document.getElementById("diapo2"),document.getElementById("diapo3"),document.getElementById("diapo4")]);
instance.changerDeSlide();