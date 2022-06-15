<template lang="pug">
  Table(
    :headers="table"
    :items="user"
    :rows="rows"

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
  name: 'users-page',
  data() {
    return {
      user: [],
      title: 'Добавить клиента',
      rows: 15,
      table: [
        {
          text: 'Фио',
          align: 'start',
          value: 'fio',
        },
        { text: 'Телефон', value: 'phone' },
        { text: 'Дата заказа', value: 'date' },
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
        { text: 'Фио', value: 'fio', type: 'text' },
        { text: 'Телефон', value: 'phone', type: 'number' },
        { text: 'Дата заказа', value: 'date', type: 'date' },
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
    addFunc(headers) {
      const url = `${this.$baseUrl}api/user/createClient`;
      const body = {};
      headers.forEach((el) => {
        const key = el.value;
        let value;
        if (el.field) {
          if (el.type === 'date') {
            value = new Date(el.field).getTime();
          } else if (el.type === 'number') {
            value = el.field;
          } else {
            value = el.field[0].toUpperCase() + el.field.slice(1, el.field.length);
          }
        }
        body[key] = value;
      });

      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.setVisible(false);
            const arr = [];
            arr.push(res.data);
            this.handler(arr);
          }
        })
        .catch((res) => console.log(res));
    },
    editFunc(headers) {
      const url = `${this.$baseUrl}api/user/updateClient`;
      const body = {};
      headers.forEach((el, index) => {
        const key = el.value;
        let value;
        if (el.field) {
          if (index === 0) {
            value = el.field[0].toUpperCase() + el.field.slice(1, el.field.length);
          } else {
            value = el.field;
          }
        }
        body[key] = value;
      });
      body.id = this.data.id;

      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.setVisible(false);
            const i = this.user.indexOf(this.data);
            this.user.splice(i, 1);
            const arr = [];
            arr.push(res.data);
            this.handler(arr);
          }
        })
        .catch((res) => console.log(res));
    },
    deleteFunc(item) {
      const url = `${this.$baseUrl}api/user/deleteClient`;
      const index = this.user.indexOf(item);
      const body = {
        id: item.id,
      };

      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.user.splice(index, 1);
          }
        })
        .catch((res) => console.log(res));
    },
    getInfo() {
      const url = `${this.$baseUrl}api/user/getUsers`;
      axios
        .get(url)
        .then((res) => this.handler(res.data.rows))
        .catch((res) => console.log(res));
    },
    handler(data) {
      const arr = this.datehandler(data);
      this.user.push(...arr);
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
    this.setHeadersDialog({ title: 'Добавить клиентов', headers: this.dialogHeaders });
  },
};
</script>
