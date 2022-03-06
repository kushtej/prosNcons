let prosNcons = {
    groups:{
        home : {
            pros: [
                {"id": 1234, text : "Buy a new car"},
                {"id": 1235, text : "Buy a new house"}, 
            ],
            cons: [
                {"id": 1236, text : "Buy a new car"},
                {"id": 1237, text : "Buy a new house"},
            ]
        }
    },
    lastSelectedGroup: "home",
    lastUpdatedTime : Date.now(),

}

localStorage.setItem("prosNcons", JSON.stringify(prosNcons));