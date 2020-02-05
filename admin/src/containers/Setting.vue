<template>
    <CDropdown
            add-menu-classes="pt-0"
            class="c-header-nav-items"
            inNav
            placement="bottom-end"
    >
        <template #toggler>
            <CHeaderNavLink>
                <CIcon name="cil-list"/>
            </CHeaderNavLink>
        </template>
        <CDropdownHeader class="text-center" color="light" tag="div">
            <strong>You options</strong>
        </CDropdownHeader>
        <CDropdownItem>
            <CIcon name="cil-bell"/>
            Updates
            <CBadge class="ml-auto" color="info">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-envelope-open"/>
            Messages
            <CBadge class="ml-auto" color="success">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-task"/>
            Tasks
            <CBadge class="ml-auto" color="danger">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-comment-square"/>
            Comments
            <CBadge class="ml-auto" color="warning">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownHeader
                class="text-center"
                color="light"
                tag="div"
        >
            <strong>Settings</strong>
        </CDropdownHeader>
        <CDropdownItem>
            <span class="setTitle">IsUpdate</span>
            <CBadge class="ml-auto" color="secondary">
                <CSwitch
                        key="isUpdate"
                        color="success"
                        v-bind="settings.isUpdate"
                        checked
                        value="color"
                        size="sm"
                />
            </CBadge>

        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-settings"/>
            Settings
        </CDropdownItem>

        <CDropdownItem>
            <CIcon name="cil-dollar"/>
            Payments
            <CBadge class="ml-auto" color="secondary">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownItem>
            <CIcon name="cil-file"/>
            Projects
            <CBadge class="ml-auto" color="primary">{{ itemsCount }}</CBadge>
        </CDropdownItem>
        <CDropdownDivider/>
        <CDropdownItem>
            <CIcon name="cil-shield-alt"/>
            Lock Account
        </CDropdownItem>
        <CDropdownItem @click="signOut">
            <CIcon name="cil-lock-locked"/>
            Logout
        </CDropdownItem>
    </CDropdown>
</template>

<script>
    import firebase from "firebase"
    import {store, mutations} from "../store";

    export default {
        data() {
            return {
                itemsCount: 42,displayName:'',
                settings:{
                    isUpdate:false,isBet:true,isLogin:true,betDelay:0
                }
            }
        },
        computed:{
            userData(){
                return store.user_data;
            }
        },
        created() {
            //console.log('getuser',store.user_data)
            window.setInterval(() => {
                this.updateOdds()
            }, 800)
            console.log(store.user_data)
            firebase.auth().onAuthStateChanged(user => {
                let admins = firebase.firestore().collection('users').doc(user.email);
                admins/*.where('role', '>', 4)*/.onSnapshot(doc => {
                    if (doc.empty) {
                        this.$router.replace({
                            name: "Login"
                        });
                        return;
                    }
                    var account=doc.data();
                    store.user_data=account;
                })
            });
        },
        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.replace({
                            name: "Login"
                        });
                    });
            },
            updateOdds(){

            }
        }
    }
</script>

<style scoped>
    .c-icon {
        margin-right: 0.3rem;
    }
</style>
