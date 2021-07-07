import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notes: [],
		confirmVisible: false
	},
	mutations: {
		loadNotes(state, payload) {
			state.notes = payload
		},
		setNotes(state) {
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		addNote(state, payload) {
			state.notes.push(payload)
		},
		saveNote(state, payload) {
			state.notes.forEach(note => {
				if (note.id === payload.id) {
					note = payload.note
				}
			})
		},
		deleteNote(state, payload) {
			state.notes = state.notes.filter(note => note.id !== payload)
		},
		setConfirmVisible(state, payload) {
			state.confirmVisible = payload
		}
	},
	actions: {
		// historyPrev({commit, getters}){
		// 	console.log('prev')
		// 	if (getters.getHistory.length > 1) {
		// 		commit('historyPrev', JSON.parse(getters.getHistory[getters.getHistory.length - 2]))
		// 	}
		// },
		// historyPush({commit, getters}) {
		// 	if (JSON.stringify(getters.getNotes) === getters.getHistory[getters.getHistory.length - 1]) return
		// 	if (getters.getHistory.length < 5) {
		// 		commit('historyPush', JSON.stringify(getters.getNotes))
		// 	} else {
		// 		commit('historySlice')
		// 		commit('historyPush', JSON.stringify(getters.getNotes))
		// 	}
		// },
		loadNotes({commit}) {
			if (localStorage.getItem('notes')) {
				commit('loadNotes', JSON.parse(localStorage.getItem('notes')))
			}
		},
		addNote({commit}, payload) {
			commit('addNote', payload)
		},
		saveNote({commit}, payload) {
			commit('saveNote', payload)
		},
		deleteNote({commit}, payload) {
			commit('deleteNote', payload)
		},
	},
	getters: {
		getNotes: state => state.notes,
		getConfirmVisible: state => state.confirmVisible,
		// getHistory: state => state.history,
	}
})
