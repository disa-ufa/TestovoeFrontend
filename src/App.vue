<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px">
      <el-menu :default-active="$route.path" router>
        <el-menu-item index="/incomes">Incomes</el-menu-item>
        <el-menu-item index="/orders">Orders</el-menu-item>
        <el-menu-item index="/sales">Sales</el-menu-item>
        <el-menu-item index="/stocks">Stocks</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
