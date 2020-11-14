<template>
  <q-page class="fit non-selectable">
    <div class="row q-pa-sm q-pt-md justify-center">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="row q-pb-md q-col-gutter-md">
          <div
            class="col-6"
            v-for="(protect, index) in protections"
            :key="index"
          >
            <q-card class="card-border text-white cursor-pointer">
              <q-card-section class="q-pt-none q-pb-xs">
                <div class="column">
                  <div class="row">
                    <div class="col-4 q-pt-xs">
                      <div
                        class="text-left text-subtitle1 text-white"
                        style="font-size: 20px"
                      >
                        <!--    {{ protect.title }} -->
                        <q-avatar
                          size="100px"
                          font-size="52px"
                          color="teal"
                          text-color="white"
                          icon="directions"
                        />
                      </div>
                    </div>

                    <div class="col-8 q-pt-xs">
                      <div class="text-italic text-right text-white">
                        {{ protect.title }}
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
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
      protections: [
        {
          step: 1,
          title: "Lavarse",
          icon: "",
          description: "",
          media: { img: "", video: "" },
        },
        {
          step: 2,
          title: "Usar",
          icon: "",
          description: "",
          media: { img: "", video: "" },
        },
        {
          step: 2,
          title: "Cubrirse",
          icon: "",
          description: "",
          media: { img: "", video: "" },
        },
        {
          step: 4,
          title: "Limpiar",
          icon: "",
          description: "",
          media: { img: "", video: "" },
        },
      ],
    };
  },
  methods: {
    ...mapActions("Covid", ["set_layoutTitle"]),
  },
  mounted() {
    this.set_layoutTitle("Protégete");
  },
};
</script>
