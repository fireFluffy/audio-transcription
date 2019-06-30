// Utils
import consts from './consts';

const { MUSIC } = consts.END_POINTS;

const getData = {
  getMusic: (cb): string => {
    const { METHOD, RESPONSE_TYPE, URL } = MUSIC;
    const request = new XMLHttpRequest();
    request.open(METHOD, URL, true);
    request.responseType = RESPONSE_TYPE;
    request.onload = () => cb(request.response);
    request.send();
  },
};

export default getData;
