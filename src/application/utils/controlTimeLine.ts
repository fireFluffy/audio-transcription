class ControlTimeLine {
  private constructor(endpoints, timeLine, cb) {
    this.timeId = null;
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
    clearInterval(this.timeId);
  };

  public recursivePlay = (): void => {
    const ms = this.index;

    this.timeId = setTimeout((): void => {
      const { id, sayTime } = this.endpoints[this.keysEndpoints[this.index]];

      this.index += 1;
      this.recursivePlay();
      this.cb(id);

      // console.log(silence);
      // if (silence && silence > 5) {
      //   setInterval(this.cb, sayTime);
      // }
    }, this.timeLine[ms]);
  };
}

export default ControlTimeLine;
