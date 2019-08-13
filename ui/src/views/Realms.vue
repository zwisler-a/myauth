<template>
  <main>
    <sub-list
      v-on:clicked="showRealm"
      v-bind:items="realms"
      createLink="/realms/create"
      searchPlaceholder="Realms"
    ></sub-list>
    <router-view :key="$route.fullPath"></router-view>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SubList from '../components/SubList.vue';
import { RealmService } from '../services/realm.service';

@Component({ components: { SubList } })
export default class Realms extends Vue {
  public realms: any[] = [];
  private realmService: RealmService;
  constructor() {
    super();
    this.realmService = RealmService.getInstance();
  }

  public mounted() {
    this.loadRealms();
  }

  public async showRealm(realm: any) {
    try {
      await this.$router.push({ path: `/realms/${realm.id}` });
    } catch (e) {
      e = e;
    }
  }

  private async loadRealms() {
    this.realms = await this.realmService.getRealms();
  }
}
</script>
<style scoped>
main {
  display: flex;
  flex: 1 1 auto;
}
</style>
