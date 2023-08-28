import Storage from './Storage'

class CalorieTracker {
	constructor() {
		this._calorieLimit = Storage.getCalorieLimit()
		this._totalCalories = Storage.getTotalCalories(0)
		this._meals = Storage.getMeals()
		this._workOut = Storage.getWorkouts()
		this._displayCaloriesLimit()
		this._displayCaloriesTotal()
		this._displayCaloriesConsumed()
		this._displayCaloriesBurned()
		this._displayCaloriesRemaining()
		this._displayCaloriesProgressBar()

		document.getElementById('limit').value = this._calorieLimit
	}
	//Public Methods /API

	addMeal(meal) {
		this._meals.push(meal)
		this._totalCalories += meal.calories
		Storage.updateTotalCalories(this._totalCalories)
		Storage.saveMeal(meal)
		this._displayNewItem(meal)
		this._render()
	}
	addWorkOut(workOut) {
		this._workOut.push(workOut)
		this._totalCalories -= workOut.calories
		Storage.updateTotalCalories(this._totalCalories)
		Storage.saveWorkOut(workOut)
		this._displayNewItem(workOut)
		this._render()
	}
	removeMeal(id) {
		const index = this._meals.findIndex((meal) => meal.id === id)
		if (index != -1) {
			const meal = this._meals[index]
			this._totalCalories -= meal.calories
			Storage.updateTotalCalories(this._totalCalories)
			this._meals.splice(index, 1)
			Storage.removeMeal(id)
			this._render()
		}
	}
	removeWorkOut(id) {
		const index = this._workOut.findIndex((workOut) => workOut.id === id)
		if (index != -1) {
			const workOut = this._workOut[index]
			this._totalCalories -= workOut.calories
			Storage.updateTotalCalories(this._totalCalories)
			this._workOut.splice(index, 1)
			Storage.removeWorkOut(id)
			this._render()
		}
	}
	rest() {
		this._totalCalories = 0
		this._meals = []
		this._workOut = []
		Storage.clearAll()
		this._render()
	}
	setLimit(calorieLimit) {
		this._calorieLimit = calorieLimit
		this._displayCaloriesLimit()
		Storage.setCalorieLimit(calorieLimit)
		this._render()
	}

	loadItems() {
		this._meals.forEach((meal) => this._displayNewItem(meal))
		this._workOut.forEach((workOut) => this._displayNewItem(workOut))
	}

	//Private methods
	_displayCaloriesTotal() {
		const burnedCaloriesEl = document.querySelector('#calories-total')
		burnedCaloriesEl.innerHTML = this._totalCalories
	}
	_displayCaloriesLimit() {
		const LimitCaloriesEl = document.querySelector('#calories-limit')
		LimitCaloriesEl.innerHTML = this._calorieLimit
	}
	_displayCaloriesConsumed() {
		const consumedCaloriesEl = document.querySelector('#calories-consumed')
		const consumed = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		)
		consumedCaloriesEl.innerHTML = consumed
	}
	_displayCaloriesBurned() {
		const consumedCaloriesEl = document.querySelector('#calories-burned')
		const burned = this._workOut.reduce(
			(total, workOut) => total + workOut.calories,
			0
		)
		consumedCaloriesEl.innerHTML = burned
	}
	_displayCaloriesRemaining() {
		const remainingCaloriesEl = document.querySelector('#calories-remaining')
		const remaining = this._calorieLimit - this._totalCalories
		remainingCaloriesEl.innerHTML = remaining
		const progressEl = document.querySelector('#calorie-progress')
		if (remaining <= 0) {
			remainingCaloriesEl.parentElement.parentElement.classList.remove(
				'bg-light'
			)
			progressEl.classList.add('bg-danger')
			remainingCaloriesEl.parentElement.parentElement.classList.add('bg-danger')
		} else {
			remainingCaloriesEl.parentElement.parentElement.classList.add('bg-light')
			remainingCaloriesEl.parentElement.parentElement.classList.remove(
				'bg-danger'
			)
			progressEl.classList.remove('bg-danger')
		}
	}
	_displayCaloriesProgressBar() {
		const progressEl = document.querySelector('#calorie-progress')
		let percentage = (this._totalCalories / this._calorieLimit) * 100
		const width =
			percentage <= 100 ? Math.round(percentage) : (percentage = 100)
		progressEl.style.width = `${width}%`
	}
	_displayNewItem(item) {
		const listItems = document.querySelector(`#${item.type}-items`)

		const listItem = document.createElement('div')
		listItem.classList.add('card', 'my-2')
		listItem.setAttribute('data-id', item.id)
		listItem.innerHTML = `<div class="card-body">
		<div class="d-flex align-items-center justify-content-between">
		  <h4 class="mx-1">${item.name}</h4>
		  <div class="fs-1 ${
				item.type === 'meal' ? 'bg-primary' : 'bg-secondary'
			} text-white text-center rounded-2 px-2 px-sm-5">
		  ${item.calories}
		  </div>
		  <button class="delete btn btn-danger btn-sm mx-2">
			<i class="fas fa-solid fa-times"></i>
		  </button>
		</div>
	  </div>
		`
		listItems.appendChild(listItem)
	}
	_render() {
		this._displayCaloriesTotal()
		this._displayCaloriesConsumed()
		this._displayCaloriesBurned()
		this._displayCaloriesRemaining()
		this._displayCaloriesProgressBar()
	}
}

export default CalorieTracker
