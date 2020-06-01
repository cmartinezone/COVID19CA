<template>
  <q-select
    rounded
    outlined
    hide-dropdown-icon
    style="font-size:18px;"
    popup-content-style="font-size:16px;"
    v-model="setCountry"
    :options="countryOptions"
    label="Selecionar País"
    no-error-icon
  >
    <template v-slot:prepend>
      <q-icon color="primary" name="mdi-map-marker" />
    </template>
  </q-select>
</template>

<script>
import { analytics } from "boot/firebaseAnalytics";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CountrySelection",
  data() {
    return {
      countryOptions: [
        "Todo Centro America",
        "El Salvador",
        "Honduras",
        "Guatemala",
        "Costa Rica",
        "Panama",
        "Nicaragua",
        "Belize"
      ]
    };
  },
  methods: {
    ...mapActions("Covid", ["set_select_country"])
  },
  computed: {
    ...mapGetters("Covid", ["get_select_country"]),
    setCountry: {
      get() {
        return this.get_select_country;
      },
      set(value) {
        this.set_select_country(value);
      }
    }
  }
};
</script>
