<template>
  <b-card class="login-box bg-secondary" style="margin-top: 30vh;margin-right:auto;margin-left: auto;width: 400px;">
    <div style="margin-bottom: 20px">
      <h1 class="logo"><span class="logo_text">Cricket</span><span class="logo_num">999</span><b>Player</b></h1>
      <small>Player of Cricket999</small>
    </div>
    <div class="msg">Sign in to start your session</div><br>
    <b-form @submit.prevent="submit">
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-input-group>
      <br>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-input-group>


      <!--<b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>-->
      <b-button variant="success" type="submit">Log In</b-button>
      <div v-if="error" class="alert alert-danger">{{error}}</div>
    </b-form>
  </b-card>
</template>

<script>
  import firebase from "firebase";

  export default {
    data() {
      return {
        form: {
          email: "",
          password: ""
        },
        error: null
      };
    },
    methods: {
      submit() {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            let user = firebase.firestore().collection('users').doc(this.form.email);
            user/*.where('email', '==', this.form.email)*/.get()
              .then(doc => {
                if (doc.empty) {
                  this.error = "You have no permission for admin panel!";
                  return;
                }
                var account = doc.data();
                console.log(this.form.email, account);
                data.user
                  .updateProfile({
                    data: account
                  })
                  .then(() => {
                    this.$router.replace({name: "Dashboard"});
                  });

              })
              .catch(err => {
                console.log('Error getting documents', err);
              });

          })
          .catch(err => {
            this.error = err.message;
          });
      }
    }
  }

</script>
