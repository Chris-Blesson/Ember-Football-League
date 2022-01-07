import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import { shuffle } from 'ember-composable-helpers/helpers/shuffle';

let DELAY_BETWEEN_GAMES = 1000;

export default class GameSimulatorService extends Service {
    @service store;
    init() {
        super.init(...arguments);
        this.seedTeams();
        later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
    }
    @computed
    get games() {
        return this.store.peekAll('game');
    }

    @computed
    get teams() {
        return this.store.peekAll('team');
    }
    seedTeams() {
        let teams = ['Liverpool',
            'Chelsea',
            'Manchester City',
            'Arsenal',
            'Tottenham',
            'Bournmouth',
            'Watford',
            'Manchester United',
            'Everton',
            'Wolves',
            'Brighton',
            'Leicester City',
            'West Ham',
            'Crystal Palace',
            'Burnley',
            'Southamptom',
            'Cardiff City',
            'Fulham',
            'Newcastle United',
            'Huddersfield Town'
        ];
        for (let i = 0; i < teams.length; i++) {
            this.store.createRecord('team', {
                id: i,
                name: teams[i]
            });
        }
    }

    simulateGame() {
        let teams = this.store.peekAll('team');
        let shuffledTeams = shuffle(teams);
        let homeTeam = shuffledTeams[0];
        let awayTeam = shuffledTeams[1];

        let homeGoals = this.randomScore(4);
        let awayGoals = this.randomScore(3);
        console.info({ homeGoals, awayGoals });
        this.store.createRecord('game', {
            homeTeam,
            awayTeam,
            homeGoals,
            awayGoals,
            playedOn: new Date()
        })

        // later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
    }

    randomScore(maximumGoals) {
        return Math.round((Math.random() * maximumGoals));
    }
}