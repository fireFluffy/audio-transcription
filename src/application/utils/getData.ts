// Utils
import consts from './consts';

const { MUSIC } = consts.END_POINTS;

const onError = (): void => {
  console.log(`Ошибка получения данных от сервера!`);
  return null;
};

const getData = {
  getMusic: (cb): string => {
    const { METHOD, RESPONSE_TYPE, URL } = MUSIC;
    const request = new XMLHttpRequest();
    request.open(METHOD, URL, true);
    request.responseType = RESPONSE_TYPE;
    request.onload = (): void => cb(request.response);
    request.onerror = onError;
    request.send(null);
  },
};

export default getData;
