<script setup>
import { ref, reactive, watch } from 'vue';
import { useValuesFormStore } from '../stores/valuesForm';
import { storeToRefs } from 'pinia';
import { useStore } from '../stores/store';
import useDownloadFormat from '../helpers/useDownloadFormat';

const valuesFromStore = useValuesFormStore();
const { selectExpertises, selectCulturalRights, selectNacs, state, enters } =
  storeToRefs(valuesFromStore);
const store = useStore();
const { downloadPDF, downloadXLS } = useDownloadFormat();

const selectedCulturalRight = ref(['Todos', ...selectCulturalRights.value]);
const selectedNac = ref(['Todos', ...selectNacs.value]);
const selectExpertise = ref(['Todos', ...selectExpertises.value]);
const stateStore = ref(['Todos', ...state.value]);
const hours = reactive({
  inicial: '',
  final: '',
});

const handleCulturalRightsSelection = (value) => {
  store.filerForCulturalRigthId(value, {});
};
watch([hours], () => {
  hours.inicial && hours.final
    ? (store.hoursData(hours), store.filerForCulturalRigthId(''))
    : null;
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <VListItem>
          <v-select
            label="Derechos Culturales"
            :items="selectedCulturalRight"
            @update:modelValue="handleCulturalRightsSelection" />
          <v-select
            label="Nacs"
            :items="selectedNac"
            @update:modelValue="handleCulturalRightsSelection" />

          <v-select
            label="Experticia"
            :items="selectExpertise"
            @update:modelValue="handleCulturalRightsSelection" />
        </VListItem>
      </v-col>

      <v-col cols="12" md="4">
        <VListItem>
          <v-select
            label="Estado"
            :items="stateStore"
            @update:modelValue="handleCulturalRightsSelection" />

          <v-text-field
            label="Buscar"
            prepend-inner-icon="mdi-magnify"
            placeholder="Haz tu busqueda"
            @update:modelValue="handleCulturalRightsSelection" />
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="auto">
                <v-btn
                  density="default"
                  @click="downloadXLS"
                  color="red-lighten-2">
                  Exportar XLS
                </v-btn>
              </v-col>

              <v-col cols="auto">
                <v-btn
                  density="default"
                  @click="downloadPDF"
                  color="cyan-lighten-1">
                  Exportar PDF
                </v-btn>
              </v-col>

              <v-col cols="auto">
                <v-btn
                  density="default"
                  color="green-lighten-3"
                  @click="$router.push({ name: 'form' })">
                  Crear un registro
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </VListItem>
      </v-col>

      <v-col cols="12" md="4">
        <VListItem>
          <v-text-field
            v-model="hours.inicial"
            label="Fecha de inicio "
            type="date" />
          <v-text-field
            label="Fecha final "
            type="date"
            v-model="hours.final" />
          <v-select
            label="Entradas"
            :items="enters"
            @update:modelValue="handleCulturalRightsSelection" />
        </VListItem>
      </v-col>
    </v-row>
  </v-container>
</template>
