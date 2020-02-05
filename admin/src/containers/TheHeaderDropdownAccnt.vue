<template>
    <CDropdown
            add-menu-classes="pt-0"
            class="c-header-nav-items"
            inNav
            placement="bottom-end"
    >
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img
                            class="c-avatar-img "
                            src="img/avatars/6.jpg"
                    />
                </div>
            </CHeaderNavLink>
        </template>
        <CDropdownHeader class="text-center" color="light" tag="div">
            <strong>{{userData.displayName}}</strong>
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
            <CIcon name="cil-user"/>
            Profile
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
        name: 'TheHeaderDropdownAccnt',
        data() {
            return {
                itemsCount: 42,displayName:''
            }
        },
        computed:{
            userData(){
                return store.user_data;
            }
        },
        created() {
            //console.log('getuser',store.user_data)
            firebase.auth().onAuthStateChanged(user => {
                if (user){
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

                        //console.log('getuser',store.user_data)
                    })
                }else{
                    this.$router.replace({
                        name: "Login"
                    });
                }

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
            }
        }
    }
</script>

<style scoped>
    .c-icon {
        margin-right: 0.3rem;
    }
</style>
