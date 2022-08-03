Vue.component('deleteConfirmation', {
    data() {
        return {
            title : String,
            size : String,
            onConfirm:{
                type:[Function],
                default:{},
            },
        }
    },
    created() {
        this.$root.$on('base::deleteConfirmation::modal', (modalDiscription)=> {
            this.title = modalDiscription.title
            this.size = modalDiscription.size
            this.onConfirm = modalDiscription.onConfirm
            this.$root.$emit('bv::show::modal','base::deleteConfirmation::modal' );  
        });
    },

  template: `
    <div>
        <b-modal id="base::deleteConfirmation::modal" 
            hide-backdrop content-class="shadow"  
            :size=size  
            :title=title
            ok-title="Delete"
            ok-variant="danger"
            @ok="onConfirm"
        >
            <p class="my-1">
                All the List contents will be lost!
                Are you Sure want to delete the List?
            </p>

        </b-modal>
    </div>`,
})
