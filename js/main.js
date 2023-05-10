let i = 0;
console.log(localStorage);
let enregAdd = "";




function deleteContent(){

    let dlt = confirm("Voulez vous supprimer l'entièreté du stockage permanent ?")

    if (dlt){

        localStorage.clear()

    }

}

// deleteContent()





// création du texte à afficher
let newP = document.createElement('p');
let placediv = document.getElementById("billHide");
let sectionHide = document.getElementById("sectionFacture");

let EnregistrementString = "";

let enregistrement = [{
    prenom: "",
    nom: "",
    nuits: "",
    chambre: "",
    dejeuner: "",
    prix: ""
}];

function displayRadioValue() {
    var x = document.querySelector('input[name="petit_dej"]:checked')  ;
    return x.value;
}

function showArray(){

    let ok = JSON.parse(localStorage.getItem('Enregistrements'));
    console.table(ok)
    
    }

function getValue() {
    // Sélectionner l'élément input et récupérer sa valeur
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let nuits = document.getElementById("nuits").value;
    let chambre = document.getElementById("typechambre").value;
    let dej = displayRadioValue();


    // Stocker dans tableau enregistrement
    enregistrement[i] = {
        prenom: prenom,
        nom: nom,
        nuits: nuits,
        chambre: chambre,
        dejeuner: dej
    };

    // optionnel : affichage
    console.table(enregistrement);
    alert("Vous êtes dorénavant enregistré");



    // str = str.replace(/(\.|:|)/g, '_')


    // partie localstorage
    for (j = 0; j < enregistrement.length; j++) {
        enregAdd = JSON.stringify(enregistrement[i]);

        localStorage.setItem(`Enregistrement${localStorage.length}`, enregAdd.replace(/("|\.)/g, ''));
        }

    console.log(localStorage);
    // ----

    i++;
};

function addSection() {
    sectionHide.classList.remove("display-none");
    sectionHide.classList.add("display-flex");
}
function removeSection(){
    sectionHide.classList.add("display-none");
    sectionHide.classList.remove("display-flex");
}


function search() {
    let prenom2 = document.getElementById("prenomSearch").value;
    let nom2 = document.getElementById("nomSearch").value;
    let trouve = false;
    let prixdej = 0;
    placediv.append(newP);

    for (let searchindex = 0; searchindex < enregistrement.length; searchindex++) {
        if (enregistrement[searchindex].prenom === prenom2 && enregistrement[searchindex].nom === nom2 && enregistrement[searchindex].prenom !== "") {
            trouve = true;

            // calcul du prix
            if (enregistrement[searchindex].dejeuner === "oui") {
                prixdej = (7 * enregistrement[searchindex].nuits);
            } else prixdej = 0;

            if (enregistrement[searchindex].chambre === "ch1") {
                enregistrement[searchindex].prix = (65 * enregistrement[searchindex].nuits + prixdej);
            } else if (enregistrement[searchindex].chambre === "ch2") {
                enregistrement[searchindex].prix = (89 * enregistrement[searchindex].nuits + prixdej);
            } else if (enregistrement[searchindex].chambre === "ch3") {
                enregistrement[searchindex].prix = (139 * enregistrement[searchindex].nuits + prixdej);
            } else enregistrement[searchindex].prix = (189 * enregistrement[searchindex].nuits + prixdej);
            // ---
            addSection()
            setTimeout(removeSection, 3500);
            newP.textContent = (`La facture de ${enregistrement[searchindex].prenom} ${enregistrement[searchindex].nom} est de ${enregistrement[searchindex].prix}€`);
        }
        
        else {
            addSection()
            setTimeout(removeSection, 3500);
            trouve = false;
            newP.textContent = (`Client introuvable`);
        }
    }
}




