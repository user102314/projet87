<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'souscription';

$mysqli = new mysqli($host, $user, $password, $dbname);

if ($mysqli->connect_error) {
    die("Connexion échouée : " . $mysqli->connect_error);
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() === JSON_ERROR_NONE) {
    $stmtAbonnes = $mysqli->prepare(
        "INSERT INTO abonnes (civilite, nom, prenom, date_naissance, fixe, mobile, adresse, code_postal, ville, nom_naissance, email, lieu_naissance, date_ab, ref) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmtAbonnes->bind_param(
        "ssssssssssssss",
        $data['civility'], $data['nom'], $data['prenom'], $data['dateNaissance'],
        $data['fixe'], $data['mobile'], $data['adresse'], $data['codePostal'],
        $data['ville'], $data['nomNaissance'], $data['email'], $data['lieuNaissance'], $data['Date'], $data['Ref']
    );

    if ($stmtAbonnes->execute()) {
        $abonnesId = $mysqli->insert_id; // Récupère l'ID de l'abonné inséré
        echo 'ID de l\'abonné inséré : ' . $abonnesId . '<br>';
        echo 'Données personnelles insérées avec succès!<br>';
    } else {
        echo 'Erreur lors de l\'insertion des données personnelles : ' . $stmtAbonnes->error . '<br>';
    }
    $stmtAbonnes->close();

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

    if (isset($data['prenom'], $data['ordrePreference1'], $data['nom'], $data['email'], $data['telephone'], $data['proximiteDomicile'],
        $data['famille'], $data['amis'], $data['auxiliaire'], $data['voisins'], $data['condition1'], $data['condition2']) &&
        is_array($data['prenom']) &&
        is_array($data['ordrePreference1']) &&
        is_array($data['nom']) &&
        is_array($data['email']) &&
        is_array($data['telephone']) &&
        is_array($data['proximiteDomicile']) &&
        is_array($data['famille']) &&
        is_array($data['amis']) &&
        is_array($data['auxiliaire']) &&
        is_array($data['voisins']) &&
        is_array($data['condition1']) &&
        is_array($data['condition2'])
    ) {
        $count = count($data['prenom']);
        if (count($data['ordrePreference1']) === $count &&
            count($data['nom']) === $count &&
            count($data['email']) === $count &&
            count($data['telephone']) === $count &&
            count($data['proximiteDomicile']) === $count &&
            count($data['famille']) === $count &&
            count($data['amis']) === $count &&
            count($data['auxiliaire']) === $count &&
            count($data['voisins']) === $count &&
            count($data['condition1']) === $count &&
            count($data['condition2']) === $count
        ) {
            $placeholders = implode(',', array_fill(0, $count, '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'));

            $sql = "INSERT INTO tiers_confiance (id_abonne, ordre, famille, amis, auxiliaire, voisins, prenom, nom, email, telephone, proximite_domicile, condition1, condition2) VALUES $placeholders";

            if (!$stmtTiers = $mysqli->prepare($sql)) {
                die('Erreur de préparation de la requête : ' . $mysqli->error);
            }

            $params = [];
            foreach ($data['prenom'] as $index => $prenomTiers) {
                if (!empty($prenomTiers) && !empty($data['ordrePreference1'][$index]) && 
                    !empty($data['nom'][$index]) && !empty($data['email'][$index]) &&
                    !empty($data['telephone'][$index]) && !empty($data['proximiteDomicile'][$index])) {
                    $params[] = $abonnesId;
                    $params[] = $data['ordrePreference1'][$index];
                    $params[] = $data['famille'][$index] === 'on' ? 1 : 0;
                    $params[] = $data['amis'][$index] === 'on' ? 1 : 0;
                    $params[] = $data['auxiliaire'][$index] === 'on' ? 1 : 0;
                    $params[] = $data['voisins'][$index] === 'on' ? 1 : 0;
                    $params[] = $prenomTiers;
                    $params[] = $data['nom'][$index];
                    $params[] = $data['email'][$index];
                    $params[] = $data['telephone'][$index];
                    $params[] = $data['proximiteDomicile'][$index];
                    $params[] = $data['condition1'][$index] === 'on' ? 1 : 0;
                    $params[] = $data['condition2'][$index] === 'on' ? 1 : 0;
                } else {
                    echo 'Certaines informations pour les tiers de confiance sont manquantes.<br>';
                    return;
                }
            }

            $types = str_repeat('i', count($params)); 
            array_unshift($params, $types);

            call_user_func_array([$stmtTiers, 'bind_param'], refValues($params));

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

$mysqli->close();

/**
 */
function refValues($arr) {
    $refs = [];
    foreach ($arr as $key => $value) {
        $refs[$key] = &$arr[$key];
    }
    return $refs;
}
?>
