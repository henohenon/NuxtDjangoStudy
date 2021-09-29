import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      task: [
        {content: 'テスト'}, 
        {content: 'コーディング'},
        {content: '環境構築'}
      ]
    }),
  })
}


export default createStore;