Vue.component("prosNcons", {
	mixins: [utils],
	data() {
		return {
			prosNcons: this.$store.getters.prosNcons,
			pro : "",
			con : "",
		};
	},

	created: function () {
		console.log(this.prosNcons)
	},
    watch: {
        '$store.state.prosNcons': function() {
			this.prosNcons = this.$store.getters.prosNcons;
        }

    },
	computed: {
		groupName: function () {
			return this.$store.getters.groupName;
		},
	},

	methods: {
		addData(type){
			let text = (type == "pros") ? this.pro : this.con;
			if(text != ""){
				let data = {
					id : this.uniqueId(),
					text : text,
				};
				(this.prosNcons["groups"][this.groupName][type]) ? this.prosNcons["groups"][this.groupName][type].push(data) : this.prosNcons["groups"][this.groupName][type] = [data];
				this.$store.commit('updateprosNcons',this.prosNcons);
				this.clearInput(type);
			}
		},
		deleteData(type,index){
			this.prosNcons["groups"][this.groupName][type].splice(index, 1);
			this.$store.commit('updateprosNcons',data);
		},
		
		clearInput(type){
			(type == "pros") ? this.pro = "" : this.con = "";
		},

	},

	template:
	`
    <div>
        <div class="row">
            <div class="col-sm-5">
				<div v-if="groupName">
					<div class="p-2 border border-3">
						<h3 class="text-center">Pros</h3>
						<draggable v-model="prosNcons['groups'][groupName]['pros']" group="prosNcons['groups'][groupName]['pros']" @start="drag=true" @end="drag=false;updateData()">
							<div v-for="(pro, index) in prosNcons['groups'][groupName]['pros']">
								<p class="text-left border border-3 bg-success p-1 text-white border-success">
									{{pro.text}}
									<button class="btn" style="float:right;margin-top:-6px;" type="button" @click="deleteData('pros',index)" id="button-addon2"><i class="text-white fas fa-times"></i></button>
								</p>
							</div>
						</draggable>
						<div v-if="!prosNcons['groups'][groupName]['pros'] || prosNcons['groups'][groupName]['pros'].length === 0" class="text-center mt-3">No Pros!🙄</div>
					</div>
					<div class="input-group mt-2 mb-3">
						<input type="text" v-model="pro" class="form-control" v-on:keyup.enter="addData('pros')" placeholder="Enter Pros here"
							aria-label="Enter Pros here" aria-describedby="button-addon2">
						<button class="btn btn-outline-secondary" type="button" @click="addData('pros')" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
					</div>
				</div>
			</div>

            <div class="col-sm-2">
				<h3 v-if="!groupName" class="text-center mt-5">Select a group</h3>
			</div>

            <div class="col-sm-5">
				<div v-if="groupName">
                	<div class="p-2 border border-3">
                    	<h3 class="text-center">Cons</h3>
						<draggable v-model="prosNcons['groups'][groupName]['cons']" group="prosNcons['groups'][groupName]['cons']" @start="drag=true" @end="drag=false;updateData()">
							<div v-for="(con, index) in prosNcons['groups'][groupName]['cons']">
								<p class="border border-3 bg-danger p-1 text-white border-danger">
									{{con.text}}
									<button class="btn" style="float:right;margin-top:-6px;" type="button" @click="deleteData('cons',index)" id="button-addon2"><i class="text-white fas fa-times"></i></button>
								</p>
							</div>
						</draggable>
						<div v-if="!prosNcons['groups'][groupName]['cons'] || prosNcons['groups'][groupName]['cons'].length === 0" class="text-center mt-3">No Cons!🥳</div>
                	</div>
					<div class="input-group mt-2 mb-3">
						<input type="text" v-model="con" class="form-control" v-on:keyup.enter="addData('cons')" placeholder="Enter Cons here"
							aria-label="Enter Cons here" aria-describedby="button-addon2">
						<button class="btn btn-outline-secondary" type="button" @click="addData('cons')" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
					</div>
				</div>
            </div >
        </div >
    </div >
   	`,
});