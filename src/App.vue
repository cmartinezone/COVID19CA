<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions("Covid", ["getCovidData"])
  },
  created() {
    this.getCovidData();
  }
};
</script>
