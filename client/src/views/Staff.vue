<template lang="pug">
  Table(
    :headers="headers"
    :rows="rows"
    :items="staff"
    :selects="selects"

    :addFunc="addFunc"
    :editFunc="editFunc"
    :deleteFunc="deleteFunc"
  )
</template>

<script>
import Table from '@/components/Table.vue';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'staff-page',
  data() {
    return {
      staff: [],
      title: 'Добавить сотрудника',
      rows: 15,
      headers: [
        {
          text: 'Фио',
          align: 'start',
          value: 'fio',
        },
        { text: 'Должность', value: 'role' },
        { text: 'Дата рождения', value: 'date' },
        { text: 'Адрес', value: 'addres' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Почта', value: 'email' },
        {
          text: 'Редактировать',
          value: 'edit',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Удалить',
          value: 'delete',
          sortable: false,
          align: 'center',
        },
      ],
      dialogHeaders: [
        { text: 'Почта', value: 'email' },
        { text: 'Пароль', value: 'password' },

        { text: 'Фио', value: 'fio' },
        { text: 'Дата рождения', value: 'date', type: 'date' },
        { text: 'Телефон', value: 'phone', type: 'number' },
        { text: 'Адрес', value: 'addres' },
      ],
      selects: [
        {
          text: 'Продавец',
          value: 'Продавец',
        },
        {
          text: 'Менеджер',
          value: 'Менеджер',
        },
      ],
    };
  },
  components: {
    Table,
  },
  computed: {
    ...mapGetters('dialog', {
      data: 'getData',
    }),
  },
  methods: {
    ...mapActions('dialog', [
      'setHeadersDialog',
      'setVisible',
    ]),
    addFunc(headers, role) {
      const url = `${this.$baseUrl}api/user/createStaff`;
      const body = {};
      headers.forEach((el, index) => {
        if (el.value) {
          let key = null;
          let value = null;
          key = el.value;
          if (el.field) {
            if (el.type === 'date') {
              value = new Date(el.field).getTime();
            } else if ((el.type === 'number') || (index === 0) || (index === 1)) {
              value = el.field;
            } else {
              value = el.field[0].toUpperCase() + el.field.slice(1, el.field.length);
            }
          }
          body[key] = value;
        }
      });
      if (role.value) {
        body.role = role.value;
      } else {
        body.role = role;
      }
      if ((headers[1].field) && (headers[0].field)) {
        axios
          .post(url, body)
          .then((res) => {
            if (res.status === 200) {
              const arr = [];
              arr.push(res.data);
              this.handler(arr);
            }
          })
          .catch((res) => console.log(res));
      }
    },
    editFunc(headers, role) {
      const url = `${this.$baseUrl}api/user/updateStaff`;
      const body = {};
      headers.forEach((el, index) => {
        if (el.value) {
          let key = null;
          let value = null;
          key = el.value;
          if (el.field) {
            if (el.type === 'date') {
              value = new Date(el.field).getTime();
            } else if ((el.type === 'number') || (index === 0) || (index === 1)) {
              value = el.field;
            } else {
              value = el.field[0].toUpperCase() + el.field.slice(1, el.field.length);
            }
          }
          body[key] = value;
        }
      });
      if (role.value) {
        body.role = role.value;
      } else {
        body.role = role;
      }
      body.id = this.data.id;
      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.setVisible(false);
            const i = this.staff.indexOf(this.data);
            this.staff.splice(i, 1);
            const arr = [];
            arr.push(res.data);
            this.handler(arr);
          }
        })
        .catch((res) => console.log(res));
    },
    deleteFunc(item) {
      const index = this.staff.indexOf(item);
      const url = `${this.$baseUrl}api/user/deleteStaff`;
      const body = {
        id: item.id,
      };
      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.staff.splice(index, 1);
          }
        })
        .catch((res) => console.log(res));
    },
    getInfo() {
      const url = `${this.$baseUrl}api/user/getStaff?role=Продавец&role=Менеджер`;
      axios
        .get(url)
        .then((res) => this.handler(res.data))
        .catch((res) => console.log(res));
    },
    handler(data) {
      const arr = this.datehandler(data);
      this.staff.push(...arr);
      // this.$store.dispatch('setUser', this.user);
    },
    datehandler(data) {
      const arr = [];
      data.forEach((el, index) => {
        arr.push(el);
        let day = new Date(el.date).getDate();
        if (day < 10) {
          day = `0${day}`;
        }
        let month = new Date(el.date).getMonth() + 1;
        if (month < 10) {
          month = `0${month}`;
        }
        const newDate = `${day}.${month}.${new Date(el.date).getFullYear()}г`;
        arr[index].date = newDate;
      });
      return arr;
    },
  },
  created() {
    this.getInfo();
    this.setHeadersDialog({ title: 'Добавить сотрудника', headers: this.dialogHeaders });
  },
};
</script>
