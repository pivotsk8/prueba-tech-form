import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useValuesFormStore = defineStore('valuesForm', () => {
  const selectExpertises = ref([
    'Artes plásticas',
    'Teatro',
    'Música',
    'Danza',
    'Cocina tradicional',
    'Juegos tradicionales',
    'Promoción de lectura',
  ]);

  const selectCulturalRights = ref([
    'Identidad y patrimonios culturales',
    'Referencias a comunidades culturales',
    'Acceso y participación en la vida cultural',
    'Educación y formación',
    'Información y comunicación',
    'Cooperación cultural',
  ]);

  const selectNacs = ref([
    'ALCALÁ',
    'ANDALUCÍA',
    'ANSERMANUEVO',
    'ARGELIA',
    'BOLÍVAR',
    'BUENAVENTURA',
    'BUGA',
  ]);

  const enters = ref([5, 10, 15]);

  const state = ref(['Aprobado', 'Rechazado', 'En revisión', ,]);
  return {
    selectExpertises,
    selectCulturalRights,
    selectNacs,
    state,
    enters,
  };
});
