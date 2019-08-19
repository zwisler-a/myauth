<template>
  <div>
    <div class="menu-wrapper" @click="toggleExpansion">
      <slot name="menu"></slot>
      <transition name="fade">
        <div class="menu" v-if="expanded">
          <slot name="menu-items"></slot>
        </div>
      </transition>
    </div>
    <div v-if="expanded" class="backdrop" @click="toggleExpansion"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Menu extends Vue {
  public expanded = false;
  public toggleExpansion() {
    this.expanded = !this.expanded;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  position: absolute;
  box-shadow: 0px 1px 3px -1px rgba(0, 0, 0, 0.5);
  background: white;
  padding: 8px 0;
  box-sizing: border-box;
  color: var(--font-color);
  width: 100%;
  display: flex;
  flex-direction: column;
}
.menu-wrapper {
  position: relative;
  z-index: 5001;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5000;
}
</style>
