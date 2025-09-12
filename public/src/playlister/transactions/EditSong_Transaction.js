import { jsTPS_Transaction } from '../../jstps/index.js'
import PlaylistSongPrototype from '../PlaylistSongPrototype.js';

/**
 * EditSong_Transaction
 *
 * 
 * @author McKilla Gorilla
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    /**
     * Initializes this object such that it can both do and undo the transaction
     * 
     * @param {PlaylisterModel} initModel The M in MVC for this app
     * @param {number} initIndex The index of the song to edit in the playlist
     * @param {string} initTitle The new title for the song
     * @param {string} initArtist The new artist for the song
     * @param {number} initYear The new year for the song
     * @param {string} initYouTubeId The new YouTubeID for the song
     */
    constructor(initModel, initIndex, initTitle, initArtist, initYear, initYouTubeId) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.newTitle = initTitle;
        this.newArtist = initArtist;
        this.newYear = initYear;
        this.newYouTubeId = initYouTubeId;
        
        // Store the original values for undo
        let originalSong = this.model.getSong(initIndex);
        this.oldTitle = originalSong.title;
        this.oldArtist = originalSong.artist;
        this.oldYear = originalSong.year;
        this.oldYouTubeId = originalSong.youTubeId;
    }

    /**
     * Executed when this transaction is first done or redone.
     */
    doTransaction() {
        let song = this.model.getSong(this.index);
        song.title = this.newTitle;
        song.artist = this.newArtist;
        song.year = this.newYear;
        song.youTubeId = this.newYouTubeId;
        
        // REFRESH THE VIEW AND SAVE
        this.model.view.refreshSongCards(this.model.currentList);
        this.model.saveLists();
    }

    /**
     * Executed when this transaction is undone.
     */
    undoTransaction() {
        let song = this.model.getSong(this.index);
        song.title = this.oldTitle;
        song.artist = this.oldArtist;
        song.year = this.oldYear;
        song.youTubeId = this.oldYouTubeId;
        
        // REFRESH THE VIEW AND SAVE
        this.model.view.refreshSongCards(this.model.currentList);
        this.model.saveLists();
    }
}
