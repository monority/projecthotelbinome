let i = 0;
var data = JSON.parse(localStorage.getItem("yourData")) ||  {
    thisFigure: 0,
    thatFigure: 0,
    theOtherFigure: 0
 };

// création du texte à afficher
let newP = document.createElement('p');
let placediv = document.getElementById("billHide");
let sectionHide = document.getElementById("sectionFacture");


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
    i++;

    // optionnel : affichage
    console.table(enregistrement);
    alert("Vous êtes dorénavant enregistré");
}

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
            if (enregistrement[searchindex].dejeuner === "Oui") {
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