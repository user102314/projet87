CREATE TABLE abonnes (
    id_abonne INT AUTO_INCREMENT PRIMARY KEY,
    civilite VARCHAR(10) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    date_naissance DATE NOT NULL,
    fixe VARCHAR(20),
    mobile VARCHAR(20) NOT NULL,
    adresse VARCHAR(100) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    ville VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    lieu_naissance VARCHAR(100) NOT NULL,
    date_ab DATE NOT NULL,
    ref VARCHAR(100) NOT NULL

);

CREATE TABLE medecins_traitants (
    id_medecin INT AUTO_INCREMENT PRIMARY KEY,
    id_abonne INT,
    nom_medecin VARCHAR(100) NOT NULL,
    nom_famille VARCHAR(100),
    ville_medecin VARCHAR(50),
    pas_de_medecin BOOLEAN NOT NULL,
    dossier_medical ENUM('oui', 'non') NOT NULL,
    urgence_medical ENUM('oui', 'non') NOT NULL,
    FOREIGN KEY (id_abonne) REFERENCES abonnes(id_abonne)
);

CREATE TABLE tiers_confiance (
    id_tiers INT AUTO_INCREMENT PRIMARY KEY,
    id_abonne INT,
    famille BOOLEAN,
    amis BOOLEAN,
    auxiliaire BOOLEAN,
    voisins BOOLEAN,
    ordre INT NOT NULL,
    prenom VARCHAR(50),
    nom VARCHAR(50),
    email VARCHAR(100),
    telephone VARCHAR(20),
    condition1 BOOLEAN,
    condition2 BOOLEAN,
    FOREIGN KEY (id_abonne) REFERENCES abonnes(id_abonne)
);
