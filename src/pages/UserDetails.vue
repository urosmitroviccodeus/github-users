<template>
  <el-row class="details">
    <el-col :offset="1" :xs="22" :sm="22" :md="6" :lg="6" :xl="6">
      <template v-if="userDetails.user">
        <card title="User details">
          <el-row class="column" type="flex" align="middle">
            <img
              class="details__avatar"
              :src="userDetails.user.avatar"
              alt="avatar"
            />
            <p>{{ userDetails.user.login }}</p>
            <a class="link-style" :href="userDetails.user.url" target="_blank"
              >View GitHub profile</a
            >
          </el-row>
        </card>
        <el-button
          class="details__button"
          type="primary"
          @click="$router.push({ name: 'UserList' })"
          >Back to list</el-button
        >
      </template>
    </el-col>
    <el-col
      class="details__list"
      :offset="1"
      :xs="22"
      :sm="22"
      :md="15"
      :lg="15"
      :xl="15"
    >
      <card
        v-for="(detailValue, detailKey) in userDetails"
        v-show="detailKey !== 'user'"
        :key="detailKey"
        :title="detailKey"
        bottomMargin
      >
        <template v-if="detailValue.length">
          <a
            class="details__list__item link-style"
            v-for="(valueItem, i) in detailValue"
            :href="valueItem.url"
            target="_blank"
            :key="i"
            >{{ valueItem.name }}</a
          >
        </template>
        <p v-else>No data available</p>
      </card>
    </el-col>
  </el-row>
</template>

<script>
import Card from '../components/Card';
import { mapGetters } from 'vuex';

export default {
  components: { Card },
  created() {
    if (!this.userDetails.user) {
      this.$router.push({ name: 'UserList' });
    }
  },
  computed: {
    ...mapGetters(['userDetails'])
  }
};
</script>

<style lang="scss" scoped>
.details {
  &__button {
    width: 100%;
    margin: 20px 0;
  }

  &__avatar {
    height: auto;
    width: 150px;
    border: 2px solid $--color-primary;
    border-radius: 50%;
  }

  &__list {
    &__item {
      display: inline-block;
      margin: 5px 10px 5px 0;
    }
  }
}

.link-style {
  position: relative;
  padding-bottom: 2px;
  color: $--color-primary;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: $--color-primary;
    transform-origin: left;
    transform: scaleX(0);
    transition: 0.4s ease-in-out;
  }

  &:hover::before {
    transform: scaleX(1);
  }
}

.column {
  flex-direction: column;
}
</style>
