<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="justify-content-center" style="margin: auto">
      <CCol md="8">
        <CCardGroup>
          <CCard class="p-4" style="width:600px">
            <CCardBody>
              <CForm @submit.prevent="submit">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div v-if="error" class="alert alert-danger">{{error}}</div>
                <CInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Username"
                        autocomplete="username email"
                        v-model="form.email"

                >
                  <template #prepend-content>
                    <CIcon name="cil-user"/>
                  </template>
                </CInput>
                <CInput
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        autocomplete="curent-password"
                        v-model="form.password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked"/>
                  </template>
                </CInput>
                <CRow>
                  <CCol col="12">
                    <CButton type="submit" color="primary" class="px-4">Login</CButton>
                  </CCol>
                  <!--<CCol col="6" class="text-right">
                    <CButton color="link" class="px-0">Forgot password?</CButton>
                  </CCol>-->
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <!--<CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-md-down-none"
            style="width:44%"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <CButton
              color="primary"
              class="active mt-3"
            >
              Register Now!
            </CButton>
          </CCard>-->
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
  import firebase from "firebase";
  import {store} from "../../store";

  export default {
    name: 'Login',
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
                  let admins = firebase.firestore().collection('users').doc(this.form.email);
                  admins/*.where('email', '==', this.form.email)*/.get()
                          .then(doc => {
                            if (doc.empty) {
                              this.error = "You have no permission for admin panel!"
                              return;
                            }
                            var account=doc.data();
                            store.user_data=account;
                            console.log(this.form.email,account);
                            data.user
                                    .updateProfile({
                                      displayName: account.displayName,
                                      role: account.role
                                    })
                                    .then(() => {
                                    });

                            this.$router.replace({name: "Dashboard"});

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
