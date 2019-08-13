<template>
  <nav>
    <input v-model="searchQuery" v-bind:placeholder="searchPlaceholder" />
    <transition name="fade">
      <ul v-if="items.length">
        <li
          @click="selectItem(item)"
          v-for="item in displayedItems"
          v-bind:key="item.id"
        >{{item.name}}</li>
      </ul>
      <loader v-else></loader>
    </transition>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Loader from './Loader.vue';

@Component({ components: { Loader } })
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
  flex: 0 0 190px;
  min-width: 190px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li:hover {
  background: #f0f0f0;
  cursor: pointer;
  user-select: none;
}
li {
  padding: 4px 16px;
}
</style>
