<template>
  <el-pagination
    :current-page="modelValue"
    :page-size="pageSize"
    :total="total"
    @current-change="(p) => $emit('update:modelValue', p)"
    layout="prev, pager, next">
  </el-pagination>
</template>
<script setup>
defineProps(['modelValue', 'total', 'pageSize'])
defineEmits(['update:modelValue'])
</script>
