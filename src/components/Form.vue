<script setup>
import Swal from 'sweetalert2';
import { reactive, ref } from 'vue';
import { useValuesFormStore } from '../stores/valuesForm';
import { useStore } from '../stores/store';
import { storeToRefs } from 'pinia';

const valuesFromStore = useValuesFormStore();
const store = useStore();
const { selectExpertises, selectCulturalRights, selectNacs } =
  storeToRefs(valuesFromStore);

const userValues = reactive({
  activityName: '',
  culturalRightId: '',
  nacId: '',
  activityDate: '',
  startTime: '',
  finalHour: '',
  expertiseId: '',
});

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio',
  validateFinalHour: (value) => {
    if (userValues.startTime && value) {
      const startTime = new Date(`1970-01-01T${userValues.startTime}`);
      const endTime = new Date(`1970-01-01T${value}`);

      if (startTime.getTime() === endTime.getTime()) {
        return true; // La hora final es igual a la hora de inicio, válido
      } else if (startTime < endTime) {
        return true; // La hora final es mayor que la hora de inicio, válido
      } else {
        return 'La hora final debe ser mayor que la hora de inicio';
      }
    }
    return true;
  },
};

const formRef = ref(null);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const submit = async () => {
  if (
    formRef.value &&
    Object.values(userValues).every((value) => value !== '')
  ) {
    const isValid = await formRef.value.validate();

    if (userValues.startTime && userValues.finalHour) {
      const startTime = new Date(`1970-01-01T${userValues.startTime}`);
      const endTime = new Date(`1970-01-01T${userValues.finalHour}`);

      if (startTime > endTime) {
        Swal.fire({
          icon: 'error',
          title: 'Por favor verifica tus hora!',
          text: 'La hora inicial debe ser mayor a la hora final',
        });
        return;
      }
    }

    if (isValid) {
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
      });
      store.addUser(userValues);
      Object.assign(userValues, {
        activityName: '',
        activityDate: '',
        startTime: '',
        culturalRightId: '',
        expertiseId: '',
        finalHour: '',
        nacId: '',
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Te faltan campos!',
      text: 'Por favor verifica que todos los campos estan llenos',
    });
  }
};
</script>

<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <VRow>
        <VCol>
          <label style="font-size: 300%">Formulario</label>
        </VCol>
        <VCol>
          <label style="font-size: 200%; direction: rtl">Consecutivo</label>
        </VCol>
      </VRow>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="userValues.activityName"
            :rules="[rules.required]"
            label="NOMBRE ACTIVIDAD *"
            required />

          <v-text-field
            v-model="userValues.startTime"
            :rules="[rules.required]"
            label="HORA INICIO *"
            type="time"
            required />

          <v-select
            v-model="userValues.culturalRightId"
            label="Derechos culturales *"
            :rules="[rules.required]"
            :items="selectCulturalRights"
            required />

          <v-select
            v-model="userValues.expertiseId"
            label="EXPERTICIA *"
            :items="selectExpertises"
            :rules="[rules.required]"
            required />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="userValues.activityDate"
            :rules="[rules.required]"
            label="FECHA *"
            type="date"
            required />

          <v-text-field
            v-model="userValues.finalHour"
            :rules="[rules.required, rules.validateFinalHour]"
            label="HORA FINAL *"
            type="time"
            required />

          <v-select
            v-model="userValues.nacId"
            label="NAC *"
            :items="selectNacs"
            :rules="[rules.required]"
            required />

          <VRow>
            <VCol cols="auto">
              <v-btn color="cyan-lighten-1" block size="x-large" type="submit">
                Accept
              </v-btn>
            </VCol>
          </VRow>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
