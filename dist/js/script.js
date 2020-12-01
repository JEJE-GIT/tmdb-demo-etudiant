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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEYigpOyAgICAgIC8vMWgyOG1pbjQzc2VjXHJcblxyXG4gICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpOyAgICAgLy9sYSByZXF1ZXRlIGh0bWwgZGUgbGEgZm9uY3Rpb24gXCJyZXF1ZXRlRGVybmllckZpbG1cIiBhIMOpdMOpIGFwZWzDqVxyXG5cclxufSlcclxuXHJcbmNsYXNzIE1vdmllRGIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyAgICAgLy91biBjb25zdHJ1Y3RvciBlc3Qgb2JsaWdhdG9pcmUgcG91ciBxdWUgdW5lIGNsYXNzIG1hcmNoZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3IE1vdmllRGIoKVwiKTtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiYzg2OTNlZmZkZjIyODg3MGY2OGZhNTI0MmY2NjM4ZGZcIjsgICAgIC8vTWV0dHJlIGxhIGNsw6kgQVBJIGRhbnMgXCJcIlxyXG4gICAgICAgIHRoaXMubGFuZyA9IFwiZnItQ0FcIjsgICAgICAgIC8vbGEgbGFuZ3VlIHByaW9yaXRhaXJlIGVzdCBmcmFuY2Fpcy1jYW5hZGllblxyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvM1wiOyAgICAvL01ldHRyZSBsJ2FkcmVzc2UgdXJsIHF1aSBzZSB0cm91dmUgYXUgZMOpYnV0IGRlIGxhIGNsw6kgQVBJXHJcbiAgICAgICAgdGhpcy5pbWdQYXRoID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9cIjsgICAgLy9tZXR0cmUgbGUgbGllbiBkZXMgaW1hZ2VzIGR1IHNpdGUsIHZvaXIgZGFucyB2aWTDqW9cclxuICAgICAgICB0aGlzLnRvdGFsbmJGaWxtID0gXCI4XCI7ICAgICAvL0TDqWZpbmlyIGxlIG1heGltdW0gZGUgbm9tYnJlIGRlIGZpbG1zIGRhbnMgbm90cmUgcGFnZSwgbGUgbWF4aW11bSBkZSBiYXNlIGMnZXN0IDIwXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZURlcm5pZXJGaWxtKCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7ICAgICAvL2xhIHZhcmlhYmxlIG5vbW3DqSBcInJlcXVldGVcIiBlc3QgZMOpZmluaSBwYXIgdW5lIG5vdXZlbGxlIHJlcXVldGUgcmVxdWV0ZSBodG1sXHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91clJlcXVldGVEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTsgICAgIC8vcXVhbmQgbCdpbmZvcm1hdGlvbiBlc3QgY2hhcmfDqSxcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9Yzg2OTNlZmZkZjIyODg3MGY2OGZhNTI0MmY2NjM4ZGYmbGFuZ3VhZ2U9ZnItQ0EmcGFnZT0xXCIpOyAgICAvL2RhbnMgXCJcIiBtZXR0cmUgbGUgcmVxdWVzdCwgdm9pciBkYW5zIHZpZMOpbyAxaDEzbWluIGV0IHBsdXMgdGFyZCBkYW5zIDFoMzdtaW4sIHNlcnQgw6AgY2hlcmdlciBsZXMgZmlsbXMgZGFucyBsYSBiYXNlIGRlIGRvbm7DqWUgZGFucyBtb3ZpZSBkYlxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpOyAgICAvL2xhIHJlcXVldGUgZXN0IGVudm95w6lcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlRGVybmllckZpbG0oZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJldG91clJlcXVldGVEZXJuaWVyRmlsbVwiKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDsgICAgIC8vbGEgdmFyaWFibGUgdGFyZ2V0IHZpc2UgbGEgcmVxdWV0ZVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7ICAgICAvL3RyYW5zZm9ybWVyIGwnw6ljcml0dXJlIGluY29tcHLDqWVuc2libGUgZW4gw6ljcml0dXJlIGNsYWlyZSBldCBjb21wcsOpaGVuc2libGUsIGMnZXN0LcOgIGRpcmUgZW4ganNvblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmFmZmljaGVyRGVybmllckZpbG0oZGF0YSk7ICAgICAvL2FwcGVsbGUgbGEgZm9uY3Rpb24gXCJhZmZpY2hlckRlcm5pZXJGaWxtXCIgYXZlYyBsYSB2YXJpYWJsZSBcImRhdGFcIiBjb21tZSBwYXJhbWV0cmUsIGNlbGEgc2VydCDDoCBuZSBwYXMgb3VibGllciBsZXMgZG9ubsOpZXMgZGUgbGEgdmFyaWFibGUgXCJkYXRhXCIgZGFucyB1bmUgYXV0cmUgZnVuY3Rpb24sIGMnZXN0LcOgIGRpcmUgbGEgZm9uY3Rpb24gXCJhZmZpY2hlckRlcm5pZXJGaWxtXCJcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFmZmljaGVyRGVybmllckZpbG1cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykgeyAgICAgLy91bmUgYm91Y2xlIHZhIMOqdHJlIGNyw6llciBwb3VyIGNoZXJjaGVyIGxlcyBpbmZvcm1hdGlvbnMgZGVzIGZpbG1zXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpOyAgICAgLy9MZXMgdGl0cmVzIGRlcyBmaWxtcyBzZXJvbnQgYWZmaWNow6kgZGFucyBsYSBjb25zb2xlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0ub3ZlcnZpZXcpOyAgICAvL0xlcyBkZXNjcmlwdGlvbnMgZGVzIGZpbG1zIHNlcm9udCBhZmZpY2jDqSBkYW5zIGxhIGNvbnNvbGUsIGlsIGVuIG1hbnF1ZSBwYXJjZXF1ZSBsYSBsYW5ndWUgY2hvaXNpZSBlc3QgZW4gZnItQ0FcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
