<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppCard from '@/components/AppCard.vue'
</script>

<template>
  <AppLayout title="Weather Search">
    <!-- Search Section -->
    <div class="mb-6">
      <AppCard title="Search">
        <!-- Search content will go here -->
      </AppCard>
    </div>

    <!-- Results Section -->
    <AppCard title="Results">
      <!-- Results list will go here -->
    </AppCard>
  </AppLayout>
</template>
