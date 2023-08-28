import '@fortawesome/fontawesome-free/js/all'
import { Modal, Collapse } from 'bootstrap'
import CalorieTracker from './Tracker'
import { Meal, WorkOut } from './item'

import './css/bootstrap.css'
import './css/style.css'

class App {
	constructor() {
		this._tracker = new CalorieTracker()
		document
			.querySelector('#meal-form')
			.addEventListener('submit', this._newItem.bind(this, 'meal'))
		document
			.querySelector('#workout-form')
			.addEventListener('submit', this._newItem.bind(this, 'workout'))
		document
			.querySelector('#meal-items')
			.addEventListener('click', this._removeItems.bind(this, 'meal'))
		document
			.querySelector('#workout-items')
			.addEventListener('click', this._removeItems.bind(this, 'workout'))
		document
			.querySelector('#filter-meals')
			.addEventListener('keyup', this._filterItems.bind(this, 'meal'))
		document
			.querySelector('#filter-workouts')
			.addEventListener('keyup', this._filterItems.bind(this, 'workout'))
		document
			.querySelector('#reset')
			.addEventListener('click', this._rest.bind(this))
		document
			.querySelector('#limit-form')
			.addEventListener('submit', this._setLimit.bind(this))

		this._tracker.loadItems()
	}
	_newItem(type, e) {
		e.preventDefault()
		let name = document.querySelector(`#${type}-name`).value
		let calories = document.querySelector(`#${type}-calories`).value
		const collapse = document.querySelector(`#collapse-${type}`)

		//Validations inputs
		if (
			name === '' ||
			(calories === '' && typeof calories != 'number' && Number.isNaN(calories))
		) {
			alert('Please fill all fields')
			return
		}

		if (type === 'workout') {
			const workOut = new WorkOut(name, +calories)
			this._tracker.addWorkOut(workOut)
		}

		if (type === 'meal') {
			const meal = new Meal(name, +calories)
			this._tracker.addMeal(meal)
		}

		document.querySelector(`#${type}-name`).value = ''
		document.querySelector(`#${type}-calories`).value = ''
		const bsCollapse = new Collapse(collapse, { toggle: true })
	}
	_removeItems(type, e) {
		if (
			e.target.classList.contains('delete') ||
			e.target.classList.contains('fa-times')
		) {
			if (confirm('are you sure?')) {
				const id = e.target.closest('.card').getAttribute('data-id')
				type === 'meal'
					? this._tracker.removeMeal(id)
					: this._tracker.removeWorkOut(id)
				e.target.closest('.card').remove()
			}
		}
	}
	_filterItems(type, e) {
		const text = e.target.value.toLowerCase()
		document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
			const name = item.firstElementChild.firstElementChild.textContent
			if (name.toLocaleLowerCase().indexOf(text) !== -1) {
				item.style.display = 'block'
			} else {
				item.style.display = 'none'
			}
		})
	}
	_rest() {
		this._tracker.rest()
		document.querySelector('#meal-items').innerHTML = ''
		document.querySelector('#workout-items').innerHTML = ''
		document.querySelector('#filter-meals').value = ''
		document.querySelector('#filter-workouts').value = ''
	}
	_setLimit(e) {
		e.preventDefault()
		const limit = document.querySelector('#limit')
		const modalEl = document.getElementById('limit-modal')
		const modal = Modal.getInstance(modalEl)
		if (limit.value === '') {
			alert('Please add a limit')
			return
		}
		this._tracker.setLimit(+limit.value)
		limit.value = ''
		modal.hide()
	}
}

const app = new App()
