<template>
  <q-page class="fit non-selectable">
    <div class="row q-pa-sm q-pt-md justify-center">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <h6 class="text-center q-pa-md">
          Información addicional, en desarollo...
          <q-icon size="md" name="mdi-account-hard-hat" />
        </h6>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "pageSymtoms",

  data() {
    return {
      symptoms: [
        { name: "Fiebre", rate: "89%" },
        { name: "Tos seca", rate: "68%" },
        { name: "Fatiga", rate: "38%" },
        { name: "Dificultad para respirar", rate: "19%" },
        { name: "Dolor articular y muscular", rate: "15%" },
        { name: "Dolor de garganta", rate: "14%" },
        { name: "Dolor de cabeza", rate: "14%" },
        { name: "Resfriado", rate: "11%" },
        { name: "Congestion nasal", rate: "5%" },
        { name: "Náuseas y vómitos ", rate: "5%" },
        { name: "Diarrea", rate: "4%" }
      ]
    };
  },
  methods: {
    ...mapActions("Covid", ["set_layoutTitle"])
  },
  mounted() {
    this.set_layoutTitle("Información");
  }
};
</script>
