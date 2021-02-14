<template>
    <div>
        <base-header type="gradient-primary" class="pb-8 pb-9 pt-5 pt-md-7">

            <b-row>
                <b-col>
                    <b-dropdown text="TABLAS" block variant="secondary"  class="mb-3 w-100 d-sm-none">
                        <b-dropdown-item>
                             <router-link :to="{name: 'lista-leads-calificados'}" class="col-12 mb-3 ">
                                Tabla Calificados
                            </router-link>
                        </b-dropdown-item>
                
                        <b-dropdown-divider></b-dropdown-divider>


                        <b-dropdown-item>
                            <b-dropdown-group  header="Tabla perfiles aceptados" header-classes="text-muted">
                                <b-dropdown-item >
                                    <router-link :to="{name: 'lista-leads-perfiles-aceptados',  params: {'mostrarDatos':'todos'}}" >
                                        <span class="">Perfiles aceptados : todos</span>
                                    </router-link>
                                </b-dropdown-item>
                                
                                <b-dropdown-item >
                                    <router-link :to="{name: 'lista-leads-perfiles-aceptados-enviados',  params: {'mostrarDatos':'enviados'}}">
                                        Perfiles aceptados : enviados
                                    </router-link>
                                </b-dropdown-item>
                                
                                <b-dropdown-item >
                                    <router-link :to="{name: 'lista-leads-perfiles-aceptados-no-enviados',  params: {'mostrarDatos':'no-enviados'}}">
                                        Perfiles aceptados : no enviados
                                    </router-link>
                                </b-dropdown-item>
                            </b-dropdown-group>
                        </b-dropdown-item>

                        <b-dropdown-divider></b-dropdown-divider>

                        <b-dropdown-item>
                            <router-link :to="{name: 'lista-leads-edad'}" class="mb-3 col-12 mb-3 ">
                                Tabla Edad
                            </router-link>
                        </b-dropdown-item>
                       
                        <b-dropdown-item>
                            <router-link :to="{name: 'lista-leads-ingles'}" class="mb-3 col-12 mb-3 ">
                                Tabla Inglés
                            </router-link>
                        </b-dropdown-item>
                       
                        <b-dropdown-item>
                            <router-link :to="{name: 'crear-lead'}" class="mb-3 col-12 mb-3 ">
                                Nuevo
                            </router-link>
                        </b-dropdown-item>
                    </b-dropdown>

                </b-col>
            </b-row>

            <b-row class="d-none d-sm-flex">
                <b-col cols="12" sm="6" lg="4" xl="auto" >
                    <router-link :to="{name: 'lista-leads-calificados'}" class="btn btn-secondary col-12 mb-3 ">
                        <!-- <div class="btn  btn-secondary">Calificados</div>] -->
                        Calificados
                    </router-link>
                </b-col>

                <b-col cols="12" sm="6" lg="4" xl="auto">
                     <b-dropdown  text="Perfiles aceptados" block variant="secondary" menu-class="w-100" class="mb-3 w-100">
                            <b-dropdown-item >
                                <router-link :to="{name: 'lista-leads-perfiles-aceptados',  params: {'mostrarDatos':'todos'}}" >
                                   <span class="">todos</span>
                                </router-link>
                            </b-dropdown-item>
                            
                            <b-dropdown-item >
                                <router-link :to="{name: 'lista-leads-perfiles-aceptados-enviados',  params: {'mostrarDatos':'enviados'}}">
                                    enviados
                                </router-link>
                            </b-dropdown-item>
                            
                            <b-dropdown-item >
                                <router-link :to="{name: 'lista-leads-perfiles-aceptados-no-enviados',  params: {'mostrarDatos':'no-enviados'}}">
                                    no enviados
                                </router-link>
                            </b-dropdown-item>
                    </b-dropdown>
                </b-col>

                <b-col cols="12" sm="6" lg="4" xl="auto">
                     <router-link :to="{name: 'lista-leads-edad'}" class="mb-3 btn btn-secondary col-12 mb-3 ">
                        Edad
                    </router-link>
                </b-col>

                <b-col cols="12" sm="6" lg="4" xl="auto">
                    <router-link :to="{name: 'lista-leads-ingles'}" class="mb-3 btn btn-secondary col-12 mb-3 ">
                        Inglés
                    </router-link>
                </b-col>

                <b-col cols="12" sm="6" lg="4" xl="auto">
                    <router-link :to="{name: 'crear-lead'}" class="mb-3 btn btn-secondary col-12 mb-3 ">
                        <b-icon icon="person-plus-fill" ></b-icon>
                        <span>NUEVO</span>
                    </router-link>
                </b-col>
            </b-row>
        </base-header>

        <!-- CONTENIDO -->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                        <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'gestionLeads',
    }
</script>