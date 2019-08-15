<template>
  <div class="wrapper">
    <div class="trash-solid icon"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 23px;
  height: 23px;
  display: inline-block;
}
.trash-solid.icon {
  color: var(--failure-color);
  position: absolute;
  margin-left: 5px;
  margin-top: 7px;
  width: 9px;
  height: 10px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
  border-radius: 0 0 2px 2px;
  background-color: currentColor;
}

.trash-solid.icon:before {
  content: "";
  position: absolute;
  left: -4px;
  top: -2px;
  width: 17px;
  height: 1px;
  background-color: currentColor;
}

.trash-solid.icon:after {
  content: "";
  position: absolute;
  left: 0px;
  top: -5px;
  width: 7px;
  height: 2px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-top: solid 1px currentColor;
  background-color: currentColor;
  border-radius: 4px 4px 0 0;
}
</style>
