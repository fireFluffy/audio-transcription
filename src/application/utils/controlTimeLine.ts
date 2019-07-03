class ControlTimeLine {
  private constructor(endpoints, timeLine, cb) {
    this.timeId = null;
    this.silenceId = null;
    this.index = 0;

    this.endpoints = endpoints;
    this.keysEndpoints = Object.keys(endpoints);
    this.timeLine = timeLine;
    this.cb = cb;
  }

  public play = (): void => {
    this.recursivePlay();
  };

  public pause = (): void => {
    Promise.all([clearInterval(this.timeId), clearInterval(this.silenceId)]);
  };

  public recursivePlay = (): void => {
    const ms = this.index;

    this.timeId = setTimeout((): void => {
      const { id, sayTime, silence } = this.endpoints[this.keysEndpoints[this.index]];

      this.index += 1;
      this.recursivePlay();
      this.cb(id);

      // if (silence && sayTime > 0.01) {
      //   this.silenceId = setInterval(this.cb, sayTime * 1000);
      // }
    }, this.timeLine[ms]);
  };
}

export default ControlTimeLine;
