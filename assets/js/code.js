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
//lorsque j'ajoute la fonction seg() dans le fichier js, la fonction précédente ne fonctionne plus. Donc ma fonction aussi. J'ai essayé d'intégrer la fontion seg() dans l'autre fonction, mais non plus.
    let texte = document.getElementById("fileDisplayArea").value;  //récup le texte qui a réussi d'être charger
    let delimiteurs = document.getElementById("delimID").value;  //récup les délimiteurs

    let All_mots = texte.split(/\s+/);

    //let del = []; 
    //for (let i = 0; i < delimiteurs.length; i++) {
    //del.push(delimiteurs[i] + " ");
    //}   j'ai compris qu'il fallit réutiliser les délimiteurs du fichier html jusqu'au js, mais je n'ai pas réussi après pour les utiliser.

    var freq_mots = []  //dico de frequences
    All_mots.forEach(function(mot) {
        if (freq_mots[mot]) {
            freq_mots[mot]++;
        } else {
            freq_mots[mot] = 1;
        }
    });

    var valeurs = []  //liste vide
    for (elem of Object.keys(freq_mots)){ // boucle pour classer les frequences
        if (valeurs.hasOwnProperty(freq_mots[elem])==false){
            valeurs[freq_mots[elem]] = [elem];
        }
        else{
            valeurs[freq_mots[elem]].push(elem);
        }
    }

    let display = document.getElementById("page-analysis"); //affichages des résultats dans page-analysis.
    display.innerHTML = `Le nombre total de mots est ${All_mots.length;}`+`<p>${valeurs;}</p>`
}