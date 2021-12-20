import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecord ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`users/${uid}/records`).once('value')).val() || {}
        const rec = []
        Object.keys(records).forEach(key => {
          rec.push({
            amount: records[key].amount,
            categoryId: records[key].categoryId,
            description: records[key].description,
            type: records[key].type,
            date: records[key].date,
            id: key
          })
        })
        return rec
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const records = (await ((await firebase.database().ref(`users/${uid}/records`).child(id)).once('value'))).val() || {}
        return records
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
