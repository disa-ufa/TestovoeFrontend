<template>
  <div>
    <Bar :data="chartData" :options="options" />
  </div>
</template>
<script setup>
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
const props = defineProps(['items', 'field', 'labelField'])

const chartData = computed(() => ({
  labels: props.items.map(i => i[props.labelField]),
  datasets: [{
    label: props.field,
    data: props.items.map(i => i[props.field])
  }]
}))
const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
<style scoped>
div { height: 300px; }
</style>
