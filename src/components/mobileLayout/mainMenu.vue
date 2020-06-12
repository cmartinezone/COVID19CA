<template>
  <q-tabs
    align="center"
    indicator-color="transparent"
    switch-indicator
    no-caps
    active-color="primary"
    class="text-grey-7"
  >
    <q-route-tab
      :ripple="false"
      v-for="(menuTab, index) in mobileMenu"
      :key="index"
      :label="menuTab.label"
      :icon="menuTab.icon"
      :to="{ name: menuTab.to }"
      :replace="true"
      exact
    />
  </q-tabs>
</template>

<script>
export default {
  name: "mainMenu",
  data() {
    return {
      isMobile: this.$q.platform.is.mobile,
      mobileMenu: [
        {
          label: "Estadistícas",
          icon: "mdi-poll-box-outline",
          to: "home"
        },
        {
          label: "Síntomas",
          icon: "mdi-virus-outline",
          to: "symptoms"
        }
        /*     {
          label: 'Protégete',
          icon: 'mdi-shield-star-outline',
          to: 'selfprotection'
        },
        {
          label: 'Información',
          icon: 'mdi-information-outline',
          to: 'info'
        }  */
      ]
    };
  }
};
</script>
