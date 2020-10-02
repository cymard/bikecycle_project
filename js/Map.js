class Map{
    constructor(){
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: new ol.proj.fromLonLat([4.85, 45.75]),
                zoom: 14,
                minZoom: 10
            })
        });
    }

    /**
     * ajoute au layer de la map le tableau rempli de features
     * @param {array} tableau - tableau rempli de features
     */
    addLayer(tableau){
        this.map.addLayer(
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: tableau
                })
            })
        )
    }

    // lorsque l'on clique sur un point cela affiche le feature et son id 
    onClickFeature(callback){
        let that = this.map;
        that.on('click', function (event) {
            let idDuFeature;
            if (that.hasFeatureAtPixel(event.pixel) === true) {
                that.forEachFeatureAtPixel(event.pixel, function (feature) {
                    idDuFeature = feature.values_.id;
                })
                callback(idDuFeature)
            }

        });
    }

    /**
     * Permet de changer le curseur de la souris lorsque l'on est sur un point
     */
    cursorPointer(event){
        let that = this.map;
        that.on('pointermove', function(event) {
            if (that.hasFeatureAtPixel(event.pixel)) {
                that.getViewport().style.cursor = 'pointer';
            } else {
                that.getViewport().style.cursor = 'inherit';
            }
        });
    }

    /**
     * Permet de creer un point sur la map
     * @param {number} longitude - la longitude du point
     * @param {number} latitude - la latitude du point
     * @param {number} identifiant - l'identifiant
     */
    creerFeature(longitude,latitude,identifiant){
        return new ol.Feature({
            geometry: new ol.geom.Point(new ol.proj.fromLonLat([longitude,latitude])),
            id: identifiant
        })
    }

    /**
     * permet de creer un feature pour chacunes des stations et de les push dans un tableau
     */
    creerTableauDeFeatures(tableau){
        const tableauDeFeatures = [];
        for(let i=0;i<tableau.length;i++){
            tableauDeFeatures.push(this.creerFeature(tableau[i].longitude,tableau[i].latitude,tableau[i].identifiant));  
        }
        return tableauDeFeatures;
    }

}