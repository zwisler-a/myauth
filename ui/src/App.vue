<template>
  <div id="app">
    <navigation></navigation>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from './components/Navigation.vue';

@Component({
  components: { Navigation }
})
export default class Home extends Vue { }
</script>

<style>
</style>
