import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notes: [],
		initNote: {}
	},
	mutations: {
		initNotes(state, payload) {
			state.notes = payload
		},
		addNote(state, payload) {
			state.notes.push(payload)
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		saveNote(state, payload) {
			state.notes.forEach(note => {
				if (note.id === payload.id) {
					note = payload.note
				}
			})
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		deleteNote(state, payload) {
			state.notes = state.notes.filter(note => note.id !== payload)
		},
		setInitNote(state, payload) {
			state.initNote = payload
		}
	},
	actions: {
		initNotes({commit}, payload) {
			commit('initNotes', payload)
		},
		addNote({commit}, payload){
			commit('addNote', payload)
		},
		saveNote({commit}, payload){
			commit('saveNote', payload)
		},
		deleteNote({commit}, payload) {
			commit('deleteNote', payload)
		},
		setInitNote({commit}, payload) {
			commit('setInitNote', payload)
		}
	},
	getters: {
		getNotes: state => state.notes
	}
})
