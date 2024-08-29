var count = 1;
document.getElementById("addTiersButton").addEventListener("click", function () {
    const container = document.getElementById("blockContainer");
    count++;
    const newBlock = document.createElement("div");
    newBlock.className = "card mb-4";
    newBlock.id = `block${count}`;

    newBlock.innerHTML = `
        <div class="card-header">
            <h5>Tiers de confiance ${count}</h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-3 mb-1">
                    <input type="checkbox" class="form-check-input" name="tiersType[${count - 1}]" id="famille${count}" value="famille">
                    <label for="famille${count}" class="form-label">Famille</label>
                </div>
                <div class="col-md-3 mb-1">
                    <input type="checkbox" class="form-check-input" name="tiersType[${count - 1}]" id="amis${count}" value="amis">
                    <label for="amis${count}" class="form-label">Amis</label>
                </div>
                <div class="col-md-3 mb-1">
                    <input type="checkbox" class="form-check-input" name="tiersType[${count - 1}]" id="auxiliaire${count}" value="auxiliaire">
                    <label for="auxiliaire${count}" class="form-label">Auxiliaire de vie</label>
                </div>
                <div class="col-md-3 mb-1">
                    <input type="checkbox" class="form-check-input" name="tiersType[${count - 1}]" id="voisins${count}" value="voisins">
                    <label for="voisins${count}" class="form-label">Voisins</label>
                </div>
            </div>
            <div class="row">
                <div class="classA">
                    <label for="ordrePreference${count}" class="form-label">Ordre de préférence*</label>
                    <input type="text" class="form-control" id="ordrePreference${count}" name="ordrePreference[${count - 1}]">
                    <div id="ordrePreference${count}Error" class="error-message"></div>
                </div>
                <div class="classB">
                    <label for="nomTiers${count}" class="form-label">Nom*</label>
                    <input type="text" class="form-control" id="nomTiers${count}" name="nomTiers[${count - 1}]">
                    <div id="nomTiers${count}Error" class="error-message"></div>
                </div>
            </div>
            <div class="row">
                <div class="classA">
                    <label for="prenomTiers${count}" class="form-label">Prénom*</label>
                    <input type="text" class="form-control" id="prenomTiers${count}" name="prenomTiers[${count - 1}]">
                    <div id="prenomTiers${count}Error" class="error-message"></div>
                </div>
                <div class="classB">
                    <label for="emailTiers${count}" class="form-label">Email*</label>
                    <input type="email" class="form-control" id="emailTiers${count}" name="emailTiers[${count - 1}]">
                    <div id="emailTiers${count}Error" class="error-message"></div>
                </div>
            </div>
            <div class="row">
                <div class="classA">
                    <label for="telephoneTiers${count}" class="form-label">Téléphone*</label>
                    <input type="tel" class="form-control" id="telephoneTiers${count}" name="telephoneTiers[${count - 1}]">
                    <div id="telephoneTiers${count}Error" class="error-message"></div>
                </div>
                <div class="classB">
                    <label for="proximiteDomicile${count}" class="form-label">Proximité du domicile*</label>
                    <input type="text" class="form-control" id="proximiteDomicile${count}" name="proximiteDomicile[${count - 1}]">
                    <div id="proximiteDomicile${count}Error" class="error-message"></div>
                </div>
            </div>
        </div>
        <!-- Nouveau Bloc Ajouté -->
                <div class="row">
                    <div class="classA">
                        <span for="cheak1${count}" class="form-label">Accepter-vous que cette personne co-administre votre dossier ?</span><br>
                        <label for="cheak1${count}">Oui</label>
                        <input type="radio" class="form-check-input" id="cheak1${count}" name="acc1${count}" value="oui">
                        <label for="cheak2${count}">Non</label>
                        <input type="radio" class="form-check-input" id="cheak2${count}" name="acc1${count}" value="non">
                        <div id="cheak1${count}Error" class="error-message"></div>
                    </div>
                    <div class="classB">
                        <span for="cheak3${count}" class="form-label">Accepter-vous que cette personne soit prévenu en cas d'alerte médicale ?</span><br>
                        <label for="cheak3${count}">Oui</label>
                        <input type="radio" class="form-check-input" id="cheak3${count}" name="acc2${count}" value="oui">
                        <label for="cheak4${count}">Non</label>
                        <input type="radio" class="form-check-input" id="cheak4${count}" name="acc2${count}" value="non">
                        <div id="cheak2${count}Error" class="error-message"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(newBlock);
});

    

document.addEventListener("DOMContentLoaded", function () {
function validateForm() {
    let isValid = true;
    document.querySelectorAll(".error-message").forEach(e => e.innerHTML = "");
    document.querySelectorAll(".form-control").forEach(e => e.style.borderColor = "");
    const civility = document.getElementById("civility");
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const mobile = document.getElementById("mobile");
    const adresse = document.getElementById("adresse");
    const codePostal = document.getElementById("codePostal");
    const ville = document.getElementById("ville");
    const dateNaissance = document.getElementById("dateNaissance");
    const email = document.getElementById("email");
    const lieuNaissance = document.getElementById("lieuNaissance");
    const medecinTraitant = document.getElementById("medecinTraitant");
    const villemedecinTraitant = document.getElementById("villemedecinTraitant");
    const dossierMedicalOui = document.getElementById("dossierMedicalOui");
    const dossierMedicalNon = document.getElementById("dossierMedicalNon");
    const pasdemedicin = document.getElementById("pasdemedicin");
    const nomNaissance = document.getElementById("nomNaissance");
    const fixe = document.getElementById("fixe");

    const ordrePreference = document.getElementById("ordrePreference1");
    const nomTiers = document.getElementById("nom1");
    const prenomTiers = document.getElementById("prenom1");
    const emailTiers = document.getElementById("email1");
    const telephoneTiers = document.getElementById("telephone1");
    const proximiteDomicile = document.getElementById("proximiteDomicile1");

    const A = document.getElementById("voisins1");
    const B = document.getElementById("auxiliaire1");
    const C = document.getElementById("amis1");
    const D = document.getElementById("famille1");

    // Validation des champs requis
    if (document.getElementById("Date").value === "") {
    document.getElementById("DateError").innerHTML = "Veuillez entrer une date.";
    isValid = false;
    }
    if (document.getElementById("Ref").value.trim() === "") {
        document.getElementById("RefError").innerHTML = "Le champ Ref est requis.";
        isValid = false;
    }
    if (civility.value === "") {
        document.getElementById("civilityError").innerHTML = "Veuillez choisir une civilité.";
        isValid = false;
    }
    if (nom.value.trim() === "") {
        nom.style.borderColor = "red";
        document.getElementById("nomError").innerHTML = "Le nom est requis.";
        isValid = false;
    }
    if (fixe.value.trim() === "") {
        fixe.style.borderColor = "red";
        document.getElementById("fixeError").innerHTML = "Le fixe est requis.";
        isValid = false;
    }
    if (nomNaissance.value.trim() === "") {
        nomNaissance.style.borderColor = "red";
        document.getElementById("nomNaissanceError").innerHTML = "Le nomNaissance est requis.";
        isValid = false;
    }
    if (prenom.value.trim() === "") {
        prenom.style.borderColor = "red";
        document.getElementById("prenomError").innerHTML = "Le prénom est requis.";
        isValid = false;
    }
    if (mobile.value.trim() === "") {
        mobile.style.borderColor = "red";
        document.getElementById("mobileError").innerHTML = "Le numéro de téléphone mobile est requis.";
        isValid = false;
    }
    if (adresse.value.trim() === "") {
        adresse.style.borderColor = "red";
        document.getElementById("adresseError").innerHTML = "L'adresse est requise.";
        isValid = false;
    }
    if (codePostal.value.trim() === "") {
        codePostal.style.borderColor = "red";
        document.getElementById("codePostalError").innerHTML = "Le code postal est requis.";
        isValid = false;
    }
    if (ville.value.trim() === "") {
        ville.style.borderColor = "red";
        document.getElementById("villeError").innerHTML = "La ville est requise.";
        isValid = false;
    }
    if (dateNaissance.value === "") {
        dateNaissance.style.borderColor = "red";
        document.getElementById("dateNaissanceError").innerHTML = "La date de naissance est requise.";
        isValid = false;
    }
    if (email.value.trim() === "") {
        email.style.borderColor = "red";
        document.getElementById("emailError").innerHTML = "L'email est requis.";
        isValid = false;
    }
    if (lieuNaissance.value.trim() === "") {
        lieuNaissance.style.borderColor = "red";
        document.getElementById("lieuNaissanceError").innerHTML = "Le lieu de naissance est requis.";
        isValid = false;
    }
    if (medecinTraitant.value.trim() === "") {
        medecinTraitant.style.borderColor = "red";
        document.getElementById("medecinTraitantError").innerHTML = "Le nom du médecin traitant est requis.";
        isValid = false;
    }
    if (villemedecinTraitant.value.trim() === "") {
        villemedecinTraitant.style.borderColor = "red";
        document.getElementById("villeMedecinError").innerHTML = "La ville du médecin traitant est requise.";
        isValid = false;
    }
    if (!dossierMedicalOui.checked && !dossierMedicalNon.checked) {
        document.getElementById("dossierMedicalError").innerHTML = "Veuillez indiquer si vous acceptez que le médecin traitant consulte votre dossier médical.";
        isValid = false;
    }
    if (ordrePreference.value.trim() === "") {
        ordrePreference.style.borderColor = "red";
        document.getElementById("ordrePreference1Error").innerHTML = "L'ordre de préférence est requis.";
        isValid = false;
    }
    if (!A.checked && !B.checked && !C.checked && !D.checked) {
        A.style.borderColor = "red";
        B.style.borderColor = "red";
        C.style.borderColor = "red";
        D.style.borderColor = "red";
        document.getElementById("CHEAK").innerHTML = "ces champs est requis.";
        isValid = false;
    }
    if (nomTiers.value.trim() === "") {
        nomTiers.style.borderColor = "red";
        document.getElementById("nom1Error").innerHTML = "Le nom est requis.";
        isValid = false;
    }   
    if (prenomTiers.value.trim() === "") {
        prenomTiers.style.borderColor = "red";
        document.getElementById("prenom1Error").innerHTML = "Le prénom est requis.";
        isValid = false;
    }
    if (emailTiers.value.trim() === "") {
        emailTiers.style.borderColor = "red";
        document.getElementById("email1Error").innerHTML = "L'email est requis.";
        isValid = false;
    }
    if (telephoneTiers.value.trim() === "") {
        telephoneTiers.style.borderColor = "red";
        document.getElementById("telephone1Error").innerHTML = "Le téléphone est requis.";
        isValid = false;
    }
    if (proximiteDomicile.value.trim() === "") {
        proximiteDomicile.style.borderColor = "red";
        document.getElementById("proximiteDomicile1Error").innerHTML = "La proximité du domicile est requise.";
        isValid = false;
    }
    const acc1Radio = document.getElementsByName(`acc1`);
        if (![...acc1Radio].some(r => r.checked)) {
            document.getElementById(`cheak1Error`).innerHTML = "Veuillez sélectionner une option pour la co-administration.";
            isValid = false;
        }
        
        const acc2Radio = document.getElementsByName(`acc2`);
        if (![...acc2Radio].some(r => r.checked)) {
            document.getElementById(`cheak2Error`).innerHTML = "Veuillez sélectionner une option pour l'alerte médicale.";
            isValid = false;
        }
    for (let i = 2; i <= count; i++) {
        const orderInput = document.getElementById(`ordrePreference${i}`);
        const nomInput = document.getElementById(`nomTiers${i}`);
        const prenomInput = document.getElementById(`prenomTiers${i}`);
        const emailInput = document.getElementById(`emailTiers${i}`);
        const telephoneInput = document.getElementById(`telephoneTiers${i}`);
        const proximityInput = document.getElementById(`proximiteDomicile${i}`);
    
        const A = document.getElementById(`voisins${i}`);
        const B = document.getElementById(`auxiliaire${i}`);
        const C = document.getElementById(`amis${i}`);
        const D = document.getElementById(`famille${i}`);

        // Vérifie si les éléments existent avant d'essayer de les utiliser
        if (A && B && C && D) {
            if (!A.checked && !B.checked && !C.checked && !D.checked) {
                A.style.borderColor = "red";
                B.style.borderColor = "red";
                C.style.borderColor = "red";
                D.style.borderColor = "red";
                const checkErrorElement = document.getElementById(`CHEAK${i}`);
                if (checkErrorElement) {
                    checkErrorElement.innerHTML = "Ces champs sont requis.";
                    console.log("felécitation")
                }
                isValid = false;
            }
        }

        // Ajout de la validation pour chaque bloc
        if (orderInput.value.trim() === "") {
            console.log("1");
            orderInput.style.borderColor = "red";
            document.getElementById(`ordrePreference${i}Error`).innerHTML = "L'ordre de préférence est requis.";
            isValid = false;
        }
        
        if (nomInput.value.trim() === "") {
            console.log("1");
            nomInput.style.borderColor = "red";
            document.getElementById(`nomTiers${i}Error`).innerHTML = "Le nom est requis.";
            isValid = false;
        }   
        if (prenomInput.value.trim() === "") {
            console.log("1");

            prenomInput.style.borderColor = "red";
            document.getElementById(`prenomTiers${i}Error`).innerHTML = "Le prénom est requis.";
            isValid = false;
        }
        if (emailInput.value.trim() === "") {
            console.log("1");
            emailInput.style.borderColor = "red";
            document.getElementById(`emailTiers${i}Error`).innerHTML = "L'email est requis.";
            isValid = false;
        }
        if (telephoneInput.value.trim() === "") {
            console.log("1");
            telephoneInput.style.borderColor = "red";
            document.getElementById(`telephoneTiers${i}Error`).innerHTML = "Le téléphone est requis.";
            isValid = false;
        }
        if (proximityInput.value.trim() === "") {
            console.log("1");
            proximityInput.style.borderColor = "red";
            document.getElementById(`proximiteDomicile${i}Error`).innerHTML = "La proximité du domicile est requise.";
            isValid = false;
        }
         // Validation des nouveaux champs radio
         const acc1Radio = document.getElementsByName(`acc1${i}`);
        if (![...acc1Radio].some(r => r.checked)) {
            document.getElementById(`cheak1${i}Error`).innerHTML = "Veuillez sélectionner une option pour la co-administration.";
            isValid = false;
        }
        
        const acc2Radio = document.getElementsByName(`acc2${i}`);
        if (![...acc2Radio].some(r => r.checked)) {
            document.getElementById(`cheak2${i}Error`).innerHTML = "Veuillez sélectionner une option pour l'alerte médicale.";
            isValid = false;
        }
    }




            return isValid;
        }
    
    
        // Validation avant soumission
        document.getElementById("subscriptionForm").addEventListener("submit", function (event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
    
        // Appel de validation pour les autres interactions si nécessaire
        document.querySelectorAll(".form-control").forEach(input => {
            input.addEventListener("blur", validateForm);
        });
        document.querySelectorAll("input[type='radio']").forEach(input => {
            input.addEventListener("change", validateForm);
        });
        document.getElementById("pasdemedicin").addEventListener("change", validateForm);
    });