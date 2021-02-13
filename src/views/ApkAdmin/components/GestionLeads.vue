<template>
    <div>
        <base-header type="gradient-primary" class="pb-8 pb-9 pt-5 pt-md-7">

            <div class="row">
                <div class=" d-flex justify-content-between flex-wrap">
                    <router-link :to="{name: 'lista-leads-calificados'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary">Calificados</div>
                    </router-link>

                     <b-dropdown size="sm" text="Perfiles aceptados">
                            <b-dropdown-item >
                                <router-link :to="{name: 'lista-leads-perfiles-aceptados',  params: {'mostrarDatos':'todos'}}">
                                   <span class="border border-danger w-100">todos</span>
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


                    <router-link :to="{name: 'lista-leads-edad'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary">Edad</div>
                    </router-link>

                    <router-link :to="{name: 'lista-leads-ingles'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary">Inglés</div>
                    </router-link>

                    <router-link :to="{name: 'crear-lead'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary">
                            <b-icon icon="person-plus-fill" ></b-icon>
                            <span>NUEVO</span>
                        </div>
                    </router-link>
                </div>
            </div>
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