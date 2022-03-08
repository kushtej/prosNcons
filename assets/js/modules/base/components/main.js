var mainComponent = Vue.component("main-component", {

	created: function () {
		if(this.$store.state.prosNcons.lastSelectedGroup){
			this.$store.commit('updateGroupName',this.$store.state.prosNcons.lastSelectedGroup);
		}
	},

	template:
	`
	<div class="main-component">

		<deleteConfirmation></deleteConfirmation>
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