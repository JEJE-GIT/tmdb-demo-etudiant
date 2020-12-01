document.addEventListener("DOMContentLoaded", function() {


    let connexion = new MovieDb();      //1h28min43sec

    connexion.requeteDernierFilm();     //la requete html de la fonction "requeteDernierFilm" a été apelé

})

class MovieDb {

    constructor() {     //un constructor est obligatoire pour que une class marche
        console.log("new MovieDb()");
        this.apiKey = "c8693effdf228870f68fa5242f6638df";     //Mettre la clé API dans ""
        this.lang = "fr-CA";        //la langue prioritaire est francais-canadien
        this.baseUrl = "https://api.themoviedb.org/3";    //Mettre l'adresse url qui se trouve au début de la clé API
        this.imgPath = "https://image.tmdb.org/t/p/";    //mettre le lien des images du site, voir dans vidéo
        this.totalnbFilm = "8";     //Définir le maximum de nombre de films dans notre page, le maximum de base c'est 20
    }

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();     //la variable nommé "requete" est défini par une nouvelle requete requete html
        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));     //quand l'information est chargé,
        requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=c8693effdf228870f68fa5242f6638df&language=fr-CA&page=1");    //dans "" mettre le request, voir dans vidéo 1h13min et plus tard dans 1h37min, sert à cherger les films dans la base de donnée dans movie db
        requete.send();    //la requete est envoyé
    }

    retourRequeteDernierFilm(event) {
        console.log("retourRequeteDernierFilm");
        let target = event.currentTarget;     //la variable target vise la requete
        //console.log(target.responseText);
        let data = JSON.parse(target.responseText).results;     //transformer l'écriture incompréensible en écriture claire et compréhensible, c'est-à dire en json
        console.log(data);

        this.afficherDernierFilm(data);     //appelle la fonction "afficherDernierFilm" avec la variable "data" comme parametre, cela sert à ne pas oublier les données de la variable "data" dans une autre function, c'est-à dire la fonction "afficherDernierFilm"
    }

    afficherDernierFilm(data) {
        console.log("afficherDernierFilm");
        console.log(data);

        for (let i = 0; i < data.length; i++) {     //une boucle va être créer pour chercher les informations des films
            console.log(data[i].title);     //Les titres des films seront affiché dans la console
            console.log(data[i].overview);    //Les descriptions des films seront affiché dans la console, il en manque parceque la langue choisie est en fr-CA
        }
    }

}
