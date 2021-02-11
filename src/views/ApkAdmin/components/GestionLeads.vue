<template>
    <div>
        <base-header type="gradient-primary" class="pb-8 pb-9 pt-5 pt-md-7">

            <div class="row ">
                <div class="col d-flex justify-content-between flex-wrap">
                    <router-link :to="{name: 'lista-leads-calificados'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary active">Calificados</div>
                    </router-link>
                    <router-link :to="{name: 'lista-leads-perfiles-aceptados'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary">Perfiles aceptados</div>
                    </router-link>
                    <router-link :to="{name: 'lista-leads-calificados'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary">Inglés</div>
                    </router-link>
                    <router-link :to="{name: 'lista-leads-calificados'}" class="mb-3">
                        <div class="btn btn-sm btn-secondary">Edad</div>
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