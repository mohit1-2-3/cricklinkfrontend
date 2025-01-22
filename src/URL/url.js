let url = {
    // admin: {
    //     signup: 'http://localhost:3000/admin/signUp'
    //     , signin: 'http://localhost:3000/admin/signIn'
    // },
    organizer: {
    //     signin: 'http://localhost:3000/organizer/signIn'
    //     , signup: 'http://localhost:3000/organizer/signUp'
    //     , all: 'http://localhost:3000/organizer/viewAll'
        Organizer_profile: 'http://localhost:3000/user/detail'
    },
     player: {
        all: 'http://localhost:3000/user/playerList'
        , viewcard: 'http://localhost:3000/user/profile/:id'
        , signin: 'http://localhost:3001/user/signin'
        , sendRequest: 'http://localhost:3000/player/sendRequest'
        , search: 'http://localhost:3000/player/search'
        , searchByCategory: 'http://localhost:3000/player/searchByCategory'
    },
     
        player: {

            all: 'http://localhost:3000/user/playerList',
            viewcard: 'http://localhost:3000/user/profile/:id',
        //  signup: 'http://localhost:3000/user/sigup',
            signup: 'http://localhost:3000/user/signup',
            signin: 'http://localhost:3000/user/signin', 
            sendOTP: "http://localhost:5000/api/user/sendOTP"

            // signup: 'http://localhost:3001/user/signUp',
            // signin: 'http://localhost:3001/user/signIn', 
            // sendOTP: "http://localhost:3001/user/sendOTP"

            signup: 'http://localhost:3001/user/signup',
            signin: 'http://localhost:3001/user/signIn', 
            sendOTP: "http://localhost:3001/user/sendOTP"

        },
   
    
    tournament: {
        TOURNAMENT_LIST : "http://localhost:3000/Tournament/tournamentList",
        TOURNAMENT_BY_ID : "http://localhost:3000/Tournament",
        ADD_MATCH : "http://localhost:3000/match",
        CREATE_TOURNAMENT: 'http://localhost:3000/Tournament/createTournamentReq'
    },
    match : {
        MATCH_LIST : "http://localhost:3000/match/matches",

    }
    // team: {
    //     all: 'http://localhost:3000/team/viewAll'
    //     , byTournament: 'http://localhost:3000/team/byTournament'
    //     , register: 'http://localhost:3000/team/register'
    //     , particular: 'http://localhost:3000/team/particular'
    // },
    // category: {
    //     all: 'http://localhost:3000/category/viewAll'
    //     , update: 'http://localhost:3000/category/update'
    //     , remove: 'http://localhost:3000/category/remove'
    //     , add: 'http://localhost:3000/category/add'
    // },
    // subCategory: {
    //     all: 'http://localhost:3000/subCategory/all'
    //     , byCategory: 'http://localhost:3000/subCategory/byCategory'
    // }
}

export default url;