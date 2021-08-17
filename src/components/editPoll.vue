<template>
  <div>
    <b-button  variant="outline-primary" class="mb-3" size="sm" id="show-btn" @click="showModal">Edit</b-button>

    <b-modal ref="my-modal" hide-footer title="Edit Poll">
      <div class="d-block">
        
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title-input"
            v-model="pollDetails.title"
            required
          ></b-form-input>
        </b-form-group>

        <div class="mt-3">
        <b-tr v-for="(opt,index) in pollDetails.options" v-bind:key="index" style="margin-bottom:20px">
            <b-td style="width:90%; margin-bottom:20px">{{opt.option}}</b-td>
            <b-td><b-button variant="outline-danger" size="sm" class="ml-auto" @click="remove(opt.option)">Remove</b-button></b-td>
        </b-tr>
        </div>
      </div>
        <hr>
        <div v-for="(opt,index) in newOptions" v-bind:key="index">
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

      <b-button class="mt-3" style="margin-right:40px;" variant="outline-success" @click="addOption">Add New Option</b-button>
      <b-button class="mt-3" variant="outline-primary" block @click="hideModal">Save</b-button>
    </b-modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
  export default {
      name:'editPoll',
      data(){
          return{
              name:'',
              newOptions:[]
          }
      },
      props:{
          editId:String
      },
      computed:{
          ...mapGetters('poll',['getSelectedPoll']),
          pollDetails(){
              return this.getSelectedPoll;
          }
      },
    methods:{
        ...mapActions('poll',['fetchPollWithId', 'removeOption','updatePollTitle','addNewOptionAction']),
        
        showModal() {
            this.fetchPollWithId(this.editId);
            this.$refs['my-modal'].show();
      },
      hideModal() {
        this.$refs['my-modal'].hide()
        this.updateTitle();
        this.addNewOptionToDb();
        console.log(this.newOptions[0].value);
        this.newOptions =[]
      },
      addOption(){
          this.newOptions.push({value:''})
      },
      remove(option_text){
          this.removeOption({id:this.editId, optionText:option_text})
      },
      updateTitle(){
          this.updatePollTitle({id:this.editId,title:this.pollDetails.title});
      },
      addNewOptionToDb(){
          console.log({id:this.editId, data:this.newOptions})
          this.addNewOptionAction({id:this.editId, data:this.newOptions})
      }
    }
  }
</script>