import Model, { hasMany, attr } from '@ember-data/model';
import { union, filterBy, sum, mapBy } from '@ember/object/computed';
import { computed } from '@ember/object';
export default class TeamModel extends Model {
    @attr('string') name;
    @hasMany('game', { inverse: 'homeTeam' }) homeGames;
    @hasMany('game', { inverse: 'homeTeam' }) awayGames;
    @union('homeGames', 'awayGames') games;

    @filterBy('homeGames', 'isHomeWin') homeGamesWon;
    @filterBy('awayGames', 'isAwayWin') awayGamesWon;
    @union('homeGamesWon', 'awayGamesWon') gamesWon;

    @filterBy('homeGames', 'isAwayWin') homeGamesLost;
    @filterBy('awayGames', 'isHomeWin') awayGamesLost;
    @union('homeGamesLost', 'awayGamesLost') gamesLost;

    @filterBy('games', 'isDraw') gamesDrawn;

    @mapBy('homeGames', 'homeGoals') homeGoalsScoredArray;
    @sum('homeGoalsScoredArray') homeGoalsScored;

    @mapBy('awayGames', 'awayGoals') awayGoalsScoredArray;
    @sum('awayGoalsScoredArray') awayGoalsScored;

    @computed('homeGoalsScored', 'awayGoalsScored')
    get goalsScored() {
        return this.homeGoalsScored + this.awayGoalsScored
    }


    @mapBy('homeGames', 'awayGoals') homeGoalsConcededArray;
    @sum('homeGoalsScoredArray') homeGoalsConceded;

    @mapBy('awayGames', 'homeGoals') awayGoalsConcededArray;
    @sum('awayGoalsScoredArray') awayGoalsConceded;

    @computed('homeGoalsConceded', 'awayGoalsConceded')
    get goalsConceded() {
        return this.homeGoalsConceded + this.awayGoalsConceded
    }

    @computed('goalsScored', 'goalsConceded')
    get goalDifference() {
        return Math.abs(this.goalsScored - this.goalsConceded)
    }


    @computed('gamesWon.length', 'gamesDrawn.length')
    get points() {
        return (this.gamesWon.length * 3) + this.gamesDrawn.length;
    }



}