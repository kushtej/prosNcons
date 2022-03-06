Vue.component("groups", {
	data() {
		return {
			groupName : (this.$store.state.prosNcons.lastSelectedGroup) ? this.$store.state.prosNcons.lastSelectedGroup : null,
            options: [
                { value: null, text: 'Select a group!',disabled:true },
            ]
		};
	},
    watch: {
		groupName: function (val) {
            this.$store.commit('updateGroupName',val);
		},
        
        '$store.state.groupName': function() {
            this.groupName = this.$store.getters.prosNcons.lastSelectedGroup;
            let optionValues = this.options.map(option => {
                return option.value;
            })
            if(!optionValues.includes(this.groupName)){
                this.options.push({ value: this.groupName, text: this.groupName });
            }
        }
    },

	created: function () {
        if(this.$store.getters.prosNcons.groups){
            this.initialzeOptions();
        }
	},
    methods: {
        initialzeOptions(){
            this.options.splice(1);
            let groups = Object.keys(this.$store.state.prosNcons.groups);
            groups.forEach(group => {
                this.options.push({ value: group, text: group });
            });
        },
        addGroup() {
            let modalDiscription = {
                title : "Add New Group",
                size : "sm",
                component : "groupForm",
                onsubmit  : "saveList"
            }
            this.$root.$emit('base::show::model',modalDiscription);   
        },
        removeGroup(){
            let prosNcons = this.$store.getters.prosNcons;
            delete prosNcons.groups[this.groupName];
            prosNcons.lastSelectedGroup = null;
            this.$store.commit('updateprosNcons',prosNcons);
            this.$store.commit('updateGroupName',null);
            
            this.groupName = null;

            this.initialzeOptions();
        }
    },
	template:
	`
    <div>
        <div class="row">
            <div class="col-sm-4">
                <b-form-select class="form-select" v-model="groupName" :options="options"></b-form-select>
            </div>
            <div class="col-sm-4">
                <button v-if="groupName" type="button" @click="removeGroup()" class="btn btn-outline-primary">-</button>
            </div>
            <div class="col-sm-4">
                <button style="float:right" type="button" @click="addGroup()" class="btn btn-outline-primary">+ Add Groups</button>
            </div>
        </div >
    </div >
   	`,
});


Vue.component("groupForm", {

    data: function () {
        return {
            groupForm : { 
                nameState : null,
                name : "",
                onsubmit : "saveList"
            }
        }
    },
    created() {
        this.$root.$on(this.groupForm.onsubmit, this.saveList);
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.groupForm.checkValidity()
            this.groupForm.nameState = valid
            return valid
        },
        
        saveList(){
            if (!this.checkFormValidity()) {
                return
            }

            let prosNcons = (this.$store.getters.prosNcons.groups) ? this.$store.getters.prosNcons : {groups:{}};

            prosNcons["groups"][this.groupForm.name] = {
                pros : [],
                cons : []
            };
            prosNcons.lastSelectedGroup = this.groupForm.name;

            this.$store.commit('updateprosNcons',prosNcons);
            this.$store.commit('updateGroupName',this.groupForm.name);

            this.$root.$emit('trigger::notification', {
                type : "success",
                delay: 2000,
                message : "List successfully created!"
            });


        },

    },
	template:
	`
    <div>
        <div class="row g-3 align-items-center">
            <form id="myForm" ref="groupForm">
                <b-form-group 
                    label="Group Name :" 
                    label-for="groupForm.name" 
                    invalid-feedback="Group name is required"
                    :state="groupForm.nameState"
                >    
                    <b-form-input class="mt-1" id="listname" v-model="groupForm.name" :state="groupForm.nameState" required></b-form-input>
                </b-form-group>
            </form>
        </div>
    </div>
   	`,
});