import CalorieTracker from './Tracker'

class Meal {
	constructor(name, calories) {
		this.id = Math.random().toString(16).substring(2)
		this.name = name
		this.calories = calories
		this.type = 'meal'
	}
}

class WorkOut {
	constructor(name, calories) {
		this.id = Math.random().toString(16).substring(2)
		this.name = name
		this.calories = calories
		this.type = 'workout'
	}
}

export { Meal, WorkOut }
