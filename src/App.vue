<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <VApp>
    <VMain>
      <VContainer fluid fill-height>
        <RouterView />
      </VContainer>
    </VMain>
  </VApp>
</template>
