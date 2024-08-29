<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'souscription';

// Créer une connexion à la base de données
$mysqli = new mysqli($host, $user, $password, $dbname);

// Vérifier la connexion
if ($mysqli->connect_error) {
    die("Connexion échouée : " . $mysqli->connect_error);
}

// Lire les données JSON envoyées par le client
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() === JSON_ERROR_NONE) {
    // Insertion des données personnelles dans la table abonnes
    $stmtAbonnes = $mysqli->prepare(
        "INSERT INTO abonnes (civilite, nom, prenom, date_naissance, fixe, mobile, adresse, code_postal, ville, nom_naissance, email, lieu_naissance) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmtAbonnes->bind_param(
        "ssssssssssss",
        $data['civility'], $data['nom'], $data['prenom'], $data['dateNaissance'],
        $data['fixe'], $data['mobile'], $data['adresse'], $data['codePostal'],
        $data['ville'], $data['nomNaissance'], $data['email'], $data['lieuNaissance']
    );

    if ($stmtAbonnes->execute()) {
        $abonnesId = $mysqli->insert_id; // Récupère l'ID de l'abonné inséré
        echo 'ID de l\'abonné inséré : ' . $abonnesId . '<br>';
        echo 'Données personnelles insérées avec succès!<br>';
    } else {
        echo 'Erreur lors de l\'insertion des données personnelles : ' . $stmtAbonnes->error . '<br>';
    }
    $stmtAbonnes->close();

    // Gestion des données du médecin traitant
    if (isset($data['pasdemedicin']) && $data['pasdemedicin'] === 'on') {
        echo 'Pas de médecin traitant spécifié.<br>';
    } else {
        if (isset($data['medecinTraitant'], $data['villemedecinTraitant'], $data['medicinmedical'])) {
            $stmtMedecin = $mysqli->prepare(
                "INSERT INTO medecins (nom, ville, consentement_medical) VALUES (?, ?, ?)"
            );
            $stmtMedecin->bind_param(
                "sss",
                $data['medecinTraitant'], $data['villemedecinTraitant'], $data['medicinmedical']
            );

            if ($stmtMedecin->execute()) {
                echo 'Données du médecin traitant insérées avec succès!<br>';
            } else {
                echo 'Erreur lors de l\'insertion des données du médecin traitant : ' . $stmtMedecin->error . '<br>';
            }
            $stmtMedecin->close();
        } else {
            echo 'Informations incomplètes pour le médecin traitant.<br>';
        }
    }

    // Insertion des tiers de confiance
    if (isset($data['prenom'], $data['ordrePreference1'], $data['nom'], $data['email'], $data['telephone'], $data['proximiteDomicile']) &&
        is_array($data['prenom']) &&
        is_array($data['ordrePreference1']) &&
        is_array($data['nom']) &&
        is_array($data['email']) &&
        is_array($data['telephone']) &&
        is_array($data['proximiteDomicile'])
    ) {
        $count = count($data['prenom']);
        if (
            count($data['ordrePreference1']) === $count &&
            count($data['nom']) === $count &&
            count($data['email']) === $count &&
            count($data['telephone']) === $count &&
            count($data['proximiteDomicile']) === $count
        ) {
            $placeholders = implode(',', array_fill(0, $count, '(?, ?, ?, ?, ?, ?, ?)'));
            // Déboguer les données reçues
            print_r($data);

            // Requête SQL
            $sql = "INSERT INTO tiers_de_confiance (abonnes_id, ordre_preference, prenom, nom, email, telephone, proximite_domicile) VALUES $placeholders";

            // Préparer la requête
            if (!$stmtTiers = $mysqli->prepare($sql)) {
                die('Erreur de préparation de la requête : ' . $mysqli->error);
            }

            // Préparer les paramètres
            $params = [];
            foreach ($data['prenom'] as $index => $prenomTiers) {
                if (!empty($prenomTiers) && !empty($data['ordrePreference1'][$index]) && 
                    !empty($data['nom'][$index]) && !empty($data['email'][$index]) &&
                    !empty($data['telephone'][$index]) && !empty($data['proximiteDomicile'][$index])) {
                    $params[] = $abonnesId;
                    $params[] = $data['ordrePreference1'][$index];
                    $params[] = $prenomTiers;
                    $params[] = $data['nom'][$index];
                    $params[] = $data['email'][$index];
                    $params[] = $data['telephone'][$index];
                    $params[] = $data['proximiteDomicile'][$index];
                } else {
                    echo 'Certaines informations pour les tiers de confiance sont manquantes.<br>';
                    return;
                }
            }

            // Types des paramètres
            $types = str_repeat('s', count($params));
            array_unshift($params, $types);

            // Bind des paramètres
            call_user_func_array([$stmtTiers, 'bind_param'], refValues($params));

            // Exécution de la requête
            if (!$stmtTiers->execute()) {
                echo 'Erreur lors de l\'insertion des tiers de confiance : ' . $stmtTiers->error . '<br>';
            } else {
                echo 'Insertion réussie des tiers de confiance.<br>';
            }

            $stmtTiers->close();
        } else {
            echo 'Les données des tiers de confiance ne sont pas cohérentes.<br>';
        }
    } else {
        echo 'Informations manquantes ou invalides pour les tiers de confiance.<br>';
    }
} else {
    echo 'Erreur de décodage JSON : ' . json_last_error_msg() . '<br>';
}

// Fermer la connexion
$mysqli->close();

/**
 * Convertit un tableau de paramètres en un tableau de références pour bind_param.
 */
function refValues($arr) {
    $refs = [];
    foreach ($arr as $key => $value) {
        $refs[$key] = &$arr[$key];
    }
    return $refs;
}
?>
