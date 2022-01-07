import Model, { belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';
export default class GameModel extends Model {
    @belongsTo('team', { inverse: 'homeGames' }) homeTeam;
    @belongsTo('team', { inverse: 'awayGames' }) awayTeam;
    @attr('number') homeGoals;
    @attr('number') awayGoals;
    @attr('date') playedOn;


    @computed
    get isDraw() {
        return this.homeGoals === this.awayGoals;
    }

    @computed
    get isHomeWin() {
        return this.homeGoals > this.awayGoals;
    }

    @computed
    get isAwayWin() {
        return this.homeGoals < this.awayGoals;
    }

    @computed('isHomeWin', 'isAwayWin', 'homeTeam', 'awayTeam')
    get winningTeam() {
        if (this.isHomeWin) {
            return this.homeTeam
        } else if (this.isAwayWin) {
            return this.awayTeam;
        }
    }


}