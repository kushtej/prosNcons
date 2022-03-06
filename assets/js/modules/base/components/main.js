var mainComponent = Vue.component("main-component", {
	// mixins: [utils],
	data() {
		return {
			// prosNcons: {},
			// pro : "",
			// con : "",
		};
	},

	created: function () {
		if(this.$store.state.prosNcons.lastSelectedGroup){
			this.$store.commit('updateGroupName',this.$store.state.prosNcons.lastSelectedGroup);
		}
		// this.prosNcons = (!localStorage.getItem("prosNcons")) ? {} : JSON.parse(localStorage.getItem("prosNcons"));
	},

	methods: {
		// addData(type){
		// 	let text = (type == "pros") ? this.pro : this.con;
		// 	if(text != ""){
		// 		let data = {
		// 			id : this.uniqueId(),
		// 			text : text,
		// 		};
		// 		(this.prosNcons[type]) ? this.prosNcons[type].push(data) : this.prosNcons[type] = [data];

		// 		this.updateData();
		// 		this.clearInput(type);
		// 	}
		// },
		// deleteData(type,index){
		// 	this.prosNcons[type].splice(index, 1);
		// 	this.updateData();
		// },
		// updateData(){
		// 	localStorage.setItem("prosNcons", JSON.stringify(this.prosNcons));
		// },
		// clearInput(type){
		// 	(type == "pros") ? this.pro = "" : this.con = "";
		// },

	},
	template:
	`
	<div class="main-component">

		<deleteConformation></deleteConformation>
		<modal></modal>
		<notification></notification>

		<div class="container-fluid p-5 bg-primary text-white text-center">
			<h1>My Pros and Cons Page</h1>
		</div>

		<div class="container mt-5">
			<groups></groups>
		</div>	

		<div class="container mt-5">
			<prosNcons ></prosNcons>
		</div>
	</div >
   	`,
});

//:prosNcons="prosNcons"