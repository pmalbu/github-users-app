<template>
  <form @submit.prevent="addUser">
    <input
            type="text"
            placeholder="GitHub username"
            required
            v-model="username"
    />
    <button type="submit">Add card</button>
    <div v-for="(value, index) in userDetails" :key="index">
      {{index}}: {{value}}
    </div>
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
        userDetails: []
      }
    },
    methods: {
      addUser: function() {
        axios.get(`https://api.github.com/users/${this.username}`)
          .then(resp => {
            this.clear();
            this.setRateLimitParams(resp.headers);
            let keys = Object.keys(resp.data);
            let values = Object.values(resp.data);

            for (let i=0; i < keys.length; i++) {
              this.userDetails.push(keys[i] + ': ' + values[i]);
            }
          })
          .catch(error => {
            this.clear();
            this.errorStatus = error.response.status + ' ' + error.response.statusText
            this.errorText = error.response.data.message
            this.setRateLimitParams(error.response.headers)
          })
      },
      setRateLimitParams(headers) {
        this.rateLimit = headers['x-ratelimit-limit'];
        this.rateLimitRemaining = headers['x-ratelimit-remaining'];
        let seconds = +(new Date(+headers['x-ratelimit-reset'] * 1000).getTime() - new Date().getTime()) / 1000;
        this.rateLimitReset = seconds + ' seconds (' + (seconds / 60).toFixed(2) + ' minutes)';
      },
      clear() {
        this.userDetails = []
        this.errorStatus = ''
        this.errorText = ''
      }
    }
  }
</script>