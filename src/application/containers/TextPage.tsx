// Modules
import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
// Components
import PostComponent from '../components/Test/Post';
// Utils
import ControlTimeLine from '../utils/controlTimeLine';
// Context
import { ConsumerPage } from './Page';
// Resources
import { files } from '../imports';

const MS = 1000;

class TextPageContainer extends React.PureComponent<{}, {}> {
  public static defaultProps = {
    currentTime: 0,
  };

  private constructor(props) {
    super(props);
    const { currentTime } = props;

    this.timeId = null;
    this.file = files.jsonFile;
    this.strText = this.file.length;
    this.templateEndpoints = this.createTemplateObject(this.file);
    this.keysTemplateEndpoints = Object.keys(this.templateEndpoints);
    this.templateTimeLine =  this.createTemplateTimelineList(this.templateEndpoints);
    this.renderList = this.createRenderList(this.templateEndpoints, this.strText);
    
    this.logic = new ControlTimeLine(this.templateEndpoints, this.templateTimeLine, this.setActiveWord);

    // console.log(this.file);
    // console.log(this.templateEndpoints);
    // console.log(this.templateTimeLine);
    // console.log(this.strText);
    // console.log(this.renderList);

    this.state = {
      activeWord: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { context } = this.props;
    const { playing } = context;

    if (prevProps.context.playing && !playing) {
      this.logic.pause();
    } else if (!prevProps.context.playing && playing) {
      this.reTransform();
    }
  }

  // Формирование новых шаблонов при прокрутке
  public reTransform = () => {
    const { context } = this.props;
    const currentTime = context.getForTextTime();
    const value = this.keysTemplateEndpoints.find((item, index) => item > currentTime);
    const index = this.keysTemplateEndpoints.indexOf(value);
    
    const newKeys = this.keysTemplateEndpoints.slice(index);
    const newEndpoints = {};
    newKeys.forEach(i => {
      newEndpoints[i] = {...this.templateEndpoints[i]};
    });
    const firstKey = this.keysTemplateEndpoints[index];
    const newFirstKey = (+firstKey - currentTime).toFixed(2);
    const newTimeLine = this.templateTimeLine.slice(index);
    newTimeLine[0] = +newFirstKey * MS;

    delete this.logic;
    this.logic = new ControlTimeLine(newEndpoints, newTimeLine, this.setActiveWord);

    this.logic.play();
  }

  // Создание шаблона транскрибации
  public createTemplateObject = (file): void => {
    let list = {};

    file.forEach(({ words }, indexRow): [] => {
      const objWords = words.reduce((obj, item, index): void => {
        const sayTime = +((item.timeEnd - item.timeStart).toFixed(2));
        const startSay = words[index + 1] ? words[index + 1].timeStart : file[indexRow + 1]?.words[0].timeStart || 0;
        const silence = +(startSay - item.timeEnd).toFixed(2);

        return {
          ...obj,
          [item.timeStart]: {
            id: indexRow * words.length + index,
            row: indexRow,
            word: item.word,
            finish: item.timeEnd,
            sayTime,
            silence,
          },
        };
      }, {});

      list = Object.assign(list, objWords);
    });

    return Object.assign({}, list);
  };

  // Создание шаблона интервалов транскрибации
  public createTemplateTimelineList = (endpoints): void => {
    const keysEndpointsList = Object.keys(endpoints);

    const list = keysEndpointsList.map((time, index): void => {
      const timeSay = +((+endpoints[time]?.finish - +time).toFixed(2));
      const timeSilence = +((+keysEndpointsList[index + 1] - +endpoints[time]?.finish).toFixed(2));
      const all = +(+(timeSay + timeSilence) * MS).toFixed();

      return all;
    });
    
    list.pop();
    list.unshift(+keysEndpointsList[0] * MS);

    return list.slice();
  };

  // Установка или сброс активного слова
  public setActiveWord = (activeWordId = null) => {
    this.setState({ activeWordId });
  }

  // Переключение слов
  public changeWords = (time, word): void => {
    this.timeId = setTimeout(() => {
      this.setActiveWord(word);
    }, time);
  };

  // Создание массива для рендера
  public createRenderList = (endpoints, rows) => {
    const list = Array(rows).fill([])
      .map((item, index) => Object.values(endpoints).filter(item => item.row === index))
      .map(item => item
        .map(({ id, word }) => ({ id, word })
      ));

    return list;
  }

  public renderPost = (item, index): void => {
    const { activeWordId } = this.state;
    const file = this.file[index];
    const { timeStart } = file;

    return (
      <PostComponent
        key={timeStart}
        activeWordId={activeWordId}
        timeStart={timeStart}
        row={item}
      />
    );
  };

  private render(): React.SFC {
    const { activeWordId } = this.state;
    return (
      <MainWrap>
        <Title>Пример звонка.wav</Title>
        <DateWrap>21 мар 18:03:41</DateWrap>
        {this.renderList.map(this.renderPost)}
      </MainWrap>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ConsumerPage>
    {context => <TextPageContainer {...props} context={context} ref={ref} />}
  </ConsumerPage>
));

const MainWrap = styled.div`
  padding: 34px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
  background-color: #fff;
`;

const Title = styled.div`
  font-size: 24px;
  color: #05294b;
`;

const DateWrap = styled.div`
  margin: 0 0 31px 0;
  padding: 10px 0;
  color: #8494a6;
  font-size: 15px;
  border-bottom: solid 1px #eff0f2;
`;
