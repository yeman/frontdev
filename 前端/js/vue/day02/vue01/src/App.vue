<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount() {
    document.title = '111';
  }
}
</script>

<style>
</style>
