<template>
  <div>
    <h2>Stocks</h2>
    <Filters :filters="filters" v-model="filtersModel" />
    <DataChart :items="items" field="quantity" labelField="date" />
    <DataTable :items="items" :columns="columns" />
    <Pagination v-model="currentPage" :total="total" :pageSize="pageSize" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { fetchData } from '../api';
import Filters from '../components/Filters.vue';
import DataTable from '../components/DataTable.vue';
import DataChart from '../components/DataChart.vue';
import Pagination from '../components/Pagination.vue';

// Сегодняшняя дата по умолчанию
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const defaultDateFrom = `${yyyy}-${mm}-${dd}`;

const columns = [
  { label: 'Date', field: 'date' },
  { label: 'SKU', field: 'sku' },
  { label: 'Quantity', field: 'quantity' }
];

const filters = [
  { label: 'Дата', field: 'dateFrom', type: 'text' }
];

const filtersModel = reactive({
  dateFrom: defaultDateFrom
});

const items = ref([]);
const currentPage = ref(1);
const pageSize = 20;
const total = ref(0);

function loadData() {
  if (!filtersModel.dateFrom) {
    items.value = [];
    total.value = 0;
    return;
  }
  fetchData('/api/stocks', {
    dateFrom: filtersModel.dateFrom,
    page: currentPage.value,
    limit: pageSize
  })
    .then(res => {
      items.value = res.data.data || res.data;
      total.value = res.data.total || items.value.length;
    })
    .catch(e => {
      console.error(e);
      items.value = [];
      total.value = 0;
    });
}

onMounted(loadData);
watch([filtersModel, currentPage], loadData, { deep: true });
</script>
