<template>
    <b-container class="col-12 col-md-12 col-xl-10">
        <b-row>
            <b-col >
                <b-card header="REGISTRO" class="shadow-lg apk-shadow" header-text-variant="center">
                    <b-form-row >
                        <b-col cols="12" xl="6"  >
                            <b-form-group label="* Dni" >
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>
                                
                                <b-form-input v-model="form.dni" type="number" :state="dniState"  placeholder="Ingrese su número de dni" v-show="!leadLoading"></b-form-input>
                                
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('dni')"
                                    :key="`dni-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row >
                        <b-col cols="12" xl="6"  >
                            <b-form-group label="* Nombre" >
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-input v-model="form.name" type="text" :state="nameState" placeholder="Ingrese su nombre" v-show="!leadLoading"></b-form-input>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('name')"
                                    :key="`name-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" xl="6"  >
                            <b-form-group label="* Apellidos" >
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-input v-model="form.surnames" type="text" :state="surnamesState" placeholder="Ingrese su apellido paterno y materno" v-show="!leadLoading"></b-form-input>
                              
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('surnames')"
                                    :key="`surnames-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12" xl="6">
                            <b-form-group label="* Celular" >
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-input v-model="form.mobile" type="number" :state="mobileState" placeholder="Ingrese su número de celular" v-show="!leadLoading"></b-form-input>
                            
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('mobile')"
                                    :key="`mobile-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" xl="6">
                            <b-form-group label="Correo" >
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-input v-model="form.email" type="email" :state="emailState" placeholder="Ingrese su correo de contacto" v-show="!leadLoading"></b-form-input>
                            
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('email')"
                                    :key="`email-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <br>

                    <b-form-row>
                        <b-col cols="12" xl="6">
                            <b-form-group label="* Carrera">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-select v-model="form.career_id" :options="careersData" :state="career_idState" v-show="!leadLoading">
                                    <template #first>
                                        <b-form-select-option value="" disabled>-- Selecciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>
                           
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('career_id')"
                                    :key="`career_id-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" xl="6">
                            <b-form-group label="* Semestre">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-select v-model="form.semester" :options="semesterData" :state="semesterState" v-show="!leadLoading">
                                    <template #first>
                                        <b-form-select-option value="" disabled>-- Selecciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('semester')"
                                    :key="`semester-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12">
                            <b-form-group label="* Universidad/Instituto">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-select v-model="form.institution_id" :options="institutionData" :state="institution_idState" v-show="!leadLoading">
                                    <template #first>
                                        <b-form-select-option value="" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('institution_id')"
                                    :key="`institution_id-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12" xl="6">
                            <b-form-group label="* Nivel de inglés">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-select v-model="form.english_level" :options="englishData" :state="english_levelState" v-show="!leadLoading">
                                    <template #first>
                                        <b-form-select-option value="" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('english_level')"
                                    :key="`english_level-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" xl="6">
                            <b-form-group label="* Programa">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-select v-model="form.program_id" :options="programsData" :state="program_idState" v-show="!leadLoading">
                                    <template #first>
                                        <b-form-select-option value="" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('program_id')"
                                    :key="`program_id-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12" xl="6">
                            <b-form-group label="* Canal de comunicación preferente">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-form-select v-model="form.communication_channel" :options="comunnicationChanelData" :state="communication_channelState" v-show="!leadLoading">
                                    <template #first>
                                        <b-form-select-option value="" disabled>-- Seleeciona una opción --</b-form-select-option>
                                    </template>
                                </b-form-select>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('communication_channel')"
                                    :key="`communication_channel-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" xl="6">
                            <b-form-group label="* Horario de contacto preferente">
                                <div class="" v-show="leadLoading">
                                    <pulse-loader :loading="leadLoading" :size="10" :margin="'10px'" :color="'#2B2D64'" />
                                </div>

                                <b-input-group v-show="!leadLoading">
                                    <b-form-input v-model="form.schedule_start" :state="schedule_startState" type="number" min="1" max="12" placeholder="Inicio"></b-form-input>

                                    <b-form-select v-model="form.schedule_start_meridiem">
                                        <b-form-select-option value="am"  >am</b-form-select-option>
                                        <b-form-select-option value="pm">pm</b-form-select-option>
                                    </b-form-select>

                                    <b-input-group-prepend>
                                        <b-input-group-text style="background-color: #e9ecef">a</b-input-group-text>
                                    </b-input-group-prepend>
                                    
                                    <b-form-input v-model="form.schedule_end" :state="schedule_endState" type="number" min="1" max="12" placeholder="Fin" class="pl-3"></b-form-input>

                                    <b-form-select v-model="form.schedule_end_meridiem">
                                        <b-form-select-option value="am">am</b-form-select-option>
                                        <b-form-select-option value="pm">pm</b-form-select-option>
                                    </b-form-select>
                                </b-input-group>

                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('schedule_start')"
                                    :key="`schedule_start-create-${index}`">{{ error }}
                                </span>
                                <span 
                                    class="text-danger"
                                    v-for="(error, index) in mostrarErroresInput('schedule_end')"
                                    :key="`schedule_end-create-${index}`">{{ error }}
                                </span>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row class="text-center">
                        <b-col cols="12" >
                            <b-button variant="primary" size="lg" class="col-12 col-sm-6  col-md-12  col-lg-4" @click="enviar">
                                CREAR LEAD
                            </b-button>
                        </b-col>
                    </b-form-row>

                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { getAllActiveCareersWithoutAuth } from '@/api/career'
import { getAllActiveInstitutionsWithoutAuth } from '@/api/institution'
import { getAllActiveProgramsWithoutAuth } from '@/api/apkPrograms'
import { createLeadWithoutAuth } from '@/api/lead'


export default {
    name : 'CrearLead',
    data () {
        return {
            form : {
                dni : '',
                name : '',
                surnames : '',
                mobile : '',
                email : '',
                career_id : '',
                career_name : '',
                semester: '',
                institution_id : '',
                institution_name : '',
                english_level : '',
                program_id : '',
                program_name : '',
                communication_channel: '',
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
            ],
            //
            dniState : null,
            nameState : null,
            surnamesState : null,
            mobileState : null,
            emailState : null,
            career_idState : null,
            semesterState : null,
            institution_idState : null,
            english_levelState : null,
            program_idState : null,
            communication_channelState: null,
            schedule_startState : null,
            schedule_endState : null,
            //
            leadLoading : false,
            //
            erroresInputs: []
      }
    },

    beforeMount() {
        this.getCareerData()
        this.getInstitutionData()
        this.getProgramData()
    },
    methods: {
        setTrue() {
           this.clear()

            this.dniState = true
            this.nameState =  true
            this.surnamesState =  true
            this.mobileState =  true
            this.emailState =  true
            this.career_idState =  true
            this.semesterState =  true
            this.institution_idState =  true
            this.english_levelState =  true
            this.program_idState =  true
            this.communication_channelState = true
            this.schedule_startState =  true
            this.schedule_endState =  true
        },

        clear(){
            this.erroresInputs = []
            this.dniState = null
            this.nameState =  null
            this.surnamesState =  null
            this.mobileState =  null
            this.emailState =  null
            this.career_idState =  null
            this.semesterState =  null
            this.institution_idState =  null
            this.english_levelState =  null
            this.program_idState =  null
            this.communication_channelState = null
            this.schedule_startState =  null
            this.schedule_endState =  null
        },

        mostrarErroresInput(pCampo) { 
            let camposIncorrectos = Object.keys(this.erroresInputs);

            if (camposIncorrectos.includes(pCampo)) {
                switch (pCampo) {
                    case 'dni':
                        this.dniState = false
                        break;
                    case 'name':
                        this.nameState = false
                        break;
                    case 'surnames':
                        this.surnamesState = false
                        break;
                    case 'mobile':
                        this.mobileState = false
                        break;
                    case 'email':
                        this.emailState = false
                        break;
                    case 'career_id':
                        this.career_idState = false
                        break;
                    case 'semester':
                        this.semesterState = false
                        break;
                    case 'institution_id':
                        this.institution_idState = false
                        break;
                    case 'english_level':
                        this.english_levelState = false
                        break;
                    case 'program_id':
                        this.program_idState = false
                        break;
                    case 'communication_channel':
                        this.communication_channelState = false
                        break;
                    case 'schedule_start':
                        this.schedule_startState = false
                        break;
                    case 'schedule_end':
                        this.schedule_endState = false
                        break;
                    case 'profile':
                        break;
                    case 'commentary':
                        break;
                    default:
                        break;
                }
                return this.erroresInputs[pCampo]
            } else {
                return []
            }
        },

        enviar() {
            this.leadLoading = true

            this.setTrue()

            let leadForm = new FormData()
            leadForm.append('dni', this.form.dni)
            leadForm.append('name', this.form.name)
            leadForm.append('surnames', this.form.surnames)
            leadForm.append('mobile', this.form.mobile)
            leadForm.append('email',this.form.email)
            leadForm.append('career_id', this.form.career_id)
            leadForm.append('semester', this.form.semester)
            leadForm.append('institution_id', this.form.institution_id)
            leadForm.append('english_level', this.form.english_level)
            leadForm.append('program_id', this.form.program_id)
            leadForm.append('communication_channel', this.form.communication_channel)
            leadForm.append('schedule_start', this.form.schedule_start)
            leadForm.append('schedule_start_meridiem', this.form.schedule_start_meridiem)
            leadForm.append('schedule_end', this.form.schedule_end)
            leadForm.append('schedule_end_meridiem', this.form.schedule_end_meridiem)
            leadForm.append('profile', this.form.profile)
            leadForm.append('commentary', this.form.commentary)

            createLeadWithoutAuth (leadForm)
                .then( res => {
                    if(res.status == 201) {
                       this.$notify({
                            type: 'success',
                            title: 'Creación correcta!!'
                        })
                    }
                }).catch( err => {
                    if (err.response) {
                        this.erroresInputs = err.response.data.errors
                        this.$notify({
                            type: 'danger',
                            title:  'Existen campos inválidos'
                        })
                    } else {
                        this.notify({
                            type: 'danger',
                            title: err.message
                        })
                    }
                }).finally( () => {
                    this.leadLoading = false
                })
        },

        getCareerData(){
            getAllActiveCareersWithoutAuth()
                .then ( res => {
                    if (res.status == 200) {
                        this.careersData = res.data.data.map( m => ({ value : m.attributes.id, text : m.attributes.name }) )
                    }
                })
        },

        getInstitutionData(){
            getAllActiveInstitutionsWithoutAuth()
                .then ( res => {
                    if (res.status == 200) {
                        this.institutionData = res.data.data.map( m => ({ value : m.attributes.id, text : m.attributes.name }) )
                    }
                })
        },

        getProgramData(){
            getAllActiveProgramsWithoutAuth()
                .then ( res => {
                    if (res.status == 200) {
                        this.programsData = res.data.data.map( m => ({ value : m.attributes.id, text : m.attributes.name }) )
                    }
                })
        },

    }
}
</script>
