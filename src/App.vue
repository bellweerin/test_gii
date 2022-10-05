<template>
  <div id="app">
 
    <DataTable></DataTable>
    <FormData></FormData>
    <Test></Test>


    <router-view></router-view>
  </div>
</template>

<script>
import DataTable from './components/DataTable'
import FormData from './components/FormData';
import Test from '../views/Test'


export default {
  name: 'App',
  components: {
    
    DataTable,FormData,Test
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
