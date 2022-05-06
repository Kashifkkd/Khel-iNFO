const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('', (req,res) => {
    res.render('categories', { title: 'Categories'});
});

router.get('/cricket', (req,res) => {
    res.render('sports/cricket', {title: 'Cricket'});
});

router.get('/football', (req,res) => {
    res.render('sports/football', {title: 'Football'});
});

router.get('/hockey', (req,res) => {
    res.render('sports/hockey', {title: 'Hockey'});
});

router.get('/kabaddi', (req,res) => {
    res.render('sports/kabaddi', {title: 'Kabaddi'});
});

router.get('/badminton', (req,res) => {
    res.render('sports/badminton', {title: 'Badminton'});
});

router.get('/boxing', (req,res) => {
    res.render('sports/boxing', {title: 'Boxing'});
});

router.get('/javelin', (req,res) => {
    res.render('sports/javelin', {title: 'Javelin'});
});

router.get('/table-tennis', (req,res) => {
    res.render('sports/table-tennis', {title: 'TABLE-TENNIS'});
});

// get ranking from unofficial-cricbuzz api

router.get('/cricket/rank-odi', (req,res) => {

    // get odi rankings from unoffical cricbuzz api

    const CricPlayerRankingODI = {
        method: 'GET',
        url: 'https://unofficial-cricbuzz.p.rapidapi.com/stats/get-icc-rankings',
        params: {category: 'batsmen', formatType: 'odi', isWomen: '0'},
        headers: {
          'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com',
          'X-RapidAPI-Key': '20ebff02f2msh9b2efae4d5290fbp1b1042jsnaeddadaabacc'
        }
    };

    let odi = [];

axios.request(CricPlayerRankingODI)
    .then(playerRanking => {
        console.log("ODDI'S RANKING -");


        for(i in playerRanking){
            let temp = []
            for(j in playerRanking[i].rank){

                temp.push(playerRanking[i].rank[j].name)
                temp.push(playerRanking[i].rank[j].rank);
                temp.push(playerRanking[i].rank[j].country);
                temp.push(playerRanking[i].rank[j].rating);

                odi.push(temp);
                temp = []
            }
        }
        res.render('stats/rank-odi', {title: 'CRICKET', format: 'ODDI', OdiRankings: odi});

    }).catch(function (error) {
        console.error(error);
    });

})

router.get('/cricket/rank-test', (req,res) => {

    // get test rankings from unoffical cricbuzz api

    const CricPlayerRankingTEST = {
        method: 'GET',
        url: 'https://unofficial-cricbuzz.p.rapidapi.com/stats/get-icc-rankings',
        params: {category: 'batsmen', formatType: 'test', isWomen: '0'},
        headers: {
          'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com',
          'X-RapidAPI-Key': '20ebff02f2msh9b2efae4d5290fbp1b1042jsnaeddadaabacc'
        }
    };

    let test = [];

    axios.request(CricPlayerRankingTEST)
    .then(playerRanking => {
        console.log("ODDI'S RANKING -");


        for(i in playerRanking){
            let temp = []
            for(j in playerRanking[i].rank){

                temp.push(playerRanking[i].rank[j].name)
                temp.push(playerRanking[i].rank[j].rank);
                temp.push(playerRanking[i].rank[j].country);
                temp.push(playerRanking[i].rank[j].rating);

                test.push(temp);
                temp = []

            }
        }
        res.render('stats/rank-test', {title: 'CRICKET', format: 'ODDI', TestRankings: test});

    }).catch(function (error) {
        console.error(error);
    });

})

router.get('/cricket/rank-t20', (req,res) => {

    // get t20 rankings from unoffical cricbuzz api

    const CricPlayerRankingT20 = {
        method: 'GET',
        url: 'https://unofficial-cricbuzz.p.rapidapi.com/stats/get-icc-rankings',
        params: {category: 'batsmen', formatType: 't20', isWomen: '0'},
        headers: {
          'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com',
          'X-RapidAPI-Key': '20ebff02f2msh9b2efae4d5290fbp1b1042jsnaeddadaabacc'
        }
    };

    let t20 = [];

    axios.request(CricPlayerRankingT20)
    .then(playerRanking => {
        console.log("ODDI'S RANKING -");


        for(i in playerRanking){
            let temp = []
            for(j in playerRanking[i].rank){

                temp.push(playerRanking[i].rank[j].name)
                temp.push(playerRanking[i].rank[j].rank);
                temp.push(playerRanking[i].rank[j].country);
                temp.push(playerRanking[i].rank[j].rating);

                t20.push(temp);
                temp = []

            }
        }
        res.render('stats/rank-t20', {title: 'CRICKET', format: 'ODDI', T20Rankings: t20});

    }).catch(function (error) {
        console.error(error);
    });

})

router.get('/cricket/live-matches', (req,res) => {
    
    const options = {
        method: 'GET',
        url: 'https://cricket-live-data.p.rapidapi.com/match/2432999',
        headers: {
          'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com',
          'X-RapidAPI-Key': '20ebff02f2msh9b2efae4d5290fbp1b1042jsnaeddadaabacc'
        }
    };
    
      let liveMatches = []
      
    axios.request(options).then(function (response) {
        console.log(response.data);
        console.log("API working..");
    
        for(i in response){
            liveMatches.push(response[i].live_details)
        }
    
        res.render('stats/live-match', {title: 'CRICKET', data: liveMatches});
    })
    .catch(function (error) {
        console.error(error);
    });

});

module.exports = router;