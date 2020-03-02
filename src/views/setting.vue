<template>
<v-container>
  <v-row no-gutters>
  </v-row>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">名前</th>
          <th class="text-left">色</th>
          <th class="text-left">削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in persons" :key="person.name">
          <td>{{ person.name }}</td>
          <td>
            <div :class="person.color" class="block"></div>
          </td>
          <td>
            <v-icon @click="deletePerson($event)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
</template>
  </v-simple-table>
<v-simple-table v-if="plussee">
  <tbody>
    <tr>
      <td no-gutters><v-icon @click="addsee=!addsee,plussee=!plussee">mdi-account-multiple-plus</v-icon></td>
    </tr>
  </tbody>
</v-simple-table>
  <v-row class="align-items-center d-none d-md-flex" v-if="addsee">
    <v-col cols="4">
      <v-text-field no-gutters v-model="add" label="追加する人の名前を入力してください" clearable></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-select :items="this.colors" label="色を選択してください" solo :background-color="this.setcolor" v-model="setcolor"></v-select>
    </v-col>
    <v-col cols="1" class="pt-5">
      <v-btn color="primary"  @click="createNewPerson">追加</v-btn>
    </v-col>
    <v-col cols="1" class="pt-5">
      <v-btn color="error" @click="addsee=!addsee,plussee=!plussee">キャンセル</v-btn>
    </v-col>
  </v-row>
  <v-row class="align-items-center d-sm-none" v-if="addsee">
    <v-col cols="12">
      <v-text-field no-gutters v-model="add" label="追加する人の名前を入力してください" clearable></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-select :items="this.colors" label="色を選択してください" solo :background-color="this.setcolor" v-model="setcolor"></v-select>
    </v-col>
    <v-col cols="6" class="pt-5">
      <v-btn color="primary"  @click="createNewPerson">追加</v-btn>
    </v-col>
    <v-col cols="6" class="pt-5">
      <v-btn color="error" @click="addsee=!addsee,plussee=!plussee">キャンセル</v-btn>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
import API, {
  graphqlOperation
} from '@aws-amplify/api';
import {
  createPerson
} from "../graphql/mutations";
import {
  deletePerson
} from "../graphql/mutations";
import {
  listPersons
} from '../graphql/queries';
import {
  onCreatePerson
} from '../graphql/subscriptions';
import {
  onDeletePerson
} from '../graphql/subscriptions';
import {
  Auth
} from 'aws-amplify';

export default {
  data: () => ({
    persons: [],
    add: '',
    addsee: false,
    colors: ["red", "pink", "purple", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange"],
    usedColor: [],
    setcolor: "",
    plussee: true
  }),
  created() {
    this.getPerson()
    this.subscribe()
    this.getUser()
    this.deleteSubscribe()
  },
  methods: {
    async createNewPerson() {
      const todo = {
        name: this.add,
        color: this.setcolor
      }
      await API.graphql(graphqlOperation(createPerson, {
        input: todo
      }))
    },
    async getPerson() {
      const self = this
      const todoData = await API.graphql(graphqlOperation(listPersons))
      self.persons.push(...self.persons, ...todoData.data.listPersons.items);
      self.persons.map(function(val) {
        self.usedColor.push(val.color)
      })
      self.colorChange()
    },
    colorChange() {
      const self = this
      self.usedColor.forEach(function(i) {
        self.colors.some(function(v, n) {
          if (v === i) self.colors.splice(n, 1)
        })
      });
    },
    subscribe() {
      this.getUser().then((user) => {
        API.graphql(graphqlOperation(onCreatePerson, {
          owner: user.username
        })).subscribe({
          next: (eventData) => {
            const todo = eventData.value.data.onCreatePerson;
            this.persons.push(todo);
            console.log('sub')
          }
        })
      })
    },
    deleteSubscribe() {
      this.getUser().then((user) => {
        API.graphql(graphqlOperation(onDeletePerson, {
          owner: user.username
        })).subscribe({
          next: (eventData) => {
            const todo = eventData.value.data.onDeletePerson;
            this.persons.pop(todo);
          }
        })
      })
    },
    async deletePerson(val) {
      const parent = val.target.parentNode.parentNode
      const name = parent.children[0].innerText
      const todo = {
        name: name
      }
      await API.graphql(graphqlOperation(deletePerson, {
        input: todo
      }))
    },
    async getUser() {
      var user = await Auth.currentUserInfo();
      this.user = user.username
      return user
    },
  },
}
</script>
<style scoped>
.block {
  width: 20px;
  height: 20px;
}
.mdi-account-multiple-plus {
  font-size: 30px;
}
</style>
