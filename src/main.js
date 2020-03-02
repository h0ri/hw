import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import awsconfig from './aws-exports';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';

Amplify.configure(awsconfig);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.config.productionTip = false

let languageDict = {
    ja:{
        'Sign in to your account' : 'アカウントにサインイン',
        'Username' : 'ユーザ名',
        'Enter your Username' : 'ユーザ名を入力してください',
        'Password' : 'パスワード',
        'Enter your password' : 'パスワードを入力してください',
        'Forget your password? ' : 'パスワードを忘れた場合',
        'Reset password' : 'パスワードのリセット',
        'No account? ' : 'こちらから',
        'Create account' : 'アカウント作成',
        'Sign In' : 'サインイン',
        'Create a new account' : '新規アカウント作成',
        'Have an account? ' : 'アカウント既にお持ちの方は',
        'Sign in' : 'こちら',
        'Reset your password' : 'パスワードのリセット',
        'Back to Sign In' : 'サインイン',
        'Create Account' : 'アカウント作成',
        'Send Code' : '送信'
    }
}
AmplifyModules.I18n.putVocabularies(languageDict)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
