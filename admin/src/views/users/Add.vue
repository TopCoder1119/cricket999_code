<template>
    <CRow>
        <CCol col="12" lg="12">
            <CCard>
                <CCardHeader>
                    New Account
                </CCardHeader>
                <CCardBody>
                    <CForm @submit.prevent="addUser">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <CRow>
                            <CCol sm="4">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Role</div>
                                    </div>
                                    <select class="form-control" required v-model="user.role">
                                        <option v-if="userData.role<1" value="1">Admin</option>
                                        <option v-if="userData.role<2" value="2">Super Master</option>
                                        <option v-if="userData.role<3" value="3">Master</option>
                                        <option v-if="userData.role<4" value="4">User</option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Username"
                                        autocomplete="username email"
                                        v-model="user.email"
                                        required
                                >
                                    <template #prepend-content>
                                        <!--<CIcon name="cil-user"/>-->
                                        Email
                                    </template>
                                </CInput>
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        id="password"
                                        autocomplete="curent-password"
                                        v-model="user.password"
                                        required
                                >
                                    <template #prepend-content>
                                       <!-- <CIcon name="cil-lock-locked"/>-->
                                        Password
                                    </template>
                                </CInput>
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                        type="text"
                                        placeholder="DisplayName"
                                        v-model="user.displayName"
                                        required
                                >
                                    <template #prepend-content>
                                        DisplayName
                                    </template>
                                </CInput>
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                        type="text"
                                        placeholder="Country/City"
                                        v-model="user.national"
                                        required
                                >
                                    <template #prepend-content>
                                        Country/City
                                    </template>
                                </CInput>
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                        type="text"
                                        placeholder="Phone"
                                        v-model="user.phone"
                                        required
                                >
                                    <template #prepend-content>
                                        Phone
                                    </template>
                                </CInput>
                            </CCol>
                            <CCol sm="4">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Commission Match</div>
                                    </div>
                                    <select class="form-control" required v-model="user.m_comm">
                                        <option value="0">0%</option>
                                        <option value="1">1%</option>
                                        <option value="2">2%</option>
                                        <option value="3">3%</option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Commission Session</div>
                                    </div>
                                    <select class="form-control" required v-model="user.s_comm">
                                        <option value="0">0%</option>
                                        <option value="1">1%</option>
                                        <option value="2">2%</option>
                                        <option value="2.5">2.5%</option>
                                        <option value="3">3%</option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Commission Lucky</div>
                                    </div>
                                    <select class="form-control" required v-model="user.l_comm">
                                        <option value="0">0%</option>
                                        <option value="1">1%</option>
                                        <option value="2">2%</option>
                                        <option value="2.5">2.5%</option>
                                        <option value="3">3%</option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                        type="number"
                                        placeholder="Phone"
                                        v-model="user.partnership"
                                        :max="userData.limit_p"
                                        min="0"
                                        required
                                >
                                    <template #prepend-content>
                                        Partnerships(%)
                                    </template>
                                </CInput>
                            </CCol>
                            <CCol sm="4">
                                <input id="ch1" type="checkbox" v-model="user.luck_allow" >
                                <label for="ch1" class="form-check-label">Lucky State</label>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol col="6">
                                <CButton color="primary" @click="$router.go(-1)">Back</CButton>
                            </CCol>
                            <CCol col="6" class="text-right">
                                <CButton type="submit" color="success" class="px-4">Submit</CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
    import firebase from "firebase"
    import {store, mutations} from "../../store";
    import usersData from "./UsersData";
    export default {
        computed:{
            userData(){
                return store.user_data;
            }
        },
        data(){
            return {
                error:'',
                user:{
                    email:'', displayName:'', password:'', national:'', phone:'',
                    partnership:0,
                    luck_allow:false,
                    role:store.user_data.role+1,
                    balance:0, mb_up:0, mb_down:0,
                    commission:0,
                    m_comm:0,mc_up:0, mc_down:0,
                    s_bal:0, sb_up:0, sb_down:0,
                    s_comm:0,sc_up:0, sc_down:0,
                    l_bal:0,lb_up:0,lb_down:0,
                    l_comm:0,lc_up:0,lc_down:0,
                    state:0,
                    parent:store.user_data.email,
                    limit_p:100
                },
                myAccount:store.user_data
            }
        },
        created() {
            console.log(store.user_data)
        },
        methods:{
            addUser(){
                this.user.limit_p=store.user_data.limit_p-this.user.partnership
                this.user.parent=store.user_data.email
                console.log(this.user)
                window.axios.post('http://13.234.101.181:3000/addUser', {uid:store.user_data.uid,user_data:this.user}).then(({data}) => {
                    console.log(data);
                    this.error=data.msg
                }).catch((resp)=> {
                    console.log(resp.response)
                    this.error=resp.response.data.msg
                });
            }
        }
    }
</script>
