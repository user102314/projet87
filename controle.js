document.addEventListener("DOMContentLoaded", function () {
    function validateForm() {
        let isValid = true;

        // Réinitialisation des erreurs
        document.querySelectorAll(".error-message").forEach(e => e.innerHTML = "");
        document.querySelectorAll(".form-control").forEach(e => e.style.borderColor = "");

        // Récupération des éléments
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

        // Validation des champs requis
        if (civility.value === "") {
            document.getElementById("civilityError").innerHTML = "Veuillez choisir une civilité.";
            isValid = false;
        }
        if (nom.value.trim() === "") {
            nom.style.borderColor = "red";
            document.getElementById("nomError").innerHTML = "Le nom est requis.";
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

        // Médecin traitant
        
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
