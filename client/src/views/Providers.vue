<template lang="pug">
  Table(
    :headers="headers"
    :rows="rows"
    :items="providers"

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
  name: 'providers-page',
  data() {
    return {
      providers: [],
      rows: 15,
      headers: [
        {
          text: 'Фирма',
          align: 'start',
          sortable: false,
          value: 'name',
        },
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
        {
          text: 'Фирма',
          value: 'name',
        },
        { text: 'Телефон', value: 'phone', type: 'number' },
        { text: 'Почта', value: 'email' },
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
      const url = `${this.$baseUrl}api/provider/create`;
      const body = {};
      headers.forEach((el, index) => {
        if (el.value) {
          let key = null;
          let value = null;
          key = el.value;
          if (el.field) {
            if (index === 0) {
              value = el.field[0].toUpperCase() + el.field.slice(1, el.field.length);
            } else {
              value = el.field;
            }
          }
          body[key] = value;
        }
      });
      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.setVisible(false);
            this.handler(res.data);
          }
        })
        .catch((res) => console.log(res));
    },

    editFunc(headers) {
      const url = `${this.$baseUrl}api/provider/edit`;
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
            const i = this.providers.indexOf(this.data);
            this.providers.splice(i, 1);
            this.handler(res.data);
          }
        })
        .catch((res) => console.log(res));
    },
    deleteFunc(item) {
      const index = this.providers.indexOf(item);

      const url = `${this.$baseUrl}api/provider/delete`;
      const body = {
        id: item.id,
      };
      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            this.providers.splice(index, 1);
          }
        })
        .catch((res) => console.log(res));
    },
    getInfo() {
      const url = `${this.$baseUrl}api/provider/get`;

      axios
        .get(url)
        .then((res) => {
          this.providers = res.data.rows;
        })
        .catch((res) => console.log(res));
    },
    handler(data) {
      console.log(data);
      this.providers.push(data);
    },
  },
  created() {
    this.getInfo();
    this.setHeadersDialog({ title: 'Добавить поставщика', headers: this.dialogHeaders });
  },
};
</script>
