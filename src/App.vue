<template>
<v-app>
  <!-- 認証済みの時はメインの画面を表示 -->
  <div v-if="signedIn">
    <v-card color="basil">
      <v-card-title class="text-center justify-center">
        <v-spacer />
        <h1 class="font-weight-bold basil--text">HouseWorkDealer</h1>
        <v-spacer />
        <div class="amplify-sign-out d-none d-md-block">
          <amplify-sign-out />
        </div>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab to="/"><v-icon>mdi-calendar-month</v-icon>calendar</v-tab>
        <v-tab to="/chat">chat</v-tab>
        <v-tab to="/setting"><v-icon>mdi-account-settings</v-icon>setting</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <router-view />
  </div>
  <!-- 認証していない時はログイン画面を表示 -->
  <div v-else>
      <v-container><v-row><amplify-authenticator class="auth" v-bind:authConfig="authConfig"/></v-row></v-container>
  </div>
</v-app>
</template>

<script>
import {
  Auth
} from 'aws-amplify'
import {
  AmplifyEventBus
} from 'aws-amplify-vue'


export default {
  name: 'App',

  components: {},

  data: () => ({
    signedIn: false,
    username: '',
    tab: null,
    items: [
      "calendar", "chat",
    ],
    authConfig: {
              signUpConfig: {
                hiddenDefaults: ['phone_number'],
              }
            }
        }),
  async beforeCreate() {
    // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
    // 取得できなければ認証ステータスをfalseに設定する
    try {
      let cognitoUser = await Auth.currentAuthenticatedUser()
      this.signedIn = true
      this.username = cognitoUser.username
    } catch (err) {
      this.signedIn = false
    }
    // 認証ステータスが変わった時に呼び出されるイベントを登録
    AmplifyEventBus.$on('authState', async info => {
      if (info === 'signedIn') {
        let cognitoUser = await Auth.currentAuthenticatedUser()
        this.signedIn = true
        this.username = cognitoUser.username
      } else {
        this.signedIn = false
      }
    });
  }
};
</script>
<style>
.auth > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.basil {
  background-color: #FFFBE6 !important;
}
.basil .v-card__title {
  padding:  24px 0;
  border-bottom: 2px solid #356859;
}

.basil--text {
  color: #356859 !important;
  font-size: 3.75rem;
}
.auth button {
  background: #37a987
}
.auth button:active {
  background: #37a987
}
@media(max-width:480px){
  .basil--text {
    font-size: 1.5rem !important
  }
  .basil .v-card__title {
    padding:  12px 0;
  }
  .auth {
    width: 100%;
  }
  .auth > div {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    min-width: unset;
  }
}
</style>
