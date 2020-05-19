<template>
  <q-page class="q-pa-sm">
      <div class="row q-ma-sm">
        <div class="col-12">
          <q-card class="card-border text-white q-pa-sm">
            <q-intersection
              v-for="(symptom, index) in symptoms"
              :key="index"
            >
              <q-list  bordered class="rounded-borders bg-cardcolor">
                <q-item>
                  <q-item-section class="text-subtitle1 text-weight-light text-weight-light">
                    {{ symptom.name }}
                  </q-item-section>

                  <q-item-section class="text-subtitle1 text-weight-medium" side>
                    <q-chip
                      color="red"
                      text-color="white"
                      :label="symptom.rate"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-intersection>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

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
  }
};
</script>
*/
