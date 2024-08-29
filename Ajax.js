document.getElementById("submitBtn").addEventListener("click", function () {
    const form = document.getElementById("subscriptionForm");
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    const dataObject = {};
    formData.forEach((value, key) => {
        if (dataObject[key]) {
            if (!Array.isArray(dataObject[key])) {
                dataObject[key] = [dataObject[key]];
            }
            dataObject[key].push(value);
        } else {
            dataObject[key] = value;
        }
    });

    console.log("Données envoyées au serveur :", dataObject); 

    fetch("index.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
    })
    .then((response) => response.text())
    .then((result) => {
        alert("Réponse du serveur : " + result);
    })
    .catch((error) => {
        console.error("Erreur lors de la soumission du formulaire :", error);
        alert("Erreur lors de la soumission du formulaire");
    });
});
