<template>
  <div>
    <h2>Incomes</h2>
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

// Дефолтные даты: с 2024-01-01 по сегодня
const defaultDateFrom = '2024-01-01';
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const defaultDateTo = `${yyyy}-${mm}-${dd}`;

const columns = [
  { label: 'Date', field: 'date' },
  { label: 'Quantity', field: 'quantity' },
  { label: 'Sum', field: 'sum' }
];

const filters = [
  { label: 'Дата с', field: 'dateFrom', type: 'text' },
  { label: 'Дата по', field: 'dateTo', type: 'text' }
];

const filtersModel = reactive({
  dateFrom: defaultDateFrom,
  dateTo: defaultDateTo
});

const items = ref([]);
const currentPage = ref(1);
const pageSize = 20;
const total = ref(0);

function loadData() {
  if (!filtersModel.dateFrom || !filtersModel.dateTo) {
    items.value = [];
    total.value = 0;
    return;
  }
  fetchData('/api/incomes', {
    dateFrom: filtersModel.dateFrom,
    dateTo: filtersModel.dateTo,
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
