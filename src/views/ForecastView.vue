<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import ForecastCard from '@/components/ForecastCard.vue'
</script>

<template>
  <AppLayout title="Weather Forecast" show-nav>
    <ForecastCard />
  </AppLayout>
</template>
