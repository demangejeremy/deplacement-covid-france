<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        color="white"
        link
        href="https://github.com/demangejeremy/deplacement-covid-france"
        target="_blank"
        text
        rounded
        class="my-2"
      >
        <font-awesome-icon :icon="['fab', 'github']" class="mr-3" />
        Voir le code source
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>© Jérémy DEMANGE</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {};
</script>
