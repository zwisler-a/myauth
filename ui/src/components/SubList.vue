<template>
  <nav>
    <input v-model="searchQuery" v-bind:placeholder="searchPlaceholder" />
    <ul>
      <li
        @click="selectItem(item)"
        v-for="item in displayedItems"
        v-bind:key="item.id"
      >{{item.name}}</li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SubList extends Vue {
  @Prop() public searchPlaceholder!: string;
  @Prop() public items!: Array<{ id: any, name: string }>;

  public searchQuery = '';

  constructor() {
    super();
  }

  public get displayedItems() {
    return this.items.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  public selectItem(data: any) {
    this.$emit('clicked', data);
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  display: flex;
  flex-direction: column;
}
</style>
