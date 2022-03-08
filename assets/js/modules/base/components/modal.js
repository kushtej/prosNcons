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
        this.$root.$on('base::display::modal', (modalDiscription)=> {
            this.title = modalDiscription.title
            this.size = modalDiscription.size

            // console.log(modalDiscription.data)
            this.component = modalDiscription.component;

            if(modalDiscription.onsubmit){
                this.onsubmit = modalDiscription.onsubmit;
            }


            this.$root.$emit('bv::show::modal','base::display::modal' );  
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
        <b-modal
            id="base::display::modal" 
            hide-backdrop content-class="shadow" 
            :size=size  
            :title=title 
            ok-title="Save" 
            @ok="handleOk" 
            scrollable
        >
            <component :is="component" :data=data ></component>
        </b-modal>
    </div>`
});
