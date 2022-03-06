Vue.component('notification', {
    data() {
        return {
            notificationTemplate : [],
            notificationCount : 0,
        }
    },
    created() {
        this.$root.$on('trigger::notification', this.getNotifcationTemplate);
    },
    methods: {
        getNotifcationTemplate : function(notificationData) {
            let notificationClass = "";

            if(notificationData.type === 'success') {
                notificationClass = ("bg-success text-white");

            } else if(notificationData.type === 'error') {
                notificationClass = ("bg-danger text-white");
            }

            let currentCount = this.notificationCount;
            this.notificationCount +=1;

            this.notificationTemplate.push( 
            `
            <div aria-toast-no="${currentCount}" class="toast align-items-center ${notificationClass}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="${notificationData.delay}">
                <div class="d-flex">
                    <div class="toast-body">
                        ${notificationData.message}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
            `);
            this.showNotification(currentCount);
        },

        showNotification : function(count) {
            $(document).ready(function(){
                let toastDiv = $('[aria-toast-no="'+count+'"]');
                $(toastDiv).toast('show');
            });
        }
    },
    template : 
    `
    <div class="toast-container position-absolute top-0 end-0 p-3">
        <div v-for="item in notificationTemplate" :key="item">
            <div v-html="item"></div>
        </div>
    </div>
    `
});
