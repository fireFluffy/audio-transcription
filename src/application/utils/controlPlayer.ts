// Modules
import _ from 'lodash';
// Utils
import getData from './getData';

class ControlPlayer {
  private constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    this.startPlayDate = 0;
    this.finishPlayDate = 0;
    this.currentTime = 0;

    this.buffer = null;
    this.audioCtx = new window.AudioContext();
    this.playing = false;
  }

  public getMusic = (cb): void => {
    this.cbAfterGetMusic = cb;
    getData.getMusic(this.callbackAfterGetMusic);
  };

  public callbackAfterGetMusic = (res): void => {
    if (res) {
      this.audioCtx.decodeAudioData(res, this.setTrack);
    }
  };

  public setTrack = (buffer): void => {
    this.buffer = buffer;
    this.gainNode = this.audioCtx.createGain();
    this.oscillator = this.audioCtx.createOscillator();
    this.cbAfterGetMusic({
      duration: buffer.duration,
    });
  };

  public play = (value = 0): void => {
    this.source = this.audioCtx.createBufferSource();

    if (this.gainNode) {
      this.source.buffer = this.buffer;
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      if (!this.source.start) {
        this.source.start = this.source.noteOn;
      }

      this.now = this.audioCtx.currentTime;
      const offset = this.getCurrentTime();
      this.source.start(this.now, offset);
    } else {
      console.log('Трэк не загружен');
    }
  };

  public stop = (): void => {
    if (!this.source.stop) {
      this.source.stop = this.source.noteOff;
    }

    this.source.stop(0);
  };

  public toggle = (value, cb): void => {
    if (this.playing) {
      this.stop();
      this.setFinishPlay();
    } else {
      this.play(value);
      this.setStartPlay();
    }

    this.playing = !this.playing;

    if (_.isFunction(cb)) {
      cb(this.playing);
    }
  };

  public setStartPlay = (): void => {
    this.currentTime = this.getCurrentTime();
    this.startPlayDate = new Date() / 1000;
  };

  public setFinishPlay = (): void => {
    this.finishPlayDate = new Date() / 1000;
  };

  public getCurrentTime = (): void => {
    return this.finishPlayDate - this.startPlayDate + this.currentTime;
  };

  public getFinishTime = (): void => {
    return this.finishPlayDate;
  };

  // Возвращает кол-во миллисекнд, которые нужно проиграть до полной секунды после остановки трэка
  public getRestPlay = (step = 1000): number => {
    const getFinishTime = this.getFinishTime();
    const quant = step;
    const drob = +getFinishTime.toFixed(4);
    const result = quant - ~~((drob % 1) * quant);

    return result;
  };

  // Перемотка
  public rewind = (percent: number = 0): number => {
    const { duration } = this.buffer;
    const newCurrent = (duration / 100) * percent;
    this.currentTime = newCurrent;

    return newCurrent;
  };

  public getForTextTime = (): void => {
    return +this.currentTime.toFixed(2);
  };
}

export default ControlPlayer;
