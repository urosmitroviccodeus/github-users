<template>
  <el-row class="login" type="flex" justify="center" align="middle">
    <el-col :xs="22" :sm="22" :md="12" :lg="6" :xl="6">
      <card title="Login">
        <form>
          <label class="login__label">Email</label>
          <el-input
            placeholder="Please enter your email"
            v-model="email"
            @blur="validateEmail"
          ></el-input>
          <transition name="el-zoom-in-top">
            <p class="login__error" v-show="emailError">
              Please enter a valid email!
            </p>
          </transition>
          <label class="login__label">Password</label>
          <el-input
            placeholder="Please enter your password"
            v-model="password"
            show-password
          ></el-input>
          <el-row type="flex" justify="center">
            <el-button
              class="login__button"
              type="primary"
              :disabled="buttonDisabled"
              @click="login"
              >Login</el-button
            >
          </el-row>
        </form>
      </card>
    </el-col>
  </el-row>
</template>

<script>
import Card from '../components/Card';
import jwt from 'jsonwebtoken';

export default {
  components: { Card },
  data: () => ({
    email: '',
    emailError: false,
    password: ''
  }),
  computed: {
    buttonDisabled() {
      return !(this.email && !this.emailError && this.password);
    }
  },
  methods: {
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
      this.emailError = !regex.test(String(this.email).toLowerCase());
    },
    login() {
      if (!this.buttonDisabled) {
        const token = jwt.sign(
          { exp: Math.floor(Date.now() / 1000) + 60 * 60, email: this.email },
          'a-very-secret-key'
        );
        const refreshToken = jwt.sign(
          { exp: Math.floor(Date.now() / 1000) + 120 * 120 },
          'a-very-secret-refresh-key'
        );

        localStorage.setItem('token', token);
        localStorage.setItem('refresh-token', refreshToken);

        this.$router.push({ name: 'UserList' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.login {
  height: 100vh;
  background: linear-gradient(-45deg, #9374ee, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;

  &__label {
    display: block;
    margin-top: 20px;
    margin-bottom: 5px;
  }

  &__label:first-child {
    margin-top: 0;
  }

  &__error {
    margin: 5px 0 0;
    color: $--color-danger;
  }

  &__button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
