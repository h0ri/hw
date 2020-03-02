<template>
<v-row class="fill-height nomargin">
  <v-col>
    <v-sheet class="mb-3">
      <v-toolbar flat color="white" class="first d-none d-md-block">
        <v-btn outlined class="mr-4 todaybtn" color="white darken-2" @click="setToday">
          Today
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <div class="d-none d-md-block">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
        <v-btn type="button" name="button" color="error" class="ml-3" @click="overlay=!overlay"><v-icon>mdi-calendar-plus</v-icon>予定を追加する</v-btn>
        <v-btn type="button" name="button" color="success" class="ml-3" @click="overlay2=!overlay2"><v-icon>mdi-calendar-edit</v-icon>予定を更新する</v-btn>
      </v-toolbar>
      <v-toolbar flat no-gutters color="white" class="first d-sm-block d-md-none">
        <v-row class="align-center justify-space-between">
          <div class="">
            <v-icon @click="overlay=!overlay">mdi-calendar-plus</v-icon>
            <v-icon class="ml-2" @click="overlay2=!overlay2">mdi-calendar-edit</v-icon>
          </div>
          <div class="d-flex">
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
          <v-btn outlined class="mr-4 todaybtn" small color="white darken-2" @click="setToday">
            Today
          </v-btn>
        </v-row>
      </v-toolbar>
    </v-sheet>
    <v-sheet class="sheet-sp" height="600">
      <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" event-start="content" :event-name="getPersonName" :event-color="getEventColor" @change="updateRange" :type="type"></v-calendar>
      <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span v-html="selectedEvent.details"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-col>
  <v-overlay :value="overlay"></v-overlay>
  <v-overlay :value="overlay2"></v-overlay>

  <v-stepper v-model="e1" class="stepper" v-if="overlay">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">開始日を選択してください</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">日数を選択してください</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">内容を確認してください</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1">
          <v-date-picker v-model="picker" locale="jp" full-width :landscape="$vuetify.breakpoint.smAndUp"></v-date-picker>
        </v-card>
        <v-row class="nomargin">
          <v-btn color="primary" @click="e1 = 2">
            次へ
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="overlay=!overlay">
            キャンセル
          </v-btn>
        </v-row>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1">
          <v-row>
            <v-col class="pr-4">
              <v-slider v-model="slider" class="align-center" :max="max" :min="min" hide-details>
                <template v-slot:append>
                  <v-text-field v-model="slider" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                </template>
              </v-slider>
            </v-col>
          </v-row>
        </v-card>
        <v-row class="nomargin">
          <v-btn color="primary" @click="e1 = 3">
            次へ
          </v-btn>
          <v-btn text @click="e1 = 1">戻る</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="overlay=!overlay">
            キャンセル
          </v-btn>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12 px-4 py-8" color="grey lighten-1">
          <div class="cdtext mb-2">
            開始日:{{this.picker}}
          </div>
          <div class="cdtext">
            追加日数:{{this.slider}}
          </div>
        </v-card>
        <v-row class="nomargin">
          <v-btn color="primary" @click="createNewPlan">
            確定
          </v-btn>
          <v-btn text @click="e1 = 2">戻る</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="overlay=!overlay">
            キャンセル
          </v-btn>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  <v-stepper v-model="e2" class="stepper" v-if="overlay2">
    <v-stepper-header>
      <v-stepper-step :complete="e2 > 1" step="1">更新日を選択してください</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e2 > 2" step="2">追加する人を選択してください</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">内容を確認してください</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1">
          <v-date-picker v-model="picker2" locale="jp" full-width :landscape="$vuetify.breakpoint.smAndUp"></v-date-picker>
        </v-card>
        <v-row class="nomargin">
          <v-btn color="primary" @click="e2 = 2">
            次へ
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="overlay2=!overlay2">
            キャンセル
          </v-btn>
        </v-row>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12" color="lighten-1">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="names" label="選択してください" outlined v-model="select"></v-select>
          </v-col>
        </v-card>
        <v-row class="nomargin">
          <v-btn color="primary" @click="e2 = 3">
            次へ
          </v-btn>
          <v-btn text @click="e2 = 1">戻る</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="overlay2=!overlay2">
            キャンセル
          </v-btn>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12 px-4 py-10" color="grey lighten-1">
          <div class="cdtext mb-2">
            開始日:{{this.picker2}}
          </div>
          <div class="cdtext">
            追加する人:{{this.select}}
          </div>
        </v-card>
        <v-row class="nomargin">
          <v-btn color="primary" @click="updatePlan">
            確定
          </v-btn>
          <v-btn text @click="e2 = 2">戻る</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="overlay2=!overlay2">
            キャンセル
          </v-btn>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-row>
</template>
<script>
import API, {
  graphqlOperation
} from '@aws-amplify/api';
import {
  createPlan
} from "../graphql/mutations";
import {
  listPlans
} from '../graphql/queries';
import {
  listPersons
} from '../graphql/queries';
import {
  onCreatePlan
} from '../graphql/subscriptions';
import {
  updatePlan
} from '../graphql/mutations';
import {
  Auth
} from 'aws-amplify';

export default {
  data: () => ({
    focus: '',
    today: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    start: null,
    end: null,
    content: '',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    e1: 1,
    e2: 1,
    picker: new Date().toISOString().substr(0, 10),
    picker2: new Date().toISOString().substr(0, 10),
    overlay: false,
    overlay2: false,
    min: 1,
    max: 30,
    slider: 7,
    range: [1, 30],
    d: '',
    ud: '',
    user: '',
    select: '',
    persons: [],
    names: [],
  }),
  computed: {
    title() {
      const {
        start,
        end
      } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long',
      })
    },
  },
  created() {
    this.getData()
    this.subscribe()
    this.getPerson()
  },
  mounted() {
    this.$refs.calendar.checkChange()
    this.getUser()
  },
  methods: {
    async createNewPlan() {
      this.overlay = !this.overlay;
      this.e1 = 1;
      for (var i = 0; i < this.slider; i++) {
        const today = new Date(this.picker);
        today.setDate(today.getDate() + i);
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        const d = year + '-' + month + '-' + day;
        this.d = d;
        const nameslength = this.names.length;
        const random = Math.floor(Math.random() * nameslength);
        const todo = {
          content: this.d,
          type: "風呂掃除",
          name: this.names[random],
          owner: this.user
        }
        await API.graphql(graphqlOperation(createPlan, {
          input: todo
        }))
        console.log(todo);
      }
    },
    async updatePlan() {
      this.overlay2 = !this.overlay2
      this.e2 = 1;
      const today = new Date(this.picker2);
      today.setDate(today.getDate());
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      const d = year + '-' + month + '-' + day;
      this.d = d;
      const todo = {
        content: this.d,
        type: "風呂掃除",
        name: this.select,
        owner: this.user
      }
      console.log(todo)
      await API.graphql(graphqlOperation(updatePlan, {
        input: todo
      }))
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true
      })
    },
    async getData() {
      const todoData = await API.graphql(graphqlOperation(listPlans))
      this.events.push(...this.events, ...todoData.data.listPlans.items);
    },
    async getUser() {
      var user=await Auth.currentUserInfo();
      this.user=user.username
      return user
    },
    async getPerson() {
      const self=this
      const todoData = await API.graphql(graphqlOperation(listPersons))
      self.persons.push(...self.persons, ...todoData.data.listPersons.items);
      self.persons.map(function(val){
        self.names.push(val.name)
      })
    },
    subscribe() {
      this.getUser().then((user) =>{
        API.graphql(graphqlOperation(onCreatePlan, {
          owner: user.username
        })).subscribe({
          next: (eventData) => {
            const todo = eventData.value.data.onCreatePlan;
            this.events.push(todo);
            console.log('sub')
          }
        })
      })
    },
    updateRange({
      start,
      end
    }) {
      this.start = start
      this.end = end
    },
    viewDay({
      date
    }) {
      this.focus = date
      this.type = 'day'
    },
    getPersonName(event) {
      return event.input.person.name
    },
    getEventColor(event) {
      return event.person.color
    },
    setToday() {
      this.focus = this.today
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({
      nativeEvent,
      event
    }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    nth(d) {
      return d > 3 && d < 21 ?
        'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    formatDate(a, withTime) {
      return withTime ?
        `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}` :
        `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    },
  },
}
</script>
<style scoped>
.stepper {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.todaybtn {
  background: #519e87;
}

.bb {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999
}

.nomargin {
  margin-right: 0;
  margin-left: 0;
}

.cdtext {
  font-size: 24px;
  font-style: italic;
}
.v-event-start {
  width: 100% !important;
}

@media(max-width:480px) {
  .v-stepper {
    width: 100%;
  }

  .first .v-btn {}

  .sheet-sp {
    height: 450px !important;
  }
  .v-calendar .v-event {
    text-align: center
  }
  .v-btn {
    font-size: 10px;
    height: 30px;
  }
}
</style>
