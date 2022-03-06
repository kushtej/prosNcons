Vue.component('deleteConformation', {
    data() {
        return {
            title : String,
            size : String,
            onConform:{
                type:[Function],
                default:{},
            },
        }
    },
    created() {
        this.$root.$on('modal-multi-3', (modalDiscription)=> {
            this.title = modalDiscription.title
            this.size = modalDiscription.size
            this.onConform = modalDiscription.onConform
            this.$root.$emit('bv::show::modal','modal-multi-3' );  
        });
    },

  template: `
    <div>
        <b-modal id="modal-multi-3" 
            hide-backdrop content-class="shadow"  
            :size=size  
            :title=title
            ok-title="Delete"
            ok-variant="danger"
            @ok="onConform"
        >
            <p class="my-1">
                All the List contents will be lost!
                Are you Sure want to delete the List?
            </p>

            <!--<div class="mt-5">
                <hr/>
                <b-button class="mr-2" v-b-modal.modal-prevent-closing variant="secondary" @click="exit()">Cancel</b-button>
                <b-button class="mr-2" v-b-modal.modal-prevent-closing variant="danger" @click="onConform" >Delete</b-button>      
            </div>-->


            <!--<template #modal-footer="{ ok, cancel }">
                <b-button size="sm" variant="secondary" @click="cancel()">
                    Cancel
                </b-button>
                <b-button size="sm" variant="danger" @click="onConform">
                    Delete
                </b-button>
            </template> -->
        </b-modal>
    </div>`,
})
