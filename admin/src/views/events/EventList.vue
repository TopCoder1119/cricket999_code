<template>
    <CRow>
        <CCol col="12" xl="12">
            <transition name="slide">
                <CCard>
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
                                    <router-link
                                            color="primary"
                                            variant="outline"
                                            square
                                            size="sm"
                                            :to="'/added_events/'+item.id"
                                    >
                                        Show
                                        <!--{{details.includes(index) ? 'Hide' : 'Show'}}-->
                                    </router-link>
                                    <!--<CButton
                                            color="primary"
                                            variant="outline"
                                            square
                                            size="sm"
                                            @click="getMyUsers(item.email)"
                                    >
                                        Users
                                    </CButton>-->
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
                    {key: 'id',label:'ImportedId'},
                    {key: 'home'},
                    {key: 'away'},
                    {key: 'countryCode'},
                    {key: 'openDate'},
                    {key: 'timezone'},
                    // {key: 'status', sorter: false,},
                    // {key: 'commission', label: 'Com'},
                    {key: 'action', label: 'Action',filter:false},
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
            getData() {
                let db = firebase.firestore().collection('events');
                db/*.where('parent', '==',email)*/.onSnapshot(doc => {
                    if (doc.empty) {
                        this.error = "There is no any events";
                        return;
                    }
                    var tem_items = [];
                    doc.forEach(item => {
                        tem_items.push(item.data())
                    });
                    this.items = tem_items;
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
            this.getData()
        }
    }
</script>
