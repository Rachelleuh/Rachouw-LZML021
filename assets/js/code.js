window.onload = function () {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}



function seg(){ 
    let fileDisplayArea = document.getElementById("fileDisplayArea").innerText;  //récup le texte qui a réussi d'être charger
    let del = document.getElementById("delimID").value;  //récup les délimiteurs mais besoin de déspéciliser certains.

    fileDisplayArea.replace(/[ ,;’'~\|&#@=`\-\.?!%*$\(\)\[\]{}_:\+«»§\/]/g," ");
    let All_mots = fileDisplayArea.toLowerCase();
    All_mots.split(" ");

    var mots_len = []  //dico de mot par longueur
    All_mots.forEach(function(mot) {  
        mots_len.push(All_mots);      
        if (mot.trim() !== "") {
            if (mots_len.hasOwnProperty(mot)==false){
                mots_len[mot.length] = 1;
            }
            else {
                mots_len[mot.length] += 1;
            }
        }
    });

    var All_mots = mots_len


    var valeurs = []  //liste vide
    for (elem of Object.keys(mots_len)){ // boucle pour classer les frequences
        if (valeurs.hasOwnProperty(mots_len[elem])==false){
            valeurs[mots_len[elem]] = [elem];
        }
        else{
            valeurs[mots_len[elem]].push(elem);
        }
    }

    var tableau = document.createElement("tableau"); //j'ai essayé
    var Header = table.insertRow();
    var Headerword = Header.insertCell();
    Headerword.textContent = "Mots";
    var Headerlen = Header.insertCell();
    Headerlen.textContent = "longueur";

    valeurs.forEach(function(mot){
        var row = tableau.insertRow();
        var cellule = row.insertCell();
        cellule.textContent = word;
        var celulle_len = rw.insertCell();
        celulle_len.textContent = word.length
    });


    let display = document.getElementById("page-analysis"); //affichages des résultats dans page-analysis.
    display.innerHTML = `<p>Le nombre total de mots est ${All_mots.length;}</p>`+`<p>${tableau}</p>`
}



function cooccurrence(mot,longueur) {
    let fileDisplayArea = document.getElementById("fileDisplayArea").innerText;
    let pole = document.getElementById('poleID').value;
    let long = document.getElementById('lgID').value;

    //nettoyage du texte
    fileDisplayArea.replace(/[ ,;’'~\|&#@=`\-\.?!%*$\(\)\[\]{}_:\+«»§\/]/g," ");
    let All_mots = fileDisplayArea.toLowerCase();
    let words = All_mots.split(" ");


    var cooccurrent = []; //liste vide
    for (let i = 0; i < words.length; i++) { //boucle pour rechercher les occurrences d'un mot donné.
        if (words[i] === word) {
            for (let j = i - long; j <= i + long; j++) { //
                if (j >= 0 && j < words.length && j !== i) {
                    cooccurrent.push(words[j]); // Ajouter le cooccurrent à la liste
                }
            }
        }
    }
    let display = document.getElementById("page-analysis"); //affichages des résultats dans page-analysis.
    //display.innerHTML = `...`
}
