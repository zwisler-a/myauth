<template>
  <main>
    <sub-list
      v-if="realms.length"
      v-on:clicked="showRealm"
      v-bind:items="realms"
      searchPlaceholder="Realms"
    ></sub-list>
    <div v-else>Loading...</div>
    <div class="seperator"></div>
    <router-view :key="$route.fullPath"></router-view>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SubList from '../components/SubList.vue';
import { RealmService } from '../services/realm.service';

@Component({ components: { SubList } })
export default class Realms extends Vue {
  realms: any[] = [];

  private realmService: RealmService;
  constructor() {
    super();
    this.realmService = RealmService.getInstance();
  }

  public mounted() {
    this.loadRealms();
  }

  async loadRealms() {
    this.realms = await this.realmService.getRealms()
  }

  async showRealm(realm: any) {
    try {
      await this.$router.push({ path: `/realms/${realm.id}` });
    } catch (e) { }
  }
}
</script>
<style scoped>
main {
  display: flex;
  flex: 1 1 auto;
  padding: 16px;
}
.seperator {
  border: solid 1px lightgray;
  margin: -16px 16px -16px 16px;
}
</style>
