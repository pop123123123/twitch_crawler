import * as streamslist from '../api/index'
import * as mutations from './mutations'

export const getAllStreamers = ({ commit }) => {
  streamslist.getAllStreamers(streamers => {
    commit("RECEIVE_STREAMERS", streamers)
  });
}
export const getStreamer = ({ commit }, id) => {
  streamslist.getStreamer(streamer => {
    commit("RECEIVE_STREAMER", streamer)
  }, id);
}
