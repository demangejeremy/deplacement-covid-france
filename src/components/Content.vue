<template>
  <v-container>
    <v-snackbar v-model="snackbar" color="error" :timeout="6000" :top="true">
      L'attestation vient de se télécharger sur votre appareil.
      <v-btn dark text @click="snackbar = false">
        Fermer
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            ><b>Modifier vos informations personnelles</b></span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="prenom"
                  label="Prénom*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="nom"
                  label="Nom*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dateNaissance"
                  label="Date de naissance (au format jj/mm/aaaa)*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="lieuNaissance"
                  label="Lieu de naissance*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="adresse"
                  label="Adresse*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="ville"
                  label="Ville*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="codePostal"
                  label="Code Postal*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small
            >* Les éléments marqués d'un astérisques sont obligatoires.</small
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteLocal"
            >Supprimer les données</v-btn
          >
          <v-btn color="blue darken-1" text @click="closeWindow">Fermer</v-btn>
          <v-btn color="white--text blue darken-1" @click="saveWindow"
            >Enregistrer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1 class="text-center mb-4">
      Créez votre attestation de manière simplifiée
    </h1>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#385F73" dark @click="clickModifsInfos">
          <v-card-title class="headline">
            Modifier vos informations personnelles</v-card-title
          >

          <v-card-subtitle
            >Ajoutez les informations nécessaires à écrire sur votre formulaire
            avant d'en générer un (les informations personnelles sont stockées
            de manière sécurisées et uniquement sur votre
            appareil).</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
    <template v-if="winView">
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-card color="#E84741" dark @click="depGenerate('travail')">
            <v-card-title class="headline">
              Déplacement pour le travail</v-card-title
            >

            <v-card-subtitle
              >Déplacements entre le domicile et le lieu d’exercice de
              l’activité professionnelle, lorsqu'ils sont indispensables à
              l'exercice d’activités ne pouvant être organisées sous forme de
              télétravail ou déplacements professionnels ne pouvant être
              différés.</v-card-subtitle
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card color="#E84741" dark @click="depGenerate('courses')">
            <v-card-title class="headline">
              Déplacement pour les achats</v-card-title
            >

            <v-card-subtitle
              >Déplacements pour effectuer des achats de fournitures nécessaires
              à l’activité professionnelle et des achats de première nécessité
              dans des établissements dont les activités demeurent
              autorisées.</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-card color="#E84741" dark @click="depGenerate('sante')">
            <v-card-title class="headline">
              Déplacement pour motif de santé</v-card-title
            >

            <v-card-subtitle
              >Consultations et soins ne pouvant être assurés à distance et ne
              pouvant être différés ; consultations et soins des patients
              atteints d'une affection de longue durée.</v-card-subtitle
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card color="#E84741" dark @click="depGenerate('famille')">
            <v-card-title class="headline">
              Déplacement pour garde d'enfants</v-card-title
            >

            <v-card-subtitle
              >Déplacements pour motif familial impérieux, pour l’assistance aux
              personnes vulnérables ou la garde d’enfants.</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-card color="#E84741" dark @click="depGenerate('sport')">
            <v-card-title class="headline"> Déplacement bref</v-card-title>

            <v-card-subtitle
              >Déplacements brefs, dans la limite d'une heure quotidienne et
              dans un rayon maximal d'un kilomètre autour du domicile, liés soit
              à l'activité physique individuelle des personnes, à l'exclusion de
              toute pratique sportive collective et de toute proximité avec
              d'autres personnes, soit à la promenade avec les seules personnes
              regroupées dans un même domicile, soit aux besoins des animaux de
              compagnie.</v-card-subtitle
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card color="#E84741" dark @click="depGenerate('judiciaire')">
            <v-card-title class="headline">
              Déplacement pour convocation judiciaire</v-card-title
            >
            <v-card-subtitle class="mb-4"
              >Convocation judiciaire ou administrative.
            </v-card-subtitle>
            <br /><br /><br />
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#E84741" dark @click="depGenerate('missions')">
            <v-card-title class="headline">
              Déplacement pour missions...</v-card-title
            >

            <v-card-subtitle
              >Participation à des missions d’intérêt général sur demande de
              l’autorité administrative.</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <div>
        <p class="text-center mt-6">
          <b>
            Cliquez sur le bouton ci-haut pour poursuivre
          </b>
        </p>
        <p class="text-center mt-4">
          Veuillez modifier et compléter l'ensemble de vos données personnelles
          avant de générer une attestation (toutes les données sont conservées
          sur votre appareil)
        </p>
      </div>
    </template>
  </v-container>
</template>

<script>
import { GenererPDF } from "../generate/generate";

export default {
  data: () => ({
    // Snackbar
    snackbar: false,
    // Afficher les fenêtres
    winView: false,
    // Dialogs
    dialog: false,
    // Formulaire
    prenom: "",
    nom: "",
    dateNaissance: "",
    lieuNaissance: "",
    adresse: "",
    ville: "",
    codePostal: "",
  }),

  mounted() {
    this.prenom = localStorage.getItem("prenom");
    this.nom = localStorage.getItem("nom");
    this.dateNaissance = localStorage.getItem("dateNaissance");
    this.lieuNaissance = localStorage.getItem("lieuNaissance");
    this.adresse = localStorage.getItem("adresse");
    this.ville = localStorage.getItem("ville");
    this.codePostal = localStorage.getItem("codePostal");
    console.log("Test");
    console.log(this.prenom);
    if (this.prenom == undefined) {
      this.prenom = "";
    }
    if (this.nom == undefined) {
      this.nom = "";
    }
    if (this.dateNaissance == undefined) {
      this.dateNaissance = "";
    }
    if (this.lieuNaissance == undefined) {
      this.lieuNaissance = "";
    }
    if (this.adresse == undefined) {
      this.adresse = "";
    }
    if (this.ville == undefined) {
      this.ville = "";
    }
    if (this.codePostal == undefined) {
      this.codePostal = "";
    }
    if (
      this.prenom != "" &&
      this.nom != "" &&
      this.dateNaissance != "" &&
      this.lieuNaissance != "" &&
      this.adresse != "" &&
      this.ville != "" &&
      this.codePostal != ""
    ) {
      this.winView = true;
    }
  },

  methods: {
    clickModifsInfos() {
      this.dialog = true;
    },
    deleteLocal() {
      if (
        confirm(
          "Êtes-vous sûr de supprimer les données sauvegardées ? À noter que ces informations sont actuellement enregistrées sur votre appareil et que vous allez les supprimer de celui-ci après votre confirmation."
        )
      ) {
        // Supprimer du local storage
        localStorage.setItem("prenom", "");
        localStorage.setItem("nom", "");
        localStorage.setItem("dateNaissance", "");
        localStorage.setItem("lieuNaissance", "");
        localStorage.setItem("adresse", "");
        localStorage.setItem("ville", "");
        localStorage.setItem("codePostal", "");
        this.dialog = false;
        this.winView = false;
      }
    },
    closeWindow() {
      if (
        confirm(
          "Êtes-vous sûr de fermer la fenêtre sans sauvegarder vos modifications ? Tous les champs doivent être complétés avant de générer une attestation."
        )
      ) {
        this.dialog = false;
      }
    },
    saveWindow() {
      // Enregistrement en local storage
      localStorage.setItem("prenom", this.prenom);
      localStorage.setItem("nom", this.nom);
      localStorage.setItem("dateNaissance", this.dateNaissance);
      localStorage.setItem("lieuNaissance", this.lieuNaissance);
      localStorage.setItem("adresse", this.adresse);
      localStorage.setItem("ville", this.ville);
      localStorage.setItem("codePostal", this.codePostal);
      if (
        this.prenom != "" &&
        this.nom != "" &&
        this.dateNaissance != "" &&
        this.lieuNaissance != "" &&
        this.adresse != "" &&
        this.ville != "" &&
        this.codePostal != ""
      ) {
        this.winView = true;
      }
      // Alerte
      alert("Les modifications ont bien été prises en compte.");
      // Fermer le modal
      this.dialog = false;
    },
    depGenerate(item) {
      // Sauvegarde en local de l'élément à sauvegarder
      localStorage.setItem("reasons", item);
      GenererPDF();
      this.snackbar = true;
    },
  },
};
</script>
