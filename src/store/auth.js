import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { Semail, Spassword }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(Semail, Spassword)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { Semail, Spassword, Sname }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(Semail, Spassword)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: Sname
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      await commit('clearInfo')
    }
  }
}
