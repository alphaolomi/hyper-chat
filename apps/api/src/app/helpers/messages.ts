import * as moment from 'moment';

interface Message {
  username: string;
  text: string;
  time: string;
}

export const formatMessage = (username: string, text: string) => {
  return {
    username,
    text,
    time: moment().format('h:mm a'),
  } as Message;
};

export default {
  formatMessage,
};
