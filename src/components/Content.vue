<template>
  <v-container>
    <h1 class="text-center mb-4">
      Créez votre attestation de manière simplifiée
    </h1>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#385F73" dark @click="clickModifsInfos">
          <v-card-title class="headline"
            ><font-awesome-icon
              :icon="['fas', 'fa-pencil-alt']"
              class="mr-3"
            />Modifier vos informations personnelles</v-card-title
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    modalModifsInfos: false,
  }),

  methods: {
    clickModifsInfos() {
      console.log("Ok");
    },
  },
};
</script>
