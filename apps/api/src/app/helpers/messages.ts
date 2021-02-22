import * as moment from 'moment';
// import {uuidv4 as uuid }from 'uuid';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  username: string;
  text: string;
  time: string;
}

export const formatMessage = (username: string, text: string) => {
  return {
    id: uuidv4(),
    username,
    text,
    time: moment().format('h:mm a'),
  } as Message;
};

export default {
  formatMessage,
};
