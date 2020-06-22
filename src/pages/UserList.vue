<template>
  <el-row>
    <el-col :offset="1" :span="22">
      <card title="User list" noPadding>
        <el-row v-loading="isLoading" class="user-list">
          <el-col
            class="user-list__item"
            v-for="user in userList"
            :key="user.id"
          >
            <div
              class="user-list__item__wrapper"
              @click="() => handleUserSelect(user)"
            >
              <img
                class="user-list__item__avatar"
                :src="user.avatar_url"
                alt="avatar"
              />
              <p class="user-list__item__name">{{ user.login }}</p>
            </div>
          </el-col>
        </el-row>
      </card>
    </el-col>
  </el-row>
</template>

<script>
import Card from '../components/Card';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { Card },
  created() {
    if (!this.userList.length) {
      this.fetchUserList();
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'userList'])
  },
  methods: {
    ...mapActions(['fetchUserList', 'fetchUserDetails']),
    handleUserSelect(user) {
      this.fetchUserDetails(user).then(() => {
        this.$router.push({ name: 'UserDetails' });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list {
  &__item {
    border-bottom: 1px solid $--border-color-base;

    &:hover {
      cursor: pointer;
      background-color: $--table-row-hover-background-color;
    }

    &__wrapper {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 6px 10px;
    }

    &__avatar {
      height: 60px;
      width: auto;
      border: 2px solid $--color-primary;
      border-radius: 50%;
    }

    &__name {
      margin-left: 10px;
    }
  }
}
</style>
