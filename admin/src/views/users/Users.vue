<template>
    <CRow>
        <CCol col="12" xl="12">

            <transition name="slide">
                <CCard>
                    <CCardHeader>
                        <router-link class="btn btn-primary" style="float: right" to="users/add">Add User</router-link>
                      /<CLink @click="getMyUsers(currentEmail[0])">
                      {{currentEmail[0]}}
                    </CLink>
                      <span v-for="item in currentEmail.slice(1)">
                        ->
                        <CLink @click="getMyUsers(item)">
                          {{item}}
                        </CLink>
                      </span>

                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                                :fields="fields"
                                :items="items"
                                clickable-rows
                                clickableRows
                                column-filter
                                hover
                                index-column
                                items-per-page-select
                                pagination
                                sorter
                                striped
                                table-filter
                        >
                            <template #username="data">
                                <td>
                                    <strong>{{data.item.username}}</strong>
                                </td>
                            </template>

                            <template #status="data">
                                <td>
                                    <CBadge :color="getBadge(data.item.state)">
                                        {{data.item.state}}
                                    </CBadge>
                                </td>
                            </template>
                          <template #index="{item,index}">
                            <td class="py-2">
                              {{index+1}}
                            </td>
                          </template>
                          <template #action="{item, index}">
                            <td class="py-2" style="display: flex">
                              <CButton
                                      color="primary"
                                      variant="outline"
                                      square
                                      size="sm"
                                      @click="rowClicked(item,index)"
                              >
                                Show
                                <!--{{details.includes(index) ? 'Hide' : 'Show'}}-->
                              </CButton>
                              <CButton
                                      color="primary"
                                      variant="outline"
                                      square
                                      size="sm"
                                      @click="getMyUsers(item.email)"
                              >
                                Users
                              </CButton>
                              <!--<CButton
                                      color="danger"
                                      variant="outline"
                                      square
                                      size="sm"
                                      @click="deleteCategory(index)"
                              >
                                Delete
                              </CButton>-->
                            </td>
                          </template>
                        </CDataTable>
                    </CCardBody>
                </CCard>
            </transition>
        </CCol>
    </CRow>
</template>

<script>
    import firebase from "firebase"
import {store} from "../../store"
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Users',
      computed: {
        ...mapGetters([
          'currentSite',
        ]),
      },
        data: () => {
            return {
                items: [],
                fields: [
                    {key: 'index',label:'No',filter:false},
                    {key: 'parent'},
                    {key: 'email'},
                    {key: 'displayName'},
                    {key: 'role'},
                    {key: 'status', sorter: false,},
                    {key: 'phone'},
                    {key: 'balance'},
                    {key: 'commission', label: 'Com'},
                    {key: 'action', label: 'Action'},
                ],
                perPage: 5,
              currentEmail:[]
            }
        },
        paginationProps: {
            align: 'center',
            doubleArrows: false,
            previousButtonHtml: 'prev',
            nextButtonHtml: 'next'
        },
        methods: {
            getMyUsers(email) {
              var index=this.currentEmail.findIndex((item)=>item==email)
              if (index>-1){
                this.currentEmail.splice(index+1,this.currentEmail.length)
              }else{
                this.currentEmail.push(email)
              }
              this.items=[];
              let db = firebase.firestore().collection('users');
              console.log(email)
              db.where('parent', '==',email).onSnapshot(doc => {
                if (doc.empty) {
                  this.error = "There is no any city";
                  return;
                }
                var users = [];
                doc.forEach(item => {
                  var user=item.data();
                  user.role=this.getRole(user.role)
                  users.push(user)
                });
                this.items = users;
                console.log('users',this.items)
              })

            },
            getBadge(status) {
                return status === 'Active' ? 'success'
                    : status === 'Inactive' ? 'secondary'
                        : status === 'Pending' ? 'warning'
                            : status === 'Banned' ? 'danger' : 'primary'
            },
            getRole(role) {
                return role == 0 ? 'Super Admin'
                    : role == 1 ? 'Admin'
                        : role == 2 ? 'Super Master'
                            : role == 3 ? 'Master' : 'User'
            },
            userLink(id) {
                return `users/${id.toString()}`
            },
            rowClicked(item, index) {
                const userLink = this.userLink(index + 1);
                this.$router.push({path: userLink, query: item})
            }
        },
        created() {
          firebase.auth().onAuthStateChanged(user => {
            this.getMyUsers(user.email)
          });

        }
    }
</script>
