function frequence() {
	let texte1 = document.getElementById("poeme").value;
		
	poeme = texte1.toLowerCase().replace(/[^\w\s]/g, '');
	let mots = poeme.split(/\s+/);
		
	let frequenceMots = {};
	mots.forEach((mot) => {
  	frequenceMots[mot] = (frequenceMots[mot] || 0) + 1;
	});
		
	let triMots = Object.entries(frequenceMots).sort((a, b) => b[1] - a[1]);
	let dixMotsFrequents = triMots.slice(0, 10);

	console.log(`-- Les 10 mots les plus fréquents sont : ${dixMotsFrequents}.`);
}

function lexical(){
	let texte5 = document.getElementById("poeme").value;
	const mots = texte5.toLowerCase().match(/\b\w+\b/g);

	const motsUniques = {};
		mots.forEach(mot => {
    	motsUniques[mot] = (motsUniques[mot] || 0) + 1;
	});

	console.log("-- Nombre total de mots:", mots.length);
	console.log("-- Nombre de mots uniques:", Object.keys(motsUniques).length);
}


function phrases() {
	let texte2 = document.getElementById("poeme").value;
	let phrases = poeme.split(/[.!?]/);

    phrases = phrases.filter(function(phrase) {
        return phrase.trim() !== "";
    });
    
    console.log(`-- Ce poème comptient ${phrases.length} phrase(s).`);

	let totalMoyenne = 0;
    phrases.forEach(phrase => {
        const mots = phrase.trim().split(/\s+/);
        const longueurTotale = mots.reduce((acc, mot) => acc + mot.length, 0);
        const moyenne = longueurTotale / mots.length;
        totalMoyenne += moyenne || 0;
    });

    const longueurMoyenne = totalMoyenne / phrases.length;

    return longueurMoyenne;

	const moyenne = longueurMoyenneMotsParPhrase(poeme);
	console.log("-- Longueur moyenne des mots par phrase:", moyenne.toFixed(2));
}

function strophes() {
	let texte3 = document.getElementById("poeme").value;

    let strophes = texte3.split(/\n\s*\n/);

    strophes = strophes.filter(function(strophe) {
        strophe.trim() !== "";
        return strophes.length
    });

    console.log(`-- Ce poème comptient ${strophes.length} strophe(s).`);
}

function TypologieStrophes() { // fonction qui ne fonctionne pas
	let texte6 = document.getElementById("poeme").value;
    const lignes = texte6.split("\n").filter(line => line.trim().length > 0);

    let strophess = [];
    let i = 0;
    while (i < lignes.length) {
        let stropheuh = [];

        // Détecter le type de strophe
        let lignesDansStrophe = 0;
        while (i < lignes.length && lignes[i].trim().length > 0) {
            stropheuh.push(lignes[i]);
            i++;
            lignesDansStrophe++;
        }

        if (lignesDansStrophe > 0) {
            stropheuh.push(stropheuh);
        }

        // Passer aux lignes suivantes (ignorer les lignes vides)
        while (i < lignes.length && lignes[i].trim().length === 0) {
            i++;
        }
    }

	let typo = TypologieStrophes();
	console.log("-- Typologie des strophes:");
	typo.forEach((strophe, index) => {
    	console.log(`-- Strophe ${index + 1}: ${stropheuh.length} vers`); 
	})
}




function proprietes(){
// besoin de concaténer pour afficher les réponses unes par unes.
	let display = document.getElementById("resultatF");
	frequence()
	lexical()
	phrases()
	strophes()
// revoir fonction typologie des strophes qui ne fonctionne pas :/. 
}
