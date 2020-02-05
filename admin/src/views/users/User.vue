<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard>
        <CCardHeader>
          User id:  {{ $route.params.id }}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            striped
            small
            fixed
            :items="getUserData()"
            :fields="$options.fields"
            sorter
          />
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
//import usersData from './UsersData'
export default {
  name: 'User',
  fields: [
    { key: 'key', _style: 'width:150px' },
    { key: 'value' , _style: 'width:150px;' },
  ],
  data(){
    return{
      userData:{},
    }
  },
  methods: {
    getUserData () {
      this.userData=JSON.stringify(this.$route.query);
      //console.log(this.userData)
      const user = this.$route.query
      const userDetails = user ? Object.entries(user) : [['id', 'Not found']]
      return userDetails.map(([key, value]) => { return { key, value } })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
