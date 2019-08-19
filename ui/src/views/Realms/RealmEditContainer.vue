<template>
  <section>
    <transition name="fade">
      <loader v-if="!realm" />
      <div v-else class="card">
        <h1>
          Realm details
          <span @click="deleteRealm" class="delete-button">
            <trash-icon />
          </span>
        </h1>
        <realm-detail showId v-model="realm" />
        <h1 class="sub-header">Realm properties</h1>
        <realm-properties v-model="properties" />
        <button v-if="isDirty" @click="saveChanges">Save</button>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notification } from "../../services/notif.service";
import RealmDetail from "./RealmDetail.vue";
import Loader from "../../components/Loader.vue";
import TrashIcon from "../../components/TrashIcon.vue";
import { RealmService } from "../../services/realm.service";
import { AppEvent } from "../../model/event.enum";
import { Realm } from "../../model/realm.interface";
import RealmProperties from "./RealmProperties.vue";
import { EventService } from "../../services/event.service";
import { PropService } from "../../services/prop.service";
import { PropertyDefinition } from "../../model/property-definition.class";

@Component({ components: { RealmDetail, RealmProperties, Loader, TrashIcon } })
export default class RealmEditContainer extends Vue {
  public realm: Realm | null = null;
  public fetchedRealm = "";
  private realmService: RealmService = RealmService.getInstance();
  private propService: PropService = PropService.getInstance();
  public mounted() {
    if (this.$route.params.id) {
      this.loadRealm(this.$route.params.id);
    }
  }

  public async saveChanges() {
    try {
      const realm = this.realm || ({} as any);
      await this.realmService.updateRealm({
        id: realm.id,
        name: realm.name,
        domains: realm.domains,
        secret: realm.secret,
        customStyles: realm.customStyles
      });
      await this.propService.updateDefinitions(
        this.realm!.id,
        this.realm!.properties
      );
      this.loadRealm(this.realm!.id);
      EventService.dispatch(AppEvent.REALM_CHANGED);
      Notification.show("Realm updated");
    } catch (e) {
      Notification.show("Realm could not be updated!");
    }
  }

  public async deleteRealm() {
    try {
      const realm = this.realm || ({} as any);
      await this.realmService.deleteRealm(realm.id);
      EventService.dispatch(AppEvent.REALM_CHANGED);
      this.$router.push("/realms");
      Notification.show("Realm deleted!");
    } catch (e) {
      Notification.show("Realm could not be deleted!");
    }
  }

  private async loadRealm(id: string) {
    this.realm = await this.realmService.getRealm(id);
    this.fetchedRealm = JSON.stringify(this.realm);
  }

  get properties() {
    return this.realm!.properties;
  }

  set properties(value) {
    this.realm!.properties = value;
    this.fetchedRealm = "dirty";
  }

  get isDirty() {
    return this.fetchedRealm !== JSON.stringify(this.realm);
  }
}
</script>
<style scoped>
.delete-button {
  cursor: pointer;
  margin-left: auto;
  float: right;
}
</style>
