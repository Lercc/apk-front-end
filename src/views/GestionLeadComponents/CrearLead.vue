<template>
    <b-container fluid >
        <b-row>
            <b-col>
                <b-card header="EDITAR LEAD" class="shadow-lg apk-shadow">
                    <b-form-row >
                        <b-col cols="12" lg="6"  >
                            <b-form-group label="* Dni" >
                                <b-form-input v-model="form.dni" type="number" placeholder="Ingrese su número de dni"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row >
                        <b-col cols="12" lg="6"  >
                            <b-form-group label="* Nombre" >
                                <b-form-input v-model="form.name" type="text" placeholder="Ingrese su nombre"></b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="6"  >
                            <b-form-group label="* Apellidos" >
                                <b-form-input v-model="form.surnames" type="text" placeholder="Ingrese su apellido paterno y materno"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12" lg="6">
                            <b-form-group label="* Celular" >
                                <b-form-input v-model="form.number" type="number" placeholder="Ingrese su número de celular"></b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group label="Correo" >
                                <b-form-input v-model="form.email" type="email" placeholder="Ingrese su correo de contacto"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <br>

                    <b-form-row>
                        <b-col cols="12" lg="6">
                            <b-form-group label="* Carrera">
                                <b-form-select v-model="form.career_id" :options="careersData" >
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Selecciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group label="* Semestre">
                                <b-form-select v-model="form.semester" :options="semesterData" >
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Selecciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="* Universidad/Instituto">
                                <b-form-select v-model="form.institution_id" :options="institutionData">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12" lg="6">
                            <b-form-group label="* Nivel de inglés">
                                <b-form-select v-model="form.english_level" :options="englishData">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group label="* Programa">
                                <b-form-select v-model="form.program_id" :options="programsData">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12" lg="6">
                            <b-form-group label="* Canal de comunicación preferente">
                                <b-form-select v-model="form.comunnication_chanel" :options="comunnicationChanelData">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group label="* Horario de contacto preferente">
                                <b-input-group>
                                    <b-form-input v-model="form.schedule_start" type="number" min="1" max="12" placeholder="Inicio"></b-form-input>

                                    <b-form-select v-model="form.schedule_start_meridiem">
                                        <b-form-select-option value="am"  >am</b-form-select-option>
                                        <b-form-select-option value="pm">pm</b-form-select-option>
                                    </b-form-select>

                                    <b-input-group-prepend>
                                        <b-input-group-text style="background-color: #e9ecef">a</b-input-group-text>
                                    </b-input-group-prepend>
                                    
                                    <b-form-input v-model="form.schedule_end" type="number" min="1" max="12" placeholder="Fin" class="pl-3"></b-form-input>

                                    <b-form-select v-model="form.schedule_end_meridiem">
                                        <b-form-select-option value="am">am</b-form-select-option>
                                        <b-form-select-option value="pm">pm</b-form-select-option>
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="Perfil">
                                <b-form-textarea v-model="form.profile"></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="Comentario">
                                <b-form-textarea v-model="form.commentary"></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                </b-card>
            </b-col>
        </b-row>
    </b-container>
 
    <!-- <b-container  fluid class=" border border-info col-12 col-lg-10">
        <b-row class="col-">
            <b-col>
                <b-card
                    header="EDITAR LEAD"
                    
                >
                    <b-row  no-gutters class="border border-success">
                        <b-col cols="8" class="border border-dark " >
                            <button  class="border border-primary col-12 ">Este es el primer boton</button>
                        </b-col>
                        <b-col   md="4"  class="border border-danger " >
                            <button  class="col-12">Este es el primer boton</button>
                        </b-col>
                    </b-row>

                    <br>

                    <b-form-row class="border border-success">
                        <b-col class="border border-dark">
                            <button class=" border border-primary col-12 ">hola</button>
                        </b-col>
                        <b-col class="border border-dark">
                            <button class=" border border-primary col-12 ">hola</button>
                        </b-col>

                    </b-form-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container> -->
</template>

<script>
import { getCareers } from '@/api/career'
import { getAllInstitutions } from '@/api/institution'
import { getApkPrograms } from '@/api/apkPrograms'

export default {
    name : 'EditarLead',
    data () {
        return {
            form : {
                dni : '',
                name : '',
                surnames : '',
                mobile : '',
                email : '',
                career_id : null,
                career_name : '',
                semester: null,
                institution_id : null,
                institution_name : '',
                english_level : null,
                program_id : null,
                program_name : '',
                comunnication_chanel: null,
                schedule_start : '',
                schedule_start_meridiem : 'am',
                schedule_end : '',
                schedule_end_meridiem : 'pm',
                commentary : '',
                profile : ''
            },
            //
            careersData : [],
            semesterData : [
                { 'value': 'I' , 'text': 'I'},
                { 'value': 'II' , 'text': 'II'},
                { 'value': 'III' , 'text': 'III'},
                { 'value': 'IV' , 'text': 'IV'},
                { 'value': 'V' , 'text': 'V'},
                { 'value': 'VI' , 'text': 'VI'},
                { 'value': 'VII' , 'text': 'VII'},
                { 'value': 'VIII' , 'text': 'VIII'},
                { 'value': 'IX' , 'text': 'IX'},
                { 'value': 'X' , 'text': 'X'},
                { 'value': 'XI' , 'text': 'XI'},
                { 'value': 'XII' , 'text': 'XII'},
            ],
            institutionData : [],
            englishData : [
                { 'value': 'básico' , 'text': 'básico'},
                { 'value': 'intermedio' , 'text': 'intermedio'},
                { 'value': 'avanzado' , 'text': 'avanzado'},
                { 'value': 'ninguno' , 'text': 'ninguno'},
            ],
            programsData : [],
            comunnicationChanelData : [
                { 'value': 'Facebook/Messenger' , 'text': 'Facebook/Messenger'},
                { 'value': 'Whatsapp' , 'text': 'Whatsapp'},
                { 'value': 'Instagram' , 'text': 'Instagram'},
                { 'value': 'Correo electrónico' , 'text': 'Correo electrónico'},
                { 'value': 'Celular' , 'text': 'Celular'},
            ]
      }
    },
    beforeMount() {
        this.getCareerData()
        this.getInstitutionData()
        this.getProgramData()
    },
    methods: {
        getCareerData(){
            getCareers()
                .then ( res => {
                    if (res.status == 200) {
                        this.careersData = res.data.data.map( m => ({ value : m.attributes.id, text : m.attributes.name }) )
                    }
                })
        },

        getInstitutionData(){
            getAllInstitutions()
                .then ( res => {
                    if (res.status == 200) {
                        this.institutionData = res.data.data.map( m => ({ value : m.attributes.id, text : m.attributes.name }) )
                    }
                })
        },

        getProgramData(){
            getApkPrograms()
                .then ( res => {
                    if (res.status == 200) {
                        this.programsData = res.data.data.map( m => ({ value : m.attributes.id, text : m.attributes.name }) )
                    }
                })
        }
    }
}
</script>
