<script setup>
import Filters from '../components/Filters.vue';
import { useStore } from '../stores/store';
import { storeToRefs } from 'pinia';

const store = useStore();
const { headers, users } = storeToRefs(store);
</script>
<template>
  <v-card class="mx-auto my-12" max-width="100%" color="cyan-lighten-1">
    <v-card-title>Tabla de postres</v-card-title>

    <v-card class="mx-auto my-12" max-width="98%">
     
          <Filters />
     
    </v-card>

    <v-card-text>
      <v-table fixed-header height="300px">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" class="text-left">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.name">
            <td v-for="(value, key) in item" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
