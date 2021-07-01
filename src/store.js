import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notes: []
	},
	mutations: {
		initNotes(state) {
			if (localStorage.getItem('notes')) {
				state.notes = JSON.parse(localStorage.getItem('notes'))
			}
		},
		saveNote(state, payload) {
			state.notes.push(payload)
		},
		deleteNote(state, payload) {
			state.notes = state.notes.filter(note => note.id !== payload)
		}
	},
	actions: {
		saveNote({commit}, payload){
			commit('saveNote', payload)
		},
		deleteNote({commit}, payload) {
			commit('deleteNote', payload)
		}
	},
	getters: {
		getNotes(state) {
			return state.notes
		}
	}
})
