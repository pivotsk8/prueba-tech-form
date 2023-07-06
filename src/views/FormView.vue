<script setup>
import { onMounted } from 'vue';
import { useStore } from '../stores/store';
import Form from '../components/Form.vue';

const store = useStore();

onMounted(() => {
  store.getUsers();
});
</script>
<template>
  <v-main>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <Form />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
