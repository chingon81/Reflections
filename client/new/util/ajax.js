import axios from 'axios';

class Ajax {
  constructor() {
    this.url = '/reflections';
  }

  async getChannels() {
    const options = {
      method: 'GET',
      url: `${this.url}/dash/getchannels`,
    };

    const result = await axios(options);
    return result;
  }

  async getUsers() {
    const options = {
      method: 'GET',
      url: `${this.url}/dash/getusers`,
    };

    const result = await axios(options);
    return result;
  }
}

export default new Ajax();
