<template>
    <CRow>
        <CCol col="12" xl="12">
            <transition name="slide">
                <CCard>
                    <CCardBody v-if="cMarket.runners">
                        <CRow>
                            <CCol>
                                <div style="display: flex;justify-content: space-between">
                                    <div>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Active:</div>
                                            </div>
                                            <CBadge class="ml-auto" color="secondary form-control">
                                                <CSwitch
                                                        :checked="cMarket.isActive?cMarket.isActive:false"
                                                        @update:checked="updateIsActive"
                                                        color="success"
                                                        size="sm"
                                                        value="color"
                                                />
                                            </CBadge>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Update:</div>
                                            </div>
                                            <CBadge class="ml-auto" color="secondary form-control">
                                                <CSwitch
                                                        :checked="cMarket.isUpdate?cMarket.isUpdate:false"
                                                        @update:checked="updateIsUpdate"
                                                        color="success"
                                                        size="sm"
                                                        value="color"
                                                />
                                            </CBadge>
                                        </div>
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="4">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Market:</div>
                                    </div>
                                    <select class="form-control" required v-on:change="selectMarket">
                                        <option :value="item.marketId" v-for="item in markets">{{item.marketName}}
                                        </option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4" v-if="cMarket.marketName=='Match Odds'">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Result:</div>
                                    </div>
                                    <select class="form-control" required>
                                        <option :value="item.selectionId" v-for="item in cMarket.runners">
                                            {{item.runnerName}}
                                        </option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4" v-if="cMarket.marketName!='Match Odds'">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Result:</div>
                                    </div>
                                    <input class="form-control" type="number">
                                </div>
                            </CCol>
                            <CCol sm="4" v-if="cMarket.marketName=='Match Odds'">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Rate Dif:</div>
                                    </div>
                                    <select class="form-control" v-model="cMarket.m_rDif" v-on:change="setMDif">
                                        <option v-for="item in m_rDif">{{item}}</option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4" v-if="cMarket.marketName!='Match Odds'">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Rate Dif:</div>
                                    </div>
                                    <select class="form-control" v-model="cMarket.s_rDif" v-on:change="setSDif">
                                        <option v-for="item in s_rDif">{{item}}</option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol sm="4" v-if="cMarket.marketName!='Match Odds'">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Rate:</div>
                                    </div>
                                    <select class="form-control" v-model="cMarket.rate" v-on:change="setSRate">
                                        <option v-for="item in rateList">{{item}}</option>
                                    </select>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <div style="margin: auto;margin-bottom: 10px">
                                <div :key="runner.selectionId" style="display: flex" v-for="runner in cMarket.runners">
                                    <div style="line-height: 47px;width: 150px;text-align: center">
                                        {{runner.runnerName}}
                                    </div>
                                    <div style="display: flex">
                                        <div style="background-color: #30ff4d;border: solid 1px #999999;text-align: center; width: 60px"
                                             v-for="availableToBack in runner.ex.availableToBack.slice().reverse()">
                                            <transition mode="out-in" name="slide-fade">
                                                <div :key="availableToBack.price+availableToBack.size">
                                                    <p style="margin: 0;font-size: 16px"><strong>{{availableToBack.price}}</strong>
                                                    </p>
                                                    <span>{{availableToBack.size}}</span>
                                                </div>
                                            </transition>
                                        </div>
                                        <div style="background-color: #ffa5af;border: solid 1px #999999;text-align: center;width: 60px"
                                             v-for="availableToLay in runner.ex.availableToLay">
                                            <transition mode="out-in" name="slide-fade">
                                                <div :key="availableToLay.price+availableToLay.size">
                                                    <p style="margin: 0;font-size: 16px"><strong>{{availableToLay.price}}</strong>
                                                    </p>
                                                    <span>{{availableToLay.size}}</span>
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="eventDetail" v-if="cMarket.marketName=='Match Odds'">
                                <div class="title">{{cMarket.event.name}}</div>

                                <div class="body">
                                    <transition mode="out-in" name="slide-fade">
                                        <div :class="{'favorite':cMarket.favorite==cMarket.event.home}"
                                             :key="(cMarket.runners[0].ex.availableToBack[0].price*100-100)+(cMarket.runners[0].ex.availableToLay[0].price*100-100)"
                                             @click="changeFav(cMarket.event.home)"
                                             class="section pointer">
                                            <div class="sectionName">
                                                {{cMarket.event.home}}
                                            </div>
                                            <div class="sectionPrice" v-if="cMarket.favorite==cMarket.event.home">
                                                {{(cMarket.runners[0].ex.availableToBack[0].price*100-100).toFixed(0)}}-
                                                {{(cMarket.runners[0].ex.availableToLay[0].price*100-100).toFixed(0)}}
                                            </div>
                                            <div class="sectionPrice" v-else>00-00</div>
                                        </div>
                                    </transition>
                                    <transition mode="out-in" name="slide-fade">
                                        <div :class="{'favorite':cMarket.favorite==cMarket.event.away}"
                                             :key="(cMarket.runners[1].ex.availableToBack[0].price*100-100)+(cMarket.runners[1].ex.availableToLay[0].price*100-100)"
                                             @click="changeFav(cMarket.event.away)"
                                             class="section pointer">
                                            <div class="sectionName">
                                                {{cMarket.event.away}}
                                            </div>
                                            <div class="sectionPrice" v-if="cMarket.favorite==cMarket.event.away">
                                                {{(cMarket.runners[1].ex.availableToBack[0].price*100-100).toFixed(0)}}-
                                                {{(cMarket.runners[1].ex.availableToLay[0].price*100-100).toFixed(0)}}
                                            </div>
                                            <div class="sectionPrice" v-else>00-00</div>
                                        </div>
                                    </transition>

                                </div>
                            </div>
                            <div class="eventDetail" v-else>
                                <div class="title">{{cMarket.event.name}}</div>
                                <div class="body">
                                    <div class="section pointer favorite">
                                        <div class="sectionName">
                                            No
                                        </div>
                                        <div class="sectionPrice">
                                            {{cMarket.runners[0].ex.availableToBack[0].price==0?'-':(cMarket.runners[0].ex.availableToBack[0].price*100-100).toFixed(0)}}
                                        </div>
                                        <div class="sectionRate">
                                            {{cMarket.rate.split('/')[0]}}%
                                        </div>
                                    </div>
                                    <div class="section pointer ">
                                        <div class="sectionName">
                                            Yes
                                        </div>
                                        <div class="sectionPrice">
                                            {{cMarket.runners[0].ex.availableToLay[0].price==0?'-':(cMarket.runners[0].ex.availableToLay[0].price*100-100).toFixed(0)}}
                                        </div>
                                        <div class="sectionRate">
                                            {{cMarket.rate.split('/')[1]}}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="editPanel" v-if="cMarket.marketName=='Match Odds'">
                                <div :class="{'active':cMarket.favorite==cMarket.event.home?item==parseInt(
                                    (cMarket.runners[0].ex.availableToBack[0].price*100-100).toFixed(0)
                                    ):item==parseInt(
                                        (cMarket.runners[1].ex.availableToBack[0].price*100-100).toFixed(0)
                                    )}"
                                     @click="mSetOdd(item)" class="editItem"
                                     v-for="item in 100"
                                >{{item}}
                                </div>
                            </div>
                            <div class="editPanel" v-else>
                                <div v-for="item in 100">
                                    <div :class="{'active':cMarket.runners[0].ex.availableToBack[0].price==0?1:item==parseInt(
                                    (cMarket.runners[0].ex.availableToBack[0].price*100-100).toFixed(0)
                                    )}"
                                         class="sEditItem1"
                                         @click="sSetOdd(item)"
                                    >{{item}}
                                    </div>
                                    <div class="sEditItem2">{{item}}<br>{{cMarket.rate}}</div>
                                </div>
                            </div>
                        </CRow>

                    </CCardBody>
                </CCard>
            </transition>
        </CCol>
    </CRow>
</template>
<style>
    .table th, .table td {
        padding: 4px !important;
    }

    .eventDetail .slide-fade-enter-active {
        -webkit-animation-name: example1; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 1s; /* Safari 4.0 - 8.0 */
        -webkit-animation-iteration-count: 6; /* Safari 4.0 - 8.0 */
        animation-name: example1;
        animation-duration: 1s;
        animation-iteration-count: 6;
    }

    .slide-fade-enter-active {
        -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 1s; /* Safari 4.0 - 8.0 */
        -webkit-animation-iteration-count: 6; /* Safari 4.0 - 8.0 */
        animation-name: example;
        animation-duration: 1s;
        animation-iteration-count: 6;
    }

    @-webkit-keyframes example {
        0% {
            background-color: #7cd3f7;
        }
        50% {
            background-color: #deddd8;
        }
        100% {
            background-color: #f99389;
        }
    }

    @keyframes example {
        0% {
            background-color: #7cd3f7;
        }
        50% {
            background-color: #deddd8;
        }
        100% {
            background-color: #f99389;
        }
    }

    @-webkit-keyframes example1 {
        0% {
            color: #7cd3f7;
        }
        50% {
            color: #deddd8;
        }
        100% {
            color: #f99389;
        }
    }

    @keyframes example1 {
        0% {
            color: #7cd3f7;
        }
        50% {
            color: #deddd8;
        }
        100% {
            color: #f99389;
        }
    }
</style>
<script>var favorite;

import firebase from "firebase"

export default {
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            m_result: ['Parkistan', 'Bangladesh', 'Draw'],
            s_result: 0,
            m_rDif: [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 7, 10],
            s_rDif: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            rateList: ['105/95', '110/90', '115/85', '120/80', '130/70', '150/50'],
            markets: [],
            cMarket: {
                marketName: "Match Odds",
                event: {
                    name: 'Pakistan vs Bangladesh - 1st Test',
                    home: 'Pakistan', away: 'Bangladesh - 1st Test',
                },
                favorite: 'Pakistan',
            },
        }
    },
    methods: {
        setMDif() {
            console.log(this.cMarket.m_rDif);
            if (this.cMarket.favorite == this.cMarket.event.home) {
                this.cMarket.homeDif = parseFloat(this.cMarket.m_rDif);
                var value = parseFloat(this.cMarket.runners[0].ex.availableToBack[0].price);
                this.cMarket.runners[0].ex.availableToLay[0].price = (value + this.cMarket.homeDif / 100).toFixed(2)
            } else {
                this.cMarket.awayDif = parseFloat(this.cMarket.m_rDif);
                var value = parseFloat(this.cMarket.runners[1].ex.availableToBack[0].price);
                this.cMarket.runners[1].ex.availableToLay[0].price = (value + this.cMarket.awayDif / 100).toFixed(2)
            }
        },
        setSDif(value) {

        },
        sSetOdd(value){
            console.log(value)
            this.cMarket.runners[0].ex.availableToBack[0].price = (value / 100 + 1).toFixed(2);
        },
        setSRate() {

        },
        mSetOdd(value) {
            console.log(value);
            if (this.cMarket.favorite == this.cMarket.event.home) {
                this.cMarket.runners[0].ex.availableToBack[0].price = (value / 100 + 1).toFixed(2);
                this.cMarket.runners[0].ex.availableToLay[0].price = (value / 100 + 1 + this.cMarket.homeDif / 100).toFixed(2)
            } else {
                this.cMarket.runners[1].ex.availableToBack[0].price = (value / 100 + 1).toFixed(2);
                this.cMarket.runners[1].ex.availableToLay[0].price = (value / 100 + 1 + this.cMarket.awayDif / 100).toFixed(2)
            }
        },
        selectMarket(e) {
            let marketId = e.target.value;
            let index = this.markets.findIndex(item => item.marketId == marketId);
            this.cMarket = this.markets[index];
            console.log(e.target.value, this.cMarket)
        },
        updateIsActive(value) {
            this.cMarket.isActive = value
        },
        updateIsUpdate(value) {
            this.cMarket.isUpdate = value
        },
        changeFav(val) {
            this.cMarket.favorite = val;
            this.cMarket.m_rDif = val == this.cMarket.event.home ? this.cMarket.homeDif : this.cMarket.awayDif;
            this.cMarket.m_rDif = parseFloat(this.cMarket.m_rDif.toFixed(2));
            console.log(this.cMarket.m_rDif);
            console.log(this.cMarket)
        },
        read() {
            console.log(this.$route.params.eventId);
            let db = firebase.firestore().collection('markets');
            db.where('eventId', '==', this.$route.params.eventId).onSnapshot(doc => {
                if (doc.empty) {
                    this.error = "There is no any events";
                    return;
                }
                var temp_items = [];
                doc.forEach(item => {
                    var temp = item.data();
                    if (temp.marketName == 'Match Odds') {
                        if (temp.favorite == undefined) {
                            if (temp.runners[0].ex.availableToBack[0].price < 2) {
                                temp.favorite = temp.event.home
                            } else {
                                temp.favorite = temp.event.away
                            }
                            temp.homeDif = (temp.runners[0].ex.availableToLay[0].price - temp.runners[0].ex.availableToBack[0].price) * 100;
                            temp.awayDif = (temp.runners[1].ex.availableToLay[0].price - temp.runners[1].ex.availableToBack[0].price) * 100
                        }
                    } else {
                        if (temp.rate == undefined) {
                            temp.rate = '105/95'
                        }
                    }
                    temp_items.push(temp)
                });
                this.markets = temp_items;
                this.cMarket = this.markets[0];
                console.log(this.markets)
            })
        },
    },

    created() {
        this.read()
    },
    beforeDestroy() {

    }
}
</script>


