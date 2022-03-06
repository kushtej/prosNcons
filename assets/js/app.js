var store = new Vuex.Store({
	state: {
        prosNcons : (!localStorage.getItem("prosNcons")) ? {} : JSON.parse(localStorage.getItem("prosNcons")),
        groupName : null
    },
	mutations: {
        updateprosNcons (state,data) {
            state.prosNcons = data;
            localStorage.setItem("prosNcons", JSON.stringify(data));
        },
        updateGroupName (state,data) {
            state.groupName = data;
            state.prosNcons.lastSelectedGroup = data;
        }
    },
	getters: {
        groupName(state){
            return state.groupName;
        },
        prosNcons(state){
            return state.prosNcons;
        }
    }
});

new Vue({
    el: '#app',
    store,
    template: `<main-component></main-component>`,
});