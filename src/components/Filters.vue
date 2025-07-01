<template>
  <el-form :inline="true" @submit.prevent>
    <el-form-item v-for="filter in filters" :label="filter.label" :key="filter.field">
      <el-input v-if="filter.type === 'text'"
                v-model="model[filter.field]"
                :placeholder="filter.label"
                @input="emitChange"/>
      <el-date-picker v-if="filter.type === 'date'"
                v-model="model[filter.field]"
                type="date"
                :placeholder="filter.label"
                @change="emitChange"/>
      <el-select v-if="filter.type === 'select'"
                 v-model="model[filter.field]"
                 @change="emitChange">
        <el-option
          v-for="opt in filter.options"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="clear">Сброс</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(['modelValue', 'filters'])
const emit = defineEmits(['update:modelValue'])

const model = reactive({ ...props.modelValue })

watch(model, () => emit('update:modelValue', { ...model }), { deep: true })

function clear() {
  Object.keys(model).forEach(k => model[k] = '')
  emit('update:modelValue', { ...model })
}
function emitChange() {
  emit('update:modelValue', { ...model })
}
</script>
