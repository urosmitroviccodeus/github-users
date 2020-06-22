<template>
  <el-card
    :body-style="{
      padding: noPadding ? 0 : '20px'
    }"
    :style="{
      'margin-bottom': bottomMargin ? '20px' : 0
    }"
    class="card"
  >
    <div class="card__header" slot="header">
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  props: { title: String, noPadding: Boolean, bottomMargin: Boolean }
};
</script>

<style>
.el-card__header {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
.card {
  border: none !important;

  &__header {
    padding: 15px 20px;
    text-transform: capitalize;
    color: $--color-white;
    background-color: $--color-primary;
  }
}
</style>
