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
import { Component, Vue } from "vue-property-decorator";
import SubList from "../components/SubList.vue";
import { RealmService } from "../services/realm.service";
import { AppEvent } from "../model/event.enum";
import { EventService } from "../services/event.service";
import { Subscription } from "../model/subscription.class";

@Component({ components: { SubList } })
export default class Realms extends Vue {
  public realms: any[] = [];
  private realmService: RealmService;
  private realmChangeSub!: Subscription;
  constructor() {
    super();
    this.realmService = RealmService.getInstance();
  }

  public mounted() {
    this.loadRealms();
    this.realmChangeSub = EventService.subscribe(
      AppEvent.REALM_CHANGED,
      this.loadRealms.bind(this)
    );
  }

  beforeDestroy() {
    if(this.realmChangeSub) this.realmChangeSub.unsubscribe();
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
