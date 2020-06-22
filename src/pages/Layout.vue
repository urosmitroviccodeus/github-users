<template>
  <el-container>
    <el-header height="60px">
      <topbar></topbar>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Topbar from '../components/Topbar';

export default {
  components: { Topbar }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}

.el-main {
  padding: 20px 0;
}
</style>
