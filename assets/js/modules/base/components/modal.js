Vue.component('modal', {
    data() {
        return {
            title : String,
            size : String,
            data : Object,
            component : String,
            class : "modal-fullscreen",
            onsubmit : null,
        }
    },
    created() {
        this.$root.$on('base::show::model', (modalDiscription)=> {
            this.title = modalDiscription.title
            this.size = modalDiscription.size
            this.data = modalDiscription.data
            this.component = modalDiscription.component;

            if(modalDiscription.onsubmit){
                this.onsubmit = modalDiscription.onsubmit;
            }


            this.$root.$emit('bv::show::modal','base::show::model' );  
        });        
    },
    methods: {

        handleOk() {
            if(this.onsubmit){
                this.$root.$emit(this.onsubmit);  
            }            
        },
    },

    template : `
    <div class="modalContainer">
        <b-modal id="base::show::model" hide-backdrop content-class="shadow" :size=size  :title=title ok-title="Save" @ok.prevent="handleOk" scrollable>
            <component :is="component" ref="a" :data=data ></component>
        </b-modal>
    </div>`
});
// @ok.prevent="handleOk"