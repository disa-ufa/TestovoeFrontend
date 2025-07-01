<template>
  <el-table :data="items" style="width: 100%">
    <el-table-column v-for="col in columns"
      :key="col.field"
      :prop="col.field"
      :label="col.label" />
  </el-table>
</template>
<script setup>
defineProps(['items', 'columns'])
</script>
