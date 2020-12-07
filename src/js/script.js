document.addEventListener("DOMContentLoaded", function() {


    let connexion = new MovieDb();      //1h28min43sec


    if(document.location.pathname.search("fiche-film.html") > 0) {
        let params = new URL(document.location).searchParams;
        console.log(params);
        connexion.requeteInfoFilm(params.get("id"));


    }
    else {

        connexion.requeteDernierFilm();     //la requete html de la fonction "requeteDernierFilm" a été apelé

    }

    console.log(document.location.pathname.search("fiche-film.html"));


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

        let section = document.querySelector(".liste-films");
        console.log(section);

        for (let i = 0; i < this.totalnbFilm; i++) {     //une boucle va être créer pour chercher les informations des films
            //console.log(data[i].title);     //Les titres des films seront affiché dans la console
            //console.log(data[i].overview);    //Les descriptions des films seront affiché dans la console, il en manque parceque la langue choisie est en fr-CA
            let article = document.querySelector(".template .film").cloneNode(true);    //sert à cloner les articles qui a la classe template
            //console.log(article);

            article.querySelector("h2").innerHTML = data[i].title;

             if(data[i].overview != "") {

                article.querySelector(".description").innerHTML = data[i].overview;

            } else {

                article.querySelector(".description").innerHTML = "Aucune information n'est disponible";

            }

            let image = article.querySelector("img");
             image.src = this.imgPath + "w300" + data[i].poster_path;
            //console.log(this.imgPath + "w300" + data[i].poster_path);
            image.alt = data[i].title;

            article.querySelector("a").href = "fiche-film.html?id=" + data[i].id;       //Changer le href du lien a pour ajouter le id du film


            section.appendChild(article);
        }
    }


    requeteInfoFilm(movieId) {
        let requete = new XMLHttpRequest();     //la variable nommé "requete" est défini par une nouvelle requete html
        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));     //quand l'information est chargé,
        requete.open("GET", "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=b22f9b20c68ad36893d3c8b75f29771a&language=en-US");    //dans "" mettre le request, voir dans vidéo 1h13min et plus tard dans 1h37min, sert à cherger les films dans la base de donnée dans movie db
        requete.send();    //la requete est envoyé
    }

    retourRequeteInfoFilm(event) {
        console.log("retourRequeteInfoFilm");
        let target = event.currentTarget;     //la variable target vise la requete
        //console.log(target.responseText);
        let data = JSON.parse(target.responseText);     //transformer l'écriture incompréensible en écriture claire et compréhensible, c'est-à dire en json
        console.log(data);

        this.afficherInfoFilm(data);     //appelle la fonction "afficherDernierFilm" avec la variable "data" comme parametre, cela sert à ne pas oublier les données de la variable "data" dans une autre function, c'est-à dire la fonction "afficherInfoFilm"
    }

    afficherInfoFilm(data) {

        //this.requeteActeur

        document.querySelector("h1").innerHTML = data.title;
        //Remplacer l'image

        // console.log("afficherDernierFilm");
        // console.log(data);
        //
        // let section = document.querySelector(".liste-films");
        // console.log(section);
        //
        // for (let i = 0; i < this.totalnbFilm; i++) {     //une boucle va être créer pour chercher les informations des films
        //     //console.log(data[i].title);     //Les titres des films seront affiché dans la console
        //     //console.log(data[i].overview);    //Les descriptions des films seront affiché dans la console, il en manque parceque la langue choisie est en fr-CA
        //     let article = document.querySelector(".template .film").cloneNode(true);    //sert à cloner les articles qui a la classe template
        //     //console.log(article);
        //
        //     article.querySelector("h2").innerHTML = data[i].title;
        //
        //     if(data[i].overview != "") {
        //
        //         article.querySelector(".description").innerHTML = data[i].overview;
        //
        //     } else {
        //
        //         article.querySelector(".description").innerHTML = "Aucune information n'est disponible";
        //
        //     }
        //
        //     let image = article.querySelector("img");
        //     image.src = this.imgPath + "w300" + data[i].poster_path;
        //     //console.log(this.imgPath + "w300" + data[i].poster_path);
        //     image.alt = data[i].title;
        //
        //     article.querySelector("a").href = "fiche-film.html?id=" + data[i].id;       //Changer le href du lien a pour ajouter le id du film
        //
        //
        //     section.appendChild(article);
        }

    // requetteActeur(){
    //
    //     //requete vers GET credit(moviDB)
    //
    // }
    //
    // retourRequetteActeur() {
    //
    //     //faire attention JSON.parse
    //
    // }
    //
    // afficherActeur() {
    //
    //     //boucle for et clone de div.acteur
    //
    // }

}
