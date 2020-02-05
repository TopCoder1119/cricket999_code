<template>
    <b-container fluid style="font-size: 14px;background-color: #fffdfd;
    color: black;">
        <b-row>
            <b-col style="background-color: #23ff14aa;padding-top: 20px">
                <div style="float: right">
                    <b-check v-model="inPlayOnly">inPlayOnly</b-check>
                    <b-check v-model="turnInPlayEnabled">turnInPlayEnabled</b-check>
                </div>
                <p>
                    InPlay Markets Count:<strong>{{inplay_markets_account}}</strong>,
                    Total Markets:<strong>{{total_markets_account}}</strong>
                </p>

            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button @click="getCompetitions" size="sm" variant="success">Competitions</b-button>
                <div style="max-height: 400px;overflow: scroll">
                    <b-table :fields="fieldsCompetition" :items="listCompetitions" hover outlined striped >
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button @click="addCompetition(data.item)" b-button style="padding: 0 5px"
                                      variant="success"
                            >
                                <b-icon-chevron-right></b-icon-chevron-right>
                            </b-button>
                        </template>
                    </b-table>
                </div>
            </b-col>
            <b-col>
                <b-button size="sm" variant="success">Event List({{listEvents.length}})</b-button>
                <div style="max-height: 400px;overflow: scroll">
                    <b-table :fields="fieldsEvent" :items="listEvents" hover outlined striped>
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(action)="data">
                            <div style="display: flex">
                                <b-button @click="removeEvent(data.item)" b-button style="padding: 0 5px"
                                          variant="danger"
                                >
                                    <b-icon-chevron-left></b-icon-chevron-left>
                                </b-button>
                                <b-button @click="addEvent(data.item)" b-button style="padding: 0 5px"
                                          variant="success"
                                >
                                    <b-icon-chevron-right></b-icon-chevron-right>
                                </b-button>
                            </div>
                        </template>
                    </b-table>
                </div>

            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button size="sm" variant="success">Market List({{listMarketCatalogue.length}})</b-button>
                <div style="max-height: 400px;overflow: scroll">
                    <b-table :fields="fieldslistMarketCatalogue" :items="listMarketCatalogue" hover outlined striped>
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(action)="data">
                            <div style="display:flex;">
                                <b-button @click="removeMarket(data.item)" b-button style="padding: 0 5px"
                                          variant="danger"
                                >
                                    <b-icon-chevron-left></b-icon-chevron-left>
                                </b-button>
                                <b-button @click="addMarket(data.item)" b-button style="padding: 0 5px"
                                          variant="success"
                                >
                                    <b-icon-chevron-right></b-icon-chevron-right>
                                </b-button>
                            </div>
                        </template>
                    </b-table>
                </div>
            </b-col>
            <b-col>
                <b-button size="sm" variant="success">Market Book List({{listMarketBook.length}})</b-button>
                <div style="max-height: 400px;overflow: scroll">
                    <b-table :fields="fieldslistMarketBook" :items="listMarketBook" hover outlined striped>
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button @click="removeMarketBook(data.item)" b-button style="padding: 0 5px"
                                      variant="danger"
                            >
                                <b-icon-chevron-left></b-icon-chevron-left>
                            </b-button>
                            <b-button @click="addMarketBook(data.item)" b-button style="padding: 0 5px"
                                      variant="success"
                            >
                                <b-icon-chevron-right></b-icon-chevron-right>
                            </b-button>
                        </template>
                    </b-table>
                </div>
            </b-col>
        </b-row>

        <b-row align-v="start">
            <b-col :key="market.marketId" style="width: 50%;max-width: 360px" v-for="market in listMarketBook">
                marketId:{{market.marketId}}
                <div :key="runner.selectionId" v-for="runner in market.runners">
                    <div style="display: flex">
                        <div style="background-color: #30ff4d;border: solid 1px #999999;text-align: center; width: 60px"
                             v-for="availableToBack in runner.ex.availableToBack.slice().reverse()">
                            <transition mode="out-in" name="slide-fade">
                                <div :key="availableToBack.price+availableToBack.size">
                                    <p style="margin: 0;font-size: 16px"><strong>{{availableToBack.price}}</strong></p>
                                    <span>{{availableToBack.size}}</span>
                                </div>
                            </transition>
                        </div>
                        <div style="background-color: #ffa5af;border: solid 1px #999999;text-align: center;width: 60px"
                             v-for="availableToLay in runner.ex.availableToLay">
                            <transition mode="out-in" name="slide-fade">
                                <div :key="availableToLay.price+availableToLay.size">
                                    <p style="margin: 0;font-size: 16px"><strong>{{availableToLay.price}}</strong></p>
                                    <span>{{availableToLay.size}}</span>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<style>
    .table th, .table td {
        padding: 4px !important;
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

</style>
<script>
    import firebase from "firebase"
    export default {
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                total_markets_account: 0, inplay_markets_account: 0,
                listCompetitions: [],
                fieldsCompetition: [
                    'index',
                    {
                        key: 'id',
                        sortable: true
                    },
                    {
                        key: 'name',
                        sortable: true
                    },
                    {
                        key: 'marketCount',
                        label: 'count',
                        sortable: true,
                    },
                    {
                        key: 'competitionRegion',
                        label: 'Region',
                        sortable: true,
                    },
                    {
                        key: 'action',
                        label: 'Action',
                        //sortable: true,
                    }
                ],
                fieldsEvent: [
                    'index',
                    {
                        key: 'id',
                        sortable: true
                    },
                    {
                        key: 'name',
                        sortable: false
                    },
                    {
                        key: 'countryCode',
                        sortable: true,
                    },
                    {
                        key: 'timezone',
                        sortable: true,
                    }, {
                        key: 'openDate',
                        sortable: true,
                    }, {
                        key: 'marketCount',
                        sortable: true,
                    },
                    {
                        key: 'action',
                        label: 'Action',
                        //sortable: true,
                    }
                ],
                fieldslistMarketCatalogue: [
                    'index',
                    {
                        key: 'marketId',
                        sortable: true
                    },
                    {
                        key: 'marketName',
                        sortable: true
                    },
                    {
                        key: 'totalMatched',
                        sortable: true,
                    },
                    {
                        key: 'action',
                        label: 'Action',
                        //sortable: true,
                    }
                ],
                fieldslistMarketBook: [
                    'index',
                    {
                        key: 'marketId',
                        sortable: true
                    },
                    {
                        key: 'updateTime',
                        sortable: false
                    },
                    {
                        key: 'status',
                        sortable: true,
                    }, {
                        key: 'inplay',
                        sortable: true,
                    }, {
                        key: 'totalMatched',
                        sortable: true,
                    },
                    {
                        key: 'action',
                        sortable: false,
                    },
                ],
                checkedListCom: [], listEvents: [],
                checkedListEvents: [], listMarketCatalogue: [],
                marketIds: [], listMarketBook: [],inPlayOnly:false,turnInPlayEnabled:true,
                setInterval1:null
            }
        },
        methods: {
            removeMarketBook(item){
                var index = this.marketIds.findIndex(item1 => item1 == item.marketId);
                console.log(item,index)
                if (index > -1) {
                    this.marketIds.splice(index, 1);
                }
            },
            addMarketBook(item){
                var index = this.listMarketCatalogue.findIndex(item1 => item1.marketId === item.marketId);
                var market=this.listMarketCatalogue[index];
                market.status=item.status
                console.log('markets',market)
                //market.runners=item.runners
                market.runners.forEach((runner)=>{
                    item.runners.forEach((r_runner)=>{
                        console.log('runners1',runner.selectionId,r_runner.selectionId)
                        if (runner.selectionId==r_runner.selectionId){
                            runner.ex=r_runner.ex
                            runner.status=r_runner.status
                            runner.lastPriceTraded=r_runner.lastPriceTraded
                            console.log('runners',runner.selectionId,r_runner.selectionId,runner)
                        }
                    })
                })
                market.inplay=item.inplay
                market.updateTime=item.updateTime
                market.eventId=market.event.id
                market.isUpdate=true
                let event=market.event;
                event.home=event.name.split(' v ')[0]
                event.away=event.name.split(' v ')[1]
                market.event.home=event.name.split(' v ')[0]
                market.event.away=event.name.split(' v ')[1]
                if (event.away==undefined || event.home==undefined){
                    Event.$emit('toast','warning','Can not add this event because event have no home team and away team','warning'/*'primary,secondary,danger,warning,success,info'*/)
                    return;
                }
                let filterMarket = market
                /*Object.keys(market).filter(d => {
                    if(d !== 'event'){
                        filterMarket[d] = market[d];
                    }
                })*/
                console.log(filterMarket.runners)
                firebase.firestore().collection("markets").doc(filterMarket.marketId).set(filterMarket).then(function() {
                    firebase.firestore().collection("events").doc(event.id).set(event).then(function() {
                        Event.$emit('toast','success','Added this event successfully','success'/*'primary,secondary,danger,warning,success,info'*/)
                    });
                });


            },
            removeMarket(item) {
                var index = this.listMarketCatalogue.findIndex(item1 => item1.id === item.id);
                if (index > -1) {
                    this.listMarketCatalogue.splice(index, 1);
                }
            },
            addMarket(item) {
                console.log(item);
                var index = this.marketIds.findIndex(item1 => item1 === item.marketId);
                if (index > -1) {
                    return;
                } else {
                    this.marketIds.push(item.marketId)
                }
                console.log(this.marketIds);
                if (this.marketIds.length == 0) {
                    this.listMarketBook=[]
                    return
                }
                window.axios.post('http://13.234.101.181:3000/listMarketBook', {"marketIds": this.marketIds}, {headers: {"Access-Control-Allow-Origin": "*"}}).then(({data}) => {
                    data.forEach((item1) => {
                        var index = this.listMarketBook.findIndex(item2 => item2.marketId === item1.marketId);
                    });
                    this.listMarketBook = data
                    //console.log(data);
                }).catch(function (resp) {
                    console.log(resp);
                });
            },
            removeEvent(item) {
                var index = this.listEvents.findIndex(item1 => item1.id === item.id);
                if (index > -1) {
                    this.listEvents.splice(index, 1);
                }
            },
            addEvent(item) {
                var index = this.checkedListEvents.findIndex(item1 => item1.id === item.id);
                if (index > -1) {
                    this.checkedListEvents.splice(index, 1);
                    return
                }
                var eventIds = [item.id];
                console.log(eventIds);
                window.axios.post('http://13.234.101.181:3000/listMarketCatalogue', {"eventIds": eventIds,inPlayOnly:this.inPlayOnly,turnInPlayEnabled:this.turnInPlayEnabled}).then(({data}) => {
                    this.listMarketCatalogue=[];
                    this.marketIds=[];
                    console.log('listMarketCatalogue',data);
                    data.forEach((item1) => {
                        var index = this.listMarketCatalogue.findIndex(item2 => item2.marketId === item1.marketId);
                        //item1.event=item
                        if (index > -1) {
                            this.listMarketCatalogue[index] = item1;
                        } else {
                            this.listMarketCatalogue.push(item1);
                        }
                    });

                }).catch(function (resp) {
                    console.log(resp);
                });
            },
            addCompetition(item) {
                var index = this.checkedListCom.findIndex(item1 => item1.id === item.id);
                if (index > -1) {
                    this.checkedListCom.splice(index, 1);
                    return
                }
                var competitionIds = [item.id];
                console.log(competitionIds);
                /*if (competitionIds.length==0){
                  this.listEvents=[]
                  return
                }*/
                this.listEvents=[];
                window.axios.post('http://13.234.101.181:3000/listEvents', {"competitionIds": competitionIds,inPlayOnly:this.inPlayOnly,turnInPlayEnabled:this.turnInPlayEnable}).then(({data}) => {
                    data.forEach((item1) => {
                        //item1.competition=item
                        var index = this.listEvents.findIndex(item2 => item2.id === item1.id);
                        if (index > -1) {
                            this.listEvents[index] = item1
                        } else {
                            this.listEvents.push(item1);
                        }
                    });
                    console.log(data);
                }).catch(function (resp) {
                    console.log(resp);
                });
            },
            getCompetitions() {
                window.axios.post('http://13.234.101.181:3000/listCompetitions', {"inPlayOnly": false,inPlayOnly:this.inPlayOnly,turnInPlayEnabled:this.turnInPlayEnable}).then(({data}) => {
                    this.listCompetitions = data;
                    console.log(data);
                }).catch(function (resp) {
                    console.log(resp);
                });
            },
            getMarketAccount() {
                window.axios.post('http://13.234.101.181:3000/listEventTypes', {"inPlayOnly": false}).then(({data}) => {
                    this.total_markets_account = data.result[0].marketCount;
                    console.log(data);
                }).catch(function (resp) {
                    console.log(resp);
                });
                window.axios.post('http://13.234.101.181:3000/listEventTypes', {"inPlayOnly": true}).then(({data}) => {
                    this.inplay_markets_account = data.result[0].marketCount;
                    console.log(data);
                }).catch(function (resp) {
                    console.log(resp);
                });
            },
        },

        created() {

            this.getCompetitions();
            this.getMarketAccount();
            /*this.setInterval1=setInterval(() => {
                if (this.marketIds.length == 0) {
                    this.listMarketBook=[]
                    return
                }
                window.axios.post('http://13.234.101.181:3000/listMarketBook', {"marketIds": this.marketIds}, {headers: {"Access-Control-Allow-Origin": "*"}}).then(({data}) => {
                    data.forEach((item1) => {
                        var index = this.listMarketBook.findIndex(item2 => item2.marketId === item1.marketId);
                    });
                    this.listMarketBook = data
                    //console.log(data);
                }).catch(function (resp) {
                    console.log(resp);
                });
            }, 800)*/
            //this.read()
        },
        beforeDestroy () {
            clearInterval(this.setInterval1)
        }
    }
</script>


