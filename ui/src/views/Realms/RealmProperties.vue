<template>
  <div class="realm-properties">
    <div v-for="(prop, index) in properties" v-bind:key="index" :class="prop.state">
      <input :value="prop.name" @input="update(prop, $event)" />
      <div @click="remove(index)">
        <trash-icon></trash-icon>
      </div>
    </div>
    <div>
      <input v-model="newProp" placeholder="New prop" />
      <button @click="add">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import KeyValueInput from "../../components/KeyValueInput.vue";
import TrashIcon from "../../components/TrashIcon.vue";
import {
  PropertyDefinition,
  PropertyUIState
} from "../../model/property-definition.class";

@Component({ components: { KeyValueInput, TrashIcon } })
export default class RealmProperties extends Vue {
  @Prop({ default: [] }) public value!: any[];
  private newProp = "";
  get properties() {
    return this.value;
  }
  set properties(val: any[]) {
    this.value = val;
  }

  public update(prop: PropertyDefinition, event: any) {
    prop.name = event.target.value;
    if (prop.state !== PropertyUIState.TO_CREATE) {
      prop.state = PropertyUIState.TO_UPDATE;
    }
  }

  public remove(index: number) {
    if (this.value[index].state === PropertyUIState.TO_DELETE) {
      this.value[index].state = PropertyUIState.TO_UPDATE;
    } else if (this.value[index].state !== PropertyUIState.TO_CREATE) {
      this.value[index].state = PropertyUIState.TO_DELETE;
    } else {
      this.value.splice(index, 1);
    }
    this.$emit("input", this.properties);
    this.$forceUpdate();
  }
  public add() {
    this.value.push(
      new PropertyDefinition(this.newProp, PropertyUIState.TO_CREATE)
    );
    this.newProp = "";
  }
}
</script>

<style scoped>
.realm-properties > div.create {
  border-left: solid 4px var(--success-color);
}
.realm-properties > div.update {
  border-left: solid 4px var(--primary-color);
}
.realm-properties > div.delete {
  border-left: solid 4px var(--failure-color);
}
.realm-properties > div > input {
  flex: 1 1 auto;
}
.realm-properties > div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.realm-properties {
  display: flex;
  flex-direction: column;
}
</style>
