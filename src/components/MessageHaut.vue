<template>
  <v-container>
    <v-alert type="error" v-model="alert" dismissible>
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: true,
      message:
        "Mesdames, Messieurs. Nous vous rappelons que nous subissons actuellement un confinement strictes afin de réduire la contamination liée au virus COVID-19. Toute sortie n'est pas recommandé, sauf en cas de déplacement nécessaire et immédiat. Cette application n'est pas une application officielle. Nous avons repris une partie du code de l'application officielle. Le PDF générée sur cette application est entièrement valable en cas de contrôle. Notez aussi que nous ne stockons aucune donnée vous concernant (tout est stocké et reste sur votre appareil).",
    };
  },
};
</script>
