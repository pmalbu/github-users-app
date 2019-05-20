<template>
  <form @submit.prevent="addUser">
    <input
            type="text"
            placeholder="GitHub username"
            required
            v-model="username"
    />
    <button type="submit">Add card</button>
      <br><br>
    <p v-if="errorStatus">{{errorStatus}}</p>
    <p v-if="errorText">{{errorText}}</p>
    <p>Rate Limit: {{rateLimit}}</p>
    <p>Rate Limit Remaining: {{rateLimitRemaining}}</p>
    <p>Rate Limit Reset: {{rateLimitReset}}</p>
  </form>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'UserForm',
    data() {
      return {
        username: '',
        rateLimit: '',
        rateLimitRemaining: '',
        rateLimitReset: '',
        errorStatus: '',
        errorText: '',
      }
    },
    methods: {
      addUser: function() {
        if (null == this.$store.getters.users.find(user => user.login === this.username)) {
          axios.get(`https://api.github.com/users/${this.username}`)
            .then(resp => {
              this.clear();
              this.setRateLimitParams(resp.headers);
              this.$store.commit('addGithubUser', resp.data);
              this.username = ''

              // let keys = Object.keys(resp.data);
              // let values = Object.values(resp.data);
              //
              // for (let i=0; i < keys.length; i++) {
              //   if (keys[i] !== "avatar_url")
              //     this.userDetails.push(keys[i] + ': ' + values[i]);
              //   else
              //     this.avatar_url = values[i]
              // }
            })
            .catch(error => {
              this.clear();
              this.errorStatus = error.response.status + ' ' + error.response.statusText
              this.errorText = error.response.data.message
              this.setRateLimitParams(error.response.headers)
            })
          }
        else {
            alert('you already added "' + this.username + '"!')
        }
      },
      setRateLimitParams(headers) {
        this.rateLimit = headers['x-ratelimit-limit'];
        this.rateLimitRemaining = headers['x-ratelimit-remaining'];
        let seconds = +(new Date(+headers['x-ratelimit-reset'] * 1000).getTime() - new Date().getTime()) / 1000;
        this.rateLimitReset = seconds + ' seconds (' + (seconds / 60).toFixed(2) + ' minutes)';
      },
      clear() {
        this.errorStatus = ''
        this.errorText = ''
      }
    }
  }
</script>