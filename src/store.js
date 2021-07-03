import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notes: [],
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
	},
	actions: {
		loadNotes({commit}) {
			if (localStorage.getItem('notes')) {
				commit('loadNotes', JSON.parse(localStorage.getItem('notes')))
			}
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
	},
	getters: {
		getNotes: state => state.notes,
	}
})
