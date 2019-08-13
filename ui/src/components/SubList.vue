<template>
  <nav>
    <div class="header">
      <input v-model="searchQuery" v-bind:placeholder="searchPlaceholder" />
      <router-link class="new" v-bind:to="createLink">+</router-link>
    </div>
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
  @Prop({ default: 'create' }) public createLink!: string;
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
  padding: 0px 0px 16px 0px;

  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
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
.header .new {
  background: none;
  color: var(--font-color);
  border-radius: 0;
  box-shadow: none;
  padding: 10px 14px;
  text-decoration: none;
  background: white;
  border: solid 1px lightgray;
  border-left: none;
}
.header {
  display: flex;
}
</style>
