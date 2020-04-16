<template>
  <v-app>
    <Navbar />
    <v-content>
      <MessageHaut />
      <Content />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MessageHaut from "./components/MessageHaut";

export default {
  name: "App",

  components: {
    Content,
    Navbar,
    Footer,
    MessageHaut,
  },

  data: () => ({
    //
  }),
};
</script>
