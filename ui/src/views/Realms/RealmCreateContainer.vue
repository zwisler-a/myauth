<template>
  <section>
    <transition name="fade">
      <loader v-if="!realm" />
      <div v-else class="card">
        <h1>Create Realm</h1>
        <realm-detail v-model="realm" />
        <h1 class="sub-header">Realm properties</h1>
        <realm-properties v-model="realm.properties" />
        <button @click="create" class="action">Create</button>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notification } from "../../services/notif.service";
import RealmDetail from "./RealmDetail.vue";
import Loader from "../../components/Loader.vue";
import { RealmService } from "../../services/realm.service";
import { Realm } from "../../model/realm.interface";
import RealmProperties from "./RealmProperties.vue";
import { EventService } from "../../services/event.service";
import { AppEvent } from "../../model/event.enum";
import { PropService } from "../../services/prop.service";

@Component({ components: { RealmDetail, RealmProperties, Loader } })
export default class RealmCreateContainer extends Vue {
  public realm: Realm = new Realm();
  private realmService = RealmService.getInstance();
  private propService: PropService = PropService.getInstance();

  public async create() {
    try {
      const realm = this.realm as any;
      const newRealm = await this.realmService.createRealm({
        name: realm.name,
        domains: realm.domains,
        secret: realm.secret,
        customStyles: realm.customStyles
      });
      await this.propService.updateDefinitions(newRealm.id, realm.properties);
      EventService.dispatch(AppEvent.REALM_CHANGED);
      this.$router.push("/realms/" + newRealm.id);
      Notification.show("Realm created");
    } catch (e) {
      Notification.show("Realm could not be created!", undefined, "failure");
    }
  }
}
</script>
