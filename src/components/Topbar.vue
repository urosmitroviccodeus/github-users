<template>
  <el-row class="topbar" type="flex" align="middle" justify="space-between">
    <span>Hello, {{ email }}</span>
    <el-dropdown @command="handleClick">
      <i class="el-icon-setting topbar__settings"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-row>
</template>

<script>
import jwt from 'jsonwebtoken';

export default {
  created() {
    this.email = jwt.decode(localStorage.getItem('token')).email;
  },
  data: () => ({
    email: ''
  }),
  methods: {
    handleClick(command) {
      if (command === 'logout') {
        localStorage.clear();
        this.$router.push({ name: 'Login' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.topbar {
  height: 100%;
  padding: 0 20px;
  border-bottom: 1px solid $--border-color-base;
  background-color: $--bar-background;

  &__settings {
    font-size: 1.4rem;
  }
}
</style>
