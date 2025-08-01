<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout title="Weather Search">
    <!-- Search Section -->
    <div class="mb-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <!-- Search content will go here -->
      </div>
    </div>

    <!-- Results Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Results</h2>
      <!-- Results list will go here -->
    </div>
  </AppLayout>
</template>
