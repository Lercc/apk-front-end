<template>
    <div>
        <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8 ">
        </base-header>

        <!-- CONTENIDO -->
        <div class="container-fluid mt--7 border">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'GestionClientes',
    }
</script>

