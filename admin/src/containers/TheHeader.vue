<template>
    <CHeader fixed light with-subheader>
        <CToggler
                class="ml-3 d-lg-none"
                in-header
                v-c-emit-root-event:toggle-sidebar-mobile
        />
        <CToggler
                class="ml-3 d-md-down-none"
                in-header
                v-c-emit-root-event:toggle-sidebar
        />
        <CHeaderBrand
                alt="CoreUI Logo"
                class="mx-auto d-lg-none"
                height="46"
                src="img/brand/coreui-vue-logo.svg"
                width="190"
        />

        <CHeaderNav class="d-md-down-none mr-auto">
            <CHeaderNavItem class="px-3">
                <CHeaderNavLink to="/dashboard">
                    Dashboard
                </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="px-3">
                <CHeaderNavLink exact to="/users">
                    Users
                </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="px-3">
                <CHeaderNavLink>
                    Settings
                </CHeaderNavLink>
            </CHeaderNavItem>
        </CHeaderNav>
        <CHeaderNav class="mr-4">
            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CIcon name="cil-bell"/>
                </CHeaderNavLink>
            </CHeaderNavItem>

            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CIcon name="cil-envelope-open"/>
                </CHeaderNavLink>
            </CHeaderNavItem>
            <TheHeaderDropdownAccnt/>
            <CHeaderNavItem class="mx-2" v-if="userData.role==0">
                <span class="h2 mb-2" v-c-emit-root-event:toggle-right-sidebar><b-icon
                        icon="three-dots-vertical"></b-icon></span>
            </CHeaderNavItem>

        </CHeaderNav>
        <CSubheader class="px-3">
            <CBreadcrumbRouter class="border-0"/>
        </CSubheader>
    </CHeader>
</template>

<script>
    import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
    import Setting from "./Setting";
    import {store} from "../store";

    export default {
        name: 'TheHeader',
        components: {
            TheHeaderDropdownAccnt, Setting
        },
        computed: {
            userData() {
                return store.user_data;
            }
        }
    }
</script>
