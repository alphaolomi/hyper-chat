import * as moment from 'moment';

const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format('h:mm a'),
  };
};

export default formatMessage;
