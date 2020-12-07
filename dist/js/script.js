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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEYigpOyAgICAgIC8vMWgyOG1pbjQzc2VjXHJcblxyXG5cclxuICAgIGlmKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNlYXJjaChcImZpY2hlLWZpbG0uaHRtbFwiKSA+IDApIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbikuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpOyAgICAgLy9sYSByZXF1ZXRlIGh0bWwgZGUgbGEgZm9uY3Rpb24gXCJyZXF1ZXRlRGVybmllckZpbG1cIiBhIMOpdMOpIGFwZWzDqVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goXCJmaWNoZS1maWxtLmh0bWxcIikpO1xyXG5cclxuXHJcbn0pXHJcblxyXG5jbGFzcyBNb3ZpZURiIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgICAgIC8vdW4gY29uc3RydWN0b3IgZXN0IG9ibGlnYXRvaXJlIHBvdXIgcXVlIHVuZSBjbGFzcyBtYXJjaGVcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBNb3ZpZURiKClcIik7XHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcImM4NjkzZWZmZGYyMjg4NzBmNjhmYTUyNDJmNjYzOGRmXCI7ICAgICAvL01ldHRyZSBsYSBjbMOpIEFQSSBkYW5zIFwiXCJcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7ICAgICAgICAvL2xhIGxhbmd1ZSBwcmlvcml0YWlyZSBlc3QgZnJhbmNhaXMtY2FuYWRpZW5cclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzNcIjsgICAgLy9NZXR0cmUgbCdhZHJlc3NlIHVybCBxdWkgc2UgdHJvdXZlIGF1IGTDqWJ1dCBkZSBsYSBjbMOpIEFQSVxyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7ICAgIC8vbWV0dHJlIGxlIGxpZW4gZGVzIGltYWdlcyBkdSBzaXRlLCB2b2lyIGRhbnMgdmlkw6lvXHJcbiAgICAgICAgdGhpcy50b3RhbG5iRmlsbSA9IFwiOFwiOyAgICAgLy9Ew6lmaW5pciBsZSBtYXhpbXVtIGRlIG5vbWJyZSBkZSBmaWxtcyBkYW5zIG5vdHJlIHBhZ2UsIGxlIG1heGltdW0gZGUgYmFzZSBjJ2VzdCAyMFxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAgICAgLy9sYSB2YXJpYWJsZSBub21tw6kgXCJyZXF1ZXRlXCIgZXN0IGTDqWZpbmkgcGFyIHVuZSBub3V2ZWxsZSByZXF1ZXRlIHJlcXVldGUgaHRtbFxyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlRGVybmllckZpbG0uYmluZCh0aGlzKSk7ICAgICAvL3F1YW5kIGwnaW5mb3JtYXRpb24gZXN0IGNoYXJnw6ksXHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PWM4NjkzZWZmZGYyMjg4NzBmNjhmYTUyNDJmNjYzOGRmJmxhbmd1YWdlPWZyLUNBJnBhZ2U9MVwiKTsgICAgLy9kYW5zIFwiXCIgbWV0dHJlIGxlIHJlcXVlc3QsIHZvaXIgZGFucyB2aWTDqW8gMWgxM21pbiBldCBwbHVzIHRhcmQgZGFucyAxaDM3bWluLCBzZXJ0IMOgIGNoZXJnZXIgbGVzIGZpbG1zIGRhbnMgbGEgYmFzZSBkZSBkb25uw6llIGRhbnMgbW92aWUgZGJcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTsgICAgLy9sYSByZXF1ZXRlIGVzdCBlbnZvecOpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZURlcm5pZXJGaWxtKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXRvdXJSZXF1ZXRlRGVybmllckZpbG1cIik7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7ICAgICAvL2xhIHZhcmlhYmxlIHRhcmdldCB2aXNlIGxhIHJlcXVldGVcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzOyAgICAgLy90cmFuc2Zvcm1lciBsJ8OpY3JpdHVyZSBpbmNvbXByw6llbnNpYmxlIGVuIMOpY3JpdHVyZSBjbGFpcmUgZXQgY29tcHLDqWhlbnNpYmxlLCBjJ2VzdC3DoCBkaXJlIGVuIGpzb25cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpOyAgICAgLy9hcHBlbGxlIGxhIGZvbmN0aW9uIFwiYWZmaWNoZXJEZXJuaWVyRmlsbVwiIGF2ZWMgbGEgdmFyaWFibGUgXCJkYXRhXCIgY29tbWUgcGFyYW1ldHJlLCBjZWxhIHNlcnQgw6AgbmUgcGFzIG91YmxpZXIgbGVzIGRvbm7DqWVzIGRlIGxhIHZhcmlhYmxlIFwiZGF0YVwiIGRhbnMgdW5lIGF1dHJlIGZ1bmN0aW9uLCBjJ2VzdC3DoCBkaXJlIGxhIGZvbmN0aW9uIFwiYWZmaWNoZXJEZXJuaWVyRmlsbVwiXHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZmZpY2hlckRlcm5pZXJGaWxtXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGUtZmlsbXNcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbG5iRmlsbTsgaSsrKSB7ICAgICAvL3VuZSBib3VjbGUgdmEgw6p0cmUgY3LDqWVyIHBvdXIgY2hlcmNoZXIgbGVzIGluZm9ybWF0aW9ucyBkZXMgZmlsbXNcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTsgICAgIC8vTGVzIHRpdHJlcyBkZXMgZmlsbXMgc2Vyb250IGFmZmljaMOpIGRhbnMgbGEgY29uc29sZVxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0ub3ZlcnZpZXcpOyAgICAvL0xlcyBkZXNjcmlwdGlvbnMgZGVzIGZpbG1zIHNlcm9udCBhZmZpY2jDqSBkYW5zIGxhIGNvbnNvbGUsIGlsIGVuIG1hbnF1ZSBwYXJjZXF1ZSBsYSBsYW5ndWUgY2hvaXNpZSBlc3QgZW4gZnItQ0FcclxuICAgICAgICAgICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlIC5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTsgICAgLy9zZXJ0IMOgIGNsb25lciBsZXMgYXJ0aWNsZXMgcXVpIGEgbGEgY2xhc3NlIHRlbXBsYXRlXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXJ0aWNsZSk7XHJcblxyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgIGlmKGRhdGFbaV0ub3ZlcnZpZXcgIT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3O1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gXCJBdWN1bmUgaW5mb3JtYXRpb24gbidlc3QgZGlzcG9uaWJsZVwiO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aCk7XHJcbiAgICAgICAgICAgIGltYWdlLmFsdCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7ICAgICAgIC8vQ2hhbmdlciBsZSBocmVmIGR1IGxpZW4gYSBwb3VyIGFqb3V0ZXIgbGUgaWQgZHUgZmlsbVxyXG5cclxuXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXF1ZXRlSW5mb0ZpbG0obW92aWVJZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7ICAgICAvL2xhIHZhcmlhYmxlIG5vbW3DqSBcInJlcXVldGVcIiBlc3QgZMOpZmluaSBwYXIgdW5lIG5vdXZlbGxlIHJlcXVldGUgaHRtbFxyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlSW5mb0ZpbG0uYmluZCh0aGlzKSk7ICAgICAvL3F1YW5kIGwnaW5mb3JtYXRpb24gZXN0IGNoYXJnw6ksXHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS9cIiArIG1vdmllSWQgKyBcIj9hcGlfa2V5PWIyMmY5YjIwYzY4YWQzNjg5M2QzYzhiNzVmMjk3NzFhJmxhbmd1YWdlPWVuLVVTXCIpOyAgICAvL2RhbnMgXCJcIiBtZXR0cmUgbGUgcmVxdWVzdCwgdm9pciBkYW5zIHZpZMOpbyAxaDEzbWluIGV0IHBsdXMgdGFyZCBkYW5zIDFoMzdtaW4sIHNlcnQgw6AgY2hlcmdlciBsZXMgZmlsbXMgZGFucyBsYSBiYXNlIGRlIGRvbm7DqWUgZGFucyBtb3ZpZSBkYlxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpOyAgICAvL2xhIHJlcXVldGUgZXN0IGVudm95w6lcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlSW5mb0ZpbG0oZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJldG91clJlcXVldGVJbmZvRmlsbVwiKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDsgICAgIC8vbGEgdmFyaWFibGUgdGFyZ2V0IHZpc2UgbGEgcmVxdWV0ZVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpOyAgICAgLy90cmFuc2Zvcm1lciBsJ8OpY3JpdHVyZSBpbmNvbXByw6llbnNpYmxlIGVuIMOpY3JpdHVyZSBjbGFpcmUgZXQgY29tcHLDqWhlbnNpYmxlLCBjJ2VzdC3DoCBkaXJlIGVuIGpzb25cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckluZm9GaWxtKGRhdGEpOyAgICAgLy9hcHBlbGxlIGxhIGZvbmN0aW9uIFwiYWZmaWNoZXJEZXJuaWVyRmlsbVwiIGF2ZWMgbGEgdmFyaWFibGUgXCJkYXRhXCIgY29tbWUgcGFyYW1ldHJlLCBjZWxhIHNlcnQgw6AgbmUgcGFzIG91YmxpZXIgbGVzIGRvbm7DqWVzIGRlIGxhIHZhcmlhYmxlIFwiZGF0YVwiIGRhbnMgdW5lIGF1dHJlIGZ1bmN0aW9uLCBjJ2VzdC3DoCBkaXJlIGxhIGZvbmN0aW9uIFwiYWZmaWNoZXJJbmZvRmlsbVwiXHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJJbmZvRmlsbShkYXRhKSB7XHJcblxyXG4gICAgICAgIC8vdGhpcy5yZXF1ZXRlQWN0ZXVyXHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKS5pbm5lckhUTUwgPSBkYXRhLnRpdGxlO1xyXG4gICAgICAgIC8vUmVtcGxhY2VyIGwnaW1hZ2VcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJhZmZpY2hlckRlcm5pZXJGaWxtXCIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RlLWZpbG1zXCIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNlY3Rpb24pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsbmJGaWxtOyBpKyspIHsgICAgIC8vdW5lIGJvdWNsZSB2YSDDqnRyZSBjcsOpZXIgcG91ciBjaGVyY2hlciBsZXMgaW5mb3JtYXRpb25zIGRlcyBmaWxtc1xyXG4gICAgICAgIC8vICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpOyAgICAgLy9MZXMgdGl0cmVzIGRlcyBmaWxtcyBzZXJvbnQgYWZmaWNow6kgZGFucyBsYSBjb25zb2xlXHJcbiAgICAgICAgLy8gICAgIC8vY29uc29sZS5sb2coZGF0YVtpXS5vdmVydmlldyk7ICAgIC8vTGVzIGRlc2NyaXB0aW9ucyBkZXMgZmlsbXMgc2Vyb250IGFmZmljaMOpIGRhbnMgbGEgY29uc29sZSwgaWwgZW4gbWFucXVlIHBhcmNlcXVlIGxhIGxhbmd1ZSBjaG9pc2llIGVzdCBlbiBmci1DQVxyXG4gICAgICAgIC8vICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGUgLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpOyAgICAvL3NlcnQgw6AgY2xvbmVyIGxlcyBhcnRpY2xlcyBxdWkgYSBsYSBjbGFzc2UgdGVtcGxhdGVcclxuICAgICAgICAvLyAgICAgLy9jb25zb2xlLmxvZyhhcnRpY2xlKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGlmKGRhdGFbaV0ub3ZlcnZpZXcgIT0gXCJcIikge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldztcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gXCJBdWN1bmUgaW5mb3JtYXRpb24gbidlc3QgZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgLy8gICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAvLyAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmltZ1BhdGggKyBcInczMDBcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGgpO1xyXG4gICAgICAgIC8vICAgICBpbWFnZS5hbHQgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuaHJlZiA9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDsgICAgICAgLy9DaGFuZ2VyIGxlIGhyZWYgZHUgbGllbiBhIHBvdXIgYWpvdXRlciBsZSBpZCBkdSBmaWxtXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvLyByZXF1ZXR0ZUFjdGV1cigpe1xyXG4gICAgLy9cclxuICAgIC8vICAgICAvL3JlcXVldGUgdmVycyBHRVQgY3JlZGl0KG1vdmlEQilcclxuICAgIC8vXHJcbiAgICAvLyB9XHJcbiAgICAvL1xyXG4gICAgLy8gcmV0b3VyUmVxdWV0dGVBY3RldXIoKSB7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIC8vZmFpcmUgYXR0ZW50aW9uIEpTT04ucGFyc2VcclxuICAgIC8vXHJcbiAgICAvLyB9XHJcbiAgICAvL1xyXG4gICAgLy8gYWZmaWNoZXJBY3RldXIoKSB7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIC8vYm91Y2xlIGZvciBldCBjbG9uZSBkZSBkaXYuYWN0ZXVyXHJcbiAgICAvL1xyXG4gICAgLy8gfVxyXG5cclxufVxyXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
