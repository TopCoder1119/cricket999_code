<template>
    <CSidebar
            :minimize="minimize"
            :show.sync="show"
            aside
            class="right-side-bar"
            fixed
            overlaid
            unfoldable
    >
        <a @click="close" style="margin-left: 10px;position: absolute;right: 10px;top: 8px">
            <p class="h3">
                <b-icon icon="x-circle-fill"></b-icon>
            </p>
        </a>
        <CTabs>
            <CTab active title="Home">
                <template v-slot:title>
                    <svg class="c-icon" viewBox="0 0 24 24">
                        <path d="M9.75 3.75h12.375v1.5h-12.375v-1.5z"></path>
                        <path d="M4.875 1.5c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.657 0 3-1.343 3-3v0c-0.002-1.656-1.344-2.998-3-3h-0zM4.875 6c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5v0c-0.001 0.828-0.672 1.499-1.5 1.5h-0z"></path>
                        <path d="M9.75 11.25h12.375v1.5h-12.375v-1.5z"></path>
                        <path d="M4.875 9c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.657 0 3-1.343 3-3v0c-0.002-1.656-1.344-2.998-3-3h-0zM4.875 13.5c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5v0c-0.001 0.828-0.672 1.499-1.5 1.5h-0z"></path>
                        <path d="M9.75 18.75h12.375v1.5h-12.375v-1.5z"></path>
                        <path d="M4.875 16.5c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.657 0 3-1.343 3-3v0c-0.002-1.656-1.344-2.998-3-3h-0zM4.875 21c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5v0c-0.001 0.828-0.672 1.499-1.5 1.5h-0z"></path>
                    </svg>
                </template>

            </CTab>
            <CTab title="Message">
                <template v-slot:title>
                    <svg class="c-icon" viewBox="0 0 24 24">
                        <path d="M6.75 11.25h1.5v1.5h-1.5v-1.5z"></path>
                        <path d="M11.25 11.25h1.5v1.5h-1.5v-1.5z"></path>
                        <path d="M15.75 11.25h1.5v1.5h-1.5v-1.5z"></path>
                        <path d="M21.75 1.5h-19.5c-0.828 0.001-1.499 0.672-1.5 1.5v13.5c0.001 0.828 0.672 1.499 1.5 1.5h3v5.25h1.436l5.25-5.25h9.814c0.828-0.001 1.499-0.672 1.5-1.5v-13.5c-0.001-0.828-0.672-1.499-1.5-1.5h-0zM21.75 16.5h-10.436l-4.564 4.564v-4.564h-4.5v-13.5h19.5z"></path>
                    </svg>
                </template>

            </CTab>
            <CTab title="settings">
                <template v-slot:title>
                    <svg class="c-icon" viewBox="0 0 24 24">
                        <path d="M11.491 7.875c-2.278 0-4.125 1.847-4.125 4.125s1.847 4.125 4.125 4.125c2.278 0 4.125-1.847 4.125-4.125v0c-0.003-2.277-1.848-4.122-4.125-4.125h-0zM11.491 14.625c-1.45 0-2.625-1.175-2.625-2.625s1.175-2.625 2.625-2.625c1.45 0 2.625 1.175 2.625 2.625v0c-0.002 1.449-1.176 2.623-2.625 2.625h-0z"></path>
                        <path d="M21.783 15.109l-1.489-1.226c0.126-0.566 0.198-1.216 0.198-1.883s-0.072-1.317-0.209-1.943l0.011 0.060 1.489-1.226c0.21-0.173 0.342-0.432 0.342-0.723 0-0.173-0.047-0.335-0.129-0.474l0.002 0.004-1.529-2.648c-0.164-0.283-0.466-0.469-0.811-0.469-0.119 0-0.232 0.022-0.337 0.062l0.006-0.002-1.808 0.677c-0.908-0.823-1.996-1.467-3.196-1.866l-0.064-0.018-0.317-1.902c-0.075-0.447-0.459-0.783-0.922-0.783-0.001 0-0.002 0-0.003 0h-3.057c-0.001 0-0.002 0-0.003 0-0.463 0-0.847 0.336-0.921 0.778l-0.001 0.005-0.317 1.902c-1.263 0.417-2.351 1.061-3.267 1.891l0.008-0.007-1.808-0.677c-0.098-0.038-0.211-0.060-0.33-0.060-0.345 0-0.646 0.187-0.808 0.465l-0.002 0.004-1.529 2.648c-0.079 0.135-0.126 0.296-0.126 0.469 0 0.291 0.133 0.55 0.341 0.722l0.002 0.001 1.489 1.226c-0.126 0.566-0.198 1.216-0.198 1.883s0.072 1.317 0.209 1.943l-0.011-0.060-1.489 1.226c-0.21 0.173-0.342 0.432-0.342 0.723 0 0.173 0.047 0.335 0.129 0.474l-0.002-0.004 1.529 2.648c0.164 0.283 0.466 0.47 0.811 0.47 0.119 0 0.232-0.022 0.337-0.062l-0.006 0.002 1.808-0.677c0.908 0.823 1.996 1.467 3.196 1.866l0.064 0.018 0.317 1.902c0.075 0.447 0.459 0.783 0.922 0.783 0.001 0 0.002 0 0.003 0h3.057c0.001 0 0.002 0 0.003 0 0.463 0 0.847-0.336 0.921-0.778l0.001-0.005 0.317-1.902c1.263-0.417 2.351-1.061 3.267-1.891l-0.008 0.007 1.808 0.677c0.098 0.038 0.211 0.060 0.33 0.060 0.345 0 0.646-0.187 0.808-0.465l0.002-0.004 1.529-2.648c0.079-0.135 0.126-0.296 0.126-0.469 0-0.291-0.133-0.55-0.341-0.722l-0.002-0.001zM19.409 17.786l-2.255-0.845-0.341 0.344c-0.914 0.921-2.064 1.605-3.352 1.955l-0.053 0.012-0.469 0.124-0.396 2.374h-2.104l-0.396-2.374-0.469-0.124c-1.341-0.362-2.491-1.047-3.404-1.967l-0-0-0.341-0.344-2.255 0.845-1.052-1.822 1.858-1.529-0.127-0.467c-0.166-0.59-0.261-1.267-0.261-1.967s0.095-1.377 0.274-2.020l-0.013 0.053 0.127-0.467-1.858-1.529 1.052-1.822 2.255 0.845 0.341-0.344c0.914-0.921 2.064-1.605 3.352-1.955l0.053-0.012 0.469-0.124 0.396-2.374h2.104l0.396 2.374 0.469 0.124c1.341 0.362 2.491 1.047 3.404 1.967l0 0 0.341 0.344 2.255-0.845 1.052 1.822-1.858 1.529 0.127 0.467c0.166 0.59 0.261 1.267 0.261 1.967s-0.095 1.377-0.274 2.020l0.013-0.053-0.127 0.467 1.858 1.529z"></path>
                    </svg>
                </template>
                <div class="setItem">
                    <span class="setTitle">Login</span>
                    <CBadge class="ml-auto" color="secondary">
                        <CSwitch
                                :checked="settings.isLogin"
                                @update:checked="updateIsLogin"
                                color="success"
                                size="sm"
                                value="color"
                        />
                    </CBadge>
                </div>
                <div class="setItem">
                    <span class="setTitle">Update</span>
                    <CBadge class="ml-auto" color="secondary">
                        <CSwitch
                                :checked="settings.isUpdate"
                                @update:checked="updateIsUpdate"
                                color="success"
                                size="sm"
                                value="color"
                        />
                    </CBadge>
                </div>
                <div class="setItem">
                    <span class="setTitle">Bet</span>
                    <CBadge class="ml-auto" color="secondary">
                        <CSwitch
                                :checked="settings.isBet"
                                @update:checked="updateIsBet"
                                color="success"
                                size="sm"
                                value="color"
                        />
                    </CBadge>
                </div>
                <div class="setItem">
                    <span class="setTitle">BetDelay</span>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">s</div>
                        </div>
                        <input class="form-control" type="number" v-model="settings.betDelay">
                    </div>
                </div>
                <div>
                    <button @click="updateSettings" class="right btn btn-pill btn-success btn-sm" style="margin: 4px 2px 0 0;"
                            type="button">Update
                    </button>
                </div>
            </CTab>
        </CTabs>


    </CSidebar>
</template>

<script>
    import firebase from "firebase"
    import {store, mutations} from "../store";

    export default {
        data() {
            return {
                minimize: false,
                show: 'false',
                settings: {
                    isUpdate: false, isBet: true, isLogin: true, betDelay: 0
                },
                marketIds: [],markets:[],setInterval1:null
            }
        },
        methods: {
            updateIsBet(value) {
                this.settings.isBet = value;
            },
            updateIsLogin(value) {
                this.settings.isLogin = value;
            },
            updateIsUpdate(value) {
                this.settings.isUpdate = value;
            },
            updateSettings() {
                console.log(this.settings);
                firebase.firestore().collection("settings").doc('globalSetting').set(this.settings).then(function () {
                    Event.$emit('toast', 'success', 'Updated your settings successfully', 'success'/*'primary,secondary,danger,warning,success,info'*/)
                });
            },
            close() {
                this.show = false
            },
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

            updateMarketBook() {
                //return;
                if (this.marketIds.length == 0) {
                    return
                }
                window.axios.post('http://13.234.101.181:3001/listMarketBook', {"marketIds": this.marketIds,markets:this.markets}, {headers: {"Access-Control-Allow-Origin": "*"}}).then(({data}) => {
                    /*data.forEach((item1) => {
                        var index=this.markets.findIndex(m1=>m1.marketId==item1.marketId)
                        this.markets[index].status=item1.status
                        this.markets[index].updateTime=item1.updateTime
                        item1.runners.forEach(runner1=>{
                            var r_index=this.markets[index].runners.findIndex(runner0=>runner0.selectionId==runner1.selectionId)
                            this.markets[index].runners[r_index].status=runner1.status
                            this.markets[index].runners[r_index].lastPriceTraded=runner1.lastPriceTraded
                            this.markets[index].runners[r_index].ex=runner1.ex
                            //console.log(runner1);
                        })
                        //console.log(item1);
                        var filterMarket=this.markets[index]
                        firebase.firestore().collection("markets").doc(filterMarket.marketId).set(filterMarket).then(function() {

                        });
                    });*/
                    console.log('updated');

                }).catch(function (resp) {
                    console.log(resp);
                });
            },
            read() {
                let db = firebase.firestore().collection('settings').doc('globalSetting');
                db/*.where('parent', '==',email)*/.onSnapshot(doc => {
                    if (doc.empty) {
                        this.error = "There is no any events";
                        return;
                    }
                    this.settings = doc.data();
                })
            }
        },
        mounted() {
            this.$root.$on('toggle-right-sidebar', () => {
                const sidebarOpened = this.show === true || this.show === 'responsive';
                this.show = sidebarOpened ? false : 'responsive'
            });
            this.$root.$on('toggle-right-sidebar-mobile', () => {
                const sidebarClosed = this.show === 'responsive' || this.show === false;
                this.show = sidebarClosed ? true : 'responsive'
            })
        },
        created() {
            //console.log('getuser',store.user_data)
            this.read();
            this.setInterval1=setInterval(() => {
                if (!this.settings.isUpdate) return;
                //console.log('updating');
                let db = firebase.firestore().collection('markets');
                db.where('isUpdate', '==',true).onSnapshot(doc => {
                    if (doc.empty) {
                        this.error = "There is no any events";
                        return;
                    }
                    this.marketIds = [];
                    this.markets=[];
                    doc.forEach(item => {
                        this.marketIds.push(item.data().marketId)
                        this.markets.push(item.data())
                    });
                    //console.log(this.markets);
                    this.updateMarketBook();
                })
            }, 1000);
            console.log(store.user_data);
            firebase.auth().onAuthStateChanged(user => {
                let admins = firebase.firestore().collection('users').doc(user.email);
                admins/*.where('role', '>', 4)*/.onSnapshot(doc => {
                    if (doc.empty) {
                        this.$router.replace({
                            name: "Login"
                        });
                        return;
                    }
                    var account = doc.data();
                    if (account.role != 0) {
                        this.signOut()
                    }
                })
            });
        },
        beforeDestroy () {
            clearInterval(this.setInterval1)
        }

    }
</script>
