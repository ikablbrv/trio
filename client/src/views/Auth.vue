<template lang="pug">

  v-row.auth( align="center" justify="center" )
    v-form.auth-form
      v-text-field.auth-form-field(
        v-model="$v.login.$model"
        solo
        placeholder="Логин"
        required
        @input="$v.login.$reset()"
        @blur="$v.login.$touch()"
        v-on:keyup.enter="validate()"
        :error-messages="loginErrors"
      )
      v-text-field.auth-form-field(
        v-model="$v.password.$model"
        solo
        placeholder="Пароль"
        required
        @input="$v.password.$reset()"
        @blur="$v.password.$touch()"
        v-on:keyup.enter="validate()"
        :error-messages="passwordErrors"
    )

      v-btn.auth-form-btn( rounded aria-label="Войти" @click="validate()" ) Войти
</template>

<script>
import axios from 'axios';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'auth-page',

  data() {
    return {
      login: null,
      password: null,
    };
  },

  validations: {
    login: {
      required,
    },

    password: {
      required,
      minLength: minLength(6),
    },
  },

  methods: {
    validate() {
      this.$v.$touch();
      const url = `${this.$baseUrl}api/user/registration?role=admin`;
      // const url = `${this.$baseUrl}api/user/login`;
      const body = {
        email: this.login,
        password: this.password,
      };
      axios
        .post(url, body)
        .then((res) => this.checkResponse(res))
        .catch((err) => console.error('error --- ', err));
    },
    checkResponse(res) {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        this.$router.push({ name: 'providers' });
      }
    },
  },

  computed: {
    loginErrors() {
      const errors = [];
      if (!this.$v.login.$dirty) return errors;

      if (!this.$v.login.required) errors.push('Обязательное поле');

      return errors;
    },

    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      if (!this.$v.password.required) errors.push('Обязательное поле');
      if (!this.$v.password.minLength) errors.push('Пароль должен быть не менее 7 символов');

      return errors;
    },
  },
};
</script>

<style lang="stylus">
  .auth {
    height: 100%

    &-form {
      margin 50px 40px 0
      max-width 600px
      width 100%

      .v-input__slot {
        background-color var(--block-color-primary) !important
      }

      .theme--light.v-input.auth-form-field input {
        color var(--text-color-primary) !important
      }

      .theme--light.v-input.auth-form-field input::placeholder {
        color var(--text-color-primary) !important
      }

      &-field:first-child {
        margin-bottom 10px !important
      }

      &-btn {
        margin-top 25px
        background linear-gradient(135deg, rgba(254, 182, 140, 1), rgba(232, 109, 144, 1)) !important
        width 100%
        height 48px !important
        color var(--text-color-primary) !important
      }
    }

    .row {
      margin 0
    }
  }
</style>
