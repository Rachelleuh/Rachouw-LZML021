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


function seg() {

	const output = document.getElementById("fileDisplayArea").innerText; // récupération du contenu du fichier texte
	let result =  document.getElementById("page-analysis");  //balise pour écriture des résultats
	let delimiters = document.getElementById("delimID").value;   ///récupération des délimiteurs de mots


	//Corrections de la liste de délimiteurs pour éviter des erreurs dans l'expression régulière
	delim2 = delimiters.replace("-", "\\-") ; //échappement du tiret, comme il entouré d'autres caractères iol sera considéré comme marquant un intervalle comme dans [4-9]
	delim2 = delim2.replace("[", "\\[") ; // échappement des crochets ouverts
	delim2 = delim2.replace("]", "\\]") ; // échappement des crochets fermants
	delim2 = delim2 + "—"; //facultatif: ajout des tirets longs
	delim2 = delim2 + "\\s" ;//a jout de tous les symboles d'espacement


	//Construction de l'expression régulière pour découper les mots

	let word_regex = new RegExp ( "[" + //crochet ouvert pour signifier l'alternative 
	                            delim2 +                      
	                            "]" , 'g'); // pour enlever plusieurs délimiteurs 



	all_words = output.split(word_regex);  //tokénisation

	cleaned_words = all_words.filter(x => x.trim() != '') // pour garder que les tokens non vides 



	let dic_length={}; //liste contenant les mots

	for (let word of cleaned_words){   //dictionnaire de dictionnaire
	    if (word.length in dic_length){
	        dic_length[word.length]["freq"] += 1;
	        if (dic_length[word.length] ["elements"].includes(word.toLowerCase())) { //si le mot est d"ja dans la liste, alors on l'inclus avec une liste vide sans le répéter.
	           
	        }
	        else{
	            dic_length[word.length] ["elements"].push(word.toLowerCase()); //si non, alors .push dans la liste
	        }
	      
	    }
	    else {
	         dic_length[word.length]= {}
	         dic_length[word.length]["freq"] = 1;
	         dic_length[word.length] ["elements"]= [word.toLowerCase()]   ;   

	    }
	}


	let table = document.createElement("table"); //création du tableau
	table.style.margin = "auto";
	let head = table.appendChild(document.createElement("tr")); 
	head.innerHTML = "<th>Nombre de caractères</th><th>Nombre d'occurrences</th><th>Formes(s) unique(s)</th>"; //déterminer les 3 colonnes

	ordered = Object.keys(dic_length).sort((a, b) => a - b); //ordre croissant

	for (let elem of ordered){ //boucle pour écrire dans le tableau
	    let row = table.appendChild(document.createElement("tr"));
	    let cell_length = row.appendChild(document.createElement("td"));  // nb de Xtère
	    let cell_total = row.appendChild(document.createElement("td"));  //nb occurence
	    let cell_details = row.appendChild(document.createElement("td"));  //formes uniques
	    cell_length.innerHTML = elem;
	    cell_total.innerHTML = dic_length[elem]["freq"];
	    cell_details.innerHTML = dic_length[elem]["elements"].sort().join(', ') +' ('+ dic_length[elem]["elements"].length +')';
	    

	}

	result.innerHTML =`<p>Le  texte contient au total ${cleaned_words.length} mots.<p/>`;  //affichage du tableau
	result.append(table);//correction de la fonction

}


function tokenisation() {
	const output = document.getElementById("fileDisplayArea").innerText; // récupération du contenu du fichier texte
	let delimiters = document.getElementById("delimID").value;   ///récupération des délimiteurs de mots


	//Corrections de la liste de délimiteurs pour éviter des erreurs dans l'expression régulière
	delim2 = delimiters.replace("-", "\\-") ; //échappement du tiret, comme il entouré d'autres caractères iol sera considéré comme marquant un intervalle comme dans [4-9]
	delim2 = delim2.replace("[", "\\[") ; // échappement des crochets ouverts
	delim2 = delim2.replace("]", "\\]") ; // échappement des crochets fermants
	delim2 = delim2 + "—"; //facultatif: ajout des tirets longs
	delim2 = delim2 + "\\s" ;//a jout de tous les symboles d'espacement
	let word_regex = new RegExp ( "[" + //crochet ouvert pour signifier l'alternative 
	                            delim2 +                      
	                            "]" , 'g'); // pour enlever plusieurs délimiteurs 

	all_words = output.split(word_regex);  //tokénisation

	cleaned_words = all_words.filter(x => x.trim() != '') // pour garder que les tokens non vides 
}


function Cooccurrents() {
	let fileDisplayArea = document.getElementById("fileDisplayArea").innerText;
    let pole = document.getElementById('poleID').value;
    let long = document.getElementById('lgID').value;

    let all_words = tokenisation(fileDisplayArea);

    let cooccurrents = [];
    for (let i = 0; i < all_words.length; i++) { // Parcourir tous les mots du texte
        // Vérifier si le mot courant est égal au mot recherché
        if (words[i] === pole) {
            // Parcourir les mots dans l'intervalle spécifié
            for (let j = i - length; j <= i + length; j++) {
                // Vérifier si l'indice est valide et différent de l'indice du mot recherché
                if (j >= 0 && j < all_words.length && j !== i) {
                    // Ajouter le cooccurrent à la liste avec son indice
                    cooccurrents.push({ pole: all_words[j], index: j });
                }
            }
        }
    }

	function calculateFrequencies(words, pole) {
	    const frequencies = {
	        left: 0,
	        right: 0
	    };

	    for (let i = 0; i < all_words.length; i++) {
	        if (words[i].index < all_words[word].index) {
	            frequencies.left++;
	        } else {
	            frequencies.right++;
	        }
	    }
	}


	function Cooccurrences(pole, long) {
	    const cooccurrents = Cooccurrents();
	    const frequencies = calculateFrequencies(cooccurrents, long);

	    const table = document.createElement('table');
	    const headers = ["Cooccurrence", "Co-frequence", "Freq gauche", "% Freq gauche", "Freq droite", "% Freq droite"];

	    // Créer l'en-tête du tableau
	    const headerRow = table.insertRow();
	    headers.forEach(headerText => {
	        const th = document.createElement('th');
	        th.textContent = headerText;
	        headerRow.appendChild(th);
	    });

	    // Remplir le tableau avec les données
	    cooccurrents.forEach(cooccur => {
	        const row = table.insertRow();
	        const cooccurrenceCell = row.insertCell(0);
	        cooccurrenceCell.textContent = cooccur.word;
	        const coFrequencyCell = row.insertCell(1);
	        coFrequencyCell.textContent = cooccurrents.length;
	        const frequencies = calculateFrequencies(cooccurrents, cooccurrents.indexOf(cooccur));
	        const leftFrequencyCell = row.insertCell(2);
	        leftFrequencyCell.textContent = frequencies.left;
	        const leftPercentageCell = row.insertCell(3);
	        leftPercentageCell.textContent = ((frequencies.left / cooccurrents.length) * 100).toFixed(2) + "%";
	        const rightFrequencyCell = row.insertCell(4);
	        rightFrequencyCell.textContent = frequencies.right;
	        const rightPercentageCell = row.insertCell(5);
	        rightPercentageCell.textContent = ((frequencies.right / cooccurrents.length) * 100).toFixed(2) + "%";
	    });

	    // Afficher le tableau dans le document
		result.append(table);
	}
}

function graphique() {
	let fileDisplayArea = document.getElementById("fileDisplayArea").innerText;
    let mots = tokenisation(fileDisplayArea);

	let occurrences = {};

    // Compter les occurrences de chaque mot
    mots.forEach(mot => {
        occurrences[mot] = (occurrences[mot] || 0) + 1;
    });

    // Trier les mots par nombre d'occurrences décroissant
    const motsTries = Object.keys(occurrences).sort((a, b) => occurrences[b] - occurrences[a]);

    // Sélectionner les 10 premiers mots les plus fréquents
    const top10Mots = motsTries.slice(0, 10);
    const top10Occurrences = top10Mots.map(mot => occurrences[mot]);

    // Préparer les données pour Chartist
    const data = {
        labels: top10Mots,
        series: [top10Occurrences]
    };

    // Configurer les options du graphique
    const options = {
        axisX: {
            labelInterpolationFnc: function(value) {
                return value.split('').slice(0, 10).join(''); // Limiter la longueur du mot à afficher sur l'axe X
            }
        }
    };

    // Dessiner le graphique en utilisant Chartist
    new Chartist.Bar('.ct-chart', data, options);

}



function aide() {
	let display = document.getElementById("aide");
	display.innerHTML = `<p>Bienvenue dans l'aide : cette section sert à documenter et à expliquer les différentes fonctionnalités d'analyse de textes.</p>`+
	`<p>Afin d'y accéder, il faut sélectionner sur votre ordinateur un fichier texte (.txt uniquement) en cliquant sur le bouton "Choisir un fichier..". Si le texte est chargé avec succès, il affichera en bas à gauche de votre écran.</p>`+
	`<p>Les différentes fonctionnalités sont faits par des boutons sur lesquels vous cliquerez et elles s'afficheront à droite de votre texte.</p>`+
	`<p>Le bouton "Segmentation" affiche le nombre total de mots du texte, ainsi qu'une table classant les mots du texte par nombre croissant de caractères.</p>`+
	`<p>Le bouton "Cooccurents" affiche les cooccurrents dans le texte pour tout mot rentré par l'utilisateur dans "Pôle" dans un intervalle par "Longueur". Ainsi qu'une table classant les cooccurrents en fonction de son contexte.</p>`+
	`<p>Le boutuon "Visualisation Cooccurents" affiche un graph contenant les 10 co-occurents les plus frequents d'un mot pivot.</p>`
}
