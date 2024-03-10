function proprietes(){
	frequence()
	phrases()
	strophes()
}

proprietes()

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
	
	let display = document.getElementById("resultatF");
	display.innerText = `-- Les 10 mots les plus fréquents sont : ${dixMotsFrequents}.`

}


function phrases() {
	let texte2 = document.getElementById("poeme").value;

	phrases = phrases.filter(fonction(phrase){
		return phrases.trim() !== "";
	})
	let display = document.getElementById("resultatF");
	display.innerText =`-- Ce poème comptient` ${phrases.lenght()} `phrases.`;
}


function Strophes(texte) {
	let texte3 = document.getElementById("poeme").value;

    var strophes = texte.split(/\n\s*\n/);
    
    // Filtrer les éléments vides qui peuvent survenir si le texte commence ou se termine par des sauts de ligne
    strophes = strophes.filter(function(strophe) {
        return strophe.trim() !== "";
    });

    let display = document.getElementById("resultatF");
    display.innerText =  '-- Ce poème a'${strophes.lenght()}'strophes.';
}
