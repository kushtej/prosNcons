Vue.component("main-component", {
	mixins: [utils],
	data() {
		return {
			prosNcons: {},
			pro : "",
			con : "",
		};
	},

	created: function () {
		this.prosNcons = (!localStorage.getItem("prosNcons")) ? {} : JSON.parse(localStorage.getItem("prosNcons"));
	},

	methods: {
		addData(type){
			let text = (type == "pros") ? this.pro : this.con;
			if(text != ""){
				let data = {
					id : this.uniqueId(),
					text : text,
				};
				(this.prosNcons[type]) ? this.prosNcons[type].push(data) : this.prosNcons[type] = [data];

				this.updateData();
				this.clearInput(type);
			}
		},
		deleteData(type,index){
			this.prosNcons[type].splice(index, 1);
			this.updateData();
		},
		updateData(){
			localStorage.setItem("prosNcons", JSON.stringify(this.prosNcons));
		},
		clearInput(type){
			(type == "pros") ? this.pro = "" : this.con = "";
		},

	},

	template:
	`
<div class="main-component">
    
	<div class="container-fluid p-5 bg-primary text-white text-center">
        <h1>My Pros and Cons Page</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-5">
                <div class="p-2 border border-3">
                    <h3 class="text-center">Pros</h3>

					<draggable v-model="prosNcons.pros" group="prosNcons.pros" @start="drag=true" @end="drag=false;updateData()">
						<div v-for="(pro, index) in prosNcons.pros">
							<p class="text-left border border-3 bg-success p-1 text-white border-success">
								{{pro.text}}
								<button class="btn" style="float:right;margin-top:-6px;" type="button" @click="deleteData('pros',index)" id="button-addon2"><i class="text-white fas fa-times"></i></button>
							</p>
						</div>
					</draggable>

                    <div v-if="!prosNcons.pros || prosNcons.pros.length === 0" class="text-center mt-3">No Pros!🙄</div>
                </div>
                <div class="input-group mt-2 mb-3">
                    <input type="text" v-model="pro" class="form-control" placeholder="Enter Pros here"
                        aria-label="Enter Pros here" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" @click="addData('pros')" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>

            <div class="col-sm-2"></div>

            <div class="col-sm-5">
                <div class="p-2 border border-3">
                    <h3 class="text-center">Cons</h3>
					<draggable v-model="prosNcons.cons" group="prosNcons.cons" @start="drag=true" @end="drag=false;updateData()">
						<div v-for="(con, index) in prosNcons.cons">
							<p class="border border-3 bg-danger p-1 text-white border-danger">
								{{con.text}}
								<button class="btn" style="float:right;margin-top:-6px;" type="button" @click="deleteData('cons',index)" id="button-addon2"><i class="text-white fas fa-times"></i></button>
							</p>
						</div>
					</draggable>
                    <div v-if="!prosNcons.cons || prosNcons.cons.length === 0" class="text-center mt-3">No Cons!🥳</div>

                </div>
                <div class="input-group mt-2 mb-3">
                    <input type="text" v-model="con" class="form-control" placeholder="Enter Cons here"
                        aria-label="Enter Cons here" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" @click="addData('cons')" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div >
        </div >
    </div >
</div >
   	`,
});