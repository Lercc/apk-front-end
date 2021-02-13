<template>
    <div>
        <base-header type="gradient-primary" class="pb-8 pb-9 pt-5 pt-md-7">

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
        name: 'Careers',
    }
</script>