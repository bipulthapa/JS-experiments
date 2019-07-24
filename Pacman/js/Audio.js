class AudioPlayer {

    constructor() {
        this.startGameSound = this.loadStartGameSound();
        this.eatingSound = this.loadEatingSound();
        this.dieSound = this.loadDieSound();
        this.eatCookieSound = this.loadEatCookieSound();
        this.chasingSound = this.loadChasingSound();
        this.eatGhostSound = this.loadEatGhostSound();
        this.ghostDeadSound = this.loadGhostDeadSound();

        this.allSounds = [this.startGameSound, this.eatingSound, this.dieSound, this.eatCookieSound,
                            this.chasingSound, this.eatGhostSound, this.ghostDeadSound];
    }

    startGameSound() {
        return this.startGameSound;
    }

    eatingSound() {
        return this.eatingSound;
    }

    dieSound() {
        return this.dieSound;
    }

    eatCookieSound() {
        return this.eatCookieSound;
    }

    chasingSound() {
        return this.chasingSound;
    }

    eatGhostSound() {
        return this.eatGhostSound;
    }

    ghostDeadSound() {
        return this.ghostDeadSound;
    }

    stopAllSounds() {
        for (let sound of this.allSounds) {
            sound.pause();
        }
    }

    isPlaying(sound) {
        return sound.seeking;
    }

    loadStartGameSound() {
        return this.loadSound("sound/startGame.mp3");
    }

    loadEatingSound() {
        var sound = this.loadSound("sound/eatFood.mp3");
        sound.volume = 0.3;
        return sound;
    }

    loadDieSound() {
        return this.loadSound("sound/die.mp3");
    }

    loadEatCookieSound() {
        return this.loadSound("sound/eatCookie.mp3");
    }

    loadChasingSound() {
        var sound = this.loadSound("sound/chasing.mp3");
        sound.loop = true;
        return sound;
    }

    loadEatGhostSound() {
        return this.loadSound("sound/eatGhost.mp3");
    }

    loadGhostDeadSound() {
        var sound = this.loadSound("sound/ghostDead.mp3");
        sound.loop = true;
        return sound;
    }

    loadSound(src) {
        var sound = document.createElement("audio");
        sound.src = src;
        sound.preload = "true";
        document.body.appendChild(sound);
        return sound;
    }

}