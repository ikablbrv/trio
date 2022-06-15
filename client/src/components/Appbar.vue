<template lang="pug">
  v-card.appbar(
      v-if="$route.meta.visible"
      height="100%"
      width="200px")
    v-navigation-drawer()

      v-divider.divider
      v-tabs(fixed-tabs vertical color="#38BEC5")
        v-tab(@click="route('providers')") Поставщики
        v-tab(@click="route('staff')") Сотрудники
        v-tab(@click="route('users')") Клиенты
        v-tab(@click="route('products')") Товары
        v-tab(@click="route('otchet')") Отчёты

        v-divider.divider
        v-tab(@click="route('supply')") Поставки
        v-tab(@click="route('refaund')") Возврат
        v-tab(@click="route('purchase')") Продажа

      v-divider.divider
      v-row(align="center" justify="center")
        v-btn(@click="exit()" width="180px" outlined rounded color="red") Выйти
</template>

<script>
export default {
  name: 'AppBar',
  methods: {
    route(name) {
      this.$router.push({ name: `${name}` });
    },
    exit() {
      localStorage.removeItem('token');
      this.route('auth');
    },
  },
};
</script>

<style lang="stylus">
  .appbar {
    z-index 9999
    box-shadow: 0px 0px 10px
  }
  .divider {
    margin: 20px;
  }
</style>
