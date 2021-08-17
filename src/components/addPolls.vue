<template>
  <div>
    <b-button variant="outline-primary" class="mt-1 mb-3" v-b-modal.modal-prevent-closing>Add New Poll</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add New Poll"
      @show="resetModal"
      @hidden="resetModal"
      @ok="AddPollToDb"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title-input"
            v-model="name"
            required
          ></b-form-input>
        </b-form-group>
        <div v-for="(opt,index) in noOfOptions" v-bind:key="index">
        <b-form-group
          label="Option"
          label-for="option-input"
          invalid-feedback="Field is required"
        >
          <b-form-input
            id="option-input"
            v-model="opt.value"
            required
          ></b-form-input>
        </b-form-group>
        </div>
        <b-form-group>
            <b-button @click="addOptions()" variant="outline-primary" class="mt-3">Add Option</b-button>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
  export default {
      name:'addPolls',
    data() {
      return {
        name: '',
        noOfOptions:[{value:''}],
        options:''
      }
    },
    methods:{
        ...mapActions('poll',['addPoll']),
        addOptions(){
            this.noOfOptions.push({value:''})
        },
        resetModal(){
            this.name = ''
            this.noOfOptions=[{value:''}]
        },
        AddPollToDb(){
            for(let i=0; i<this.noOfOptions.length; i++){
                if(i==0){
                    this.options = this.noOfOptions[i].value;
                }
                else{
                    this.options = this.options + '____'+this.noOfOptions[i].value;
                }
                
            }
            console.log("In the add pOLL PAGE :"+this.name + ' '+ this.options)
            this.addPoll({title:this.name,allOptions:this.options})
            
        }
    }
  }
</script>