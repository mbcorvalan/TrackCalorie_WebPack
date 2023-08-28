class Storage {
	static getCalorieLimit(defaultLimit = 2000) {
		let calorieLimit
		if (localStorage.getItem('calorieLimit') === null) {
			calorieLimit = defaultLimit
		} else {
			calorieLimit = +localStorage.getItem('calorieLimit')
		}
		return calorieLimit
	}
	static setCalorieLimit(calorieLimit) {
		localStorage.setItem('calorieLimit', calorieLimit)
	}
	static getTotalCalories(defaultCalories = 0) {
		let totalCalorie
		if (localStorage.getItem('totalCalories') === null) {
			totalCalorie = defaultCalories
		} else {
			totalCalorie = +localStorage.getItem('totalCalories')
		}
		return totalCalorie
	}
	static updateTotalCalories(calories) {
		localStorage.setItem('totalCalories', calories)
	}

	static getMeals() {
		let meals
		if (localStorage.getItem('meals') === null) {
			meals = []
		} else {
			meals = JSON.parse(localStorage.getItem('meals'))
		}
		return meals
	}
	static saveMeal(meal) {
		const meals = Storage.getMeals()
		meals.push(meal)
		localStorage.setItem('meals', JSON.stringify(meals))
	}
	static removeMeal(id) {
		const meals = Storage.getMeals()
		meals.forEach((meal, index) => {
			if (meal.id === id) {
				meals.splice(index, 1)
			}
			localStorage.setItem('meals', JSON.stringify(meals))
		})
	}
	static getWorkouts() {
		let workOut
		if (localStorage.getItem('workout') === null) {
			workOut = []
		} else {
			workOut = JSON.parse(localStorage.getItem('workout'))
		}
		return workOut
	}
	static saveWorkOut(workOut) {
		const workOuts = Storage.getWorkouts()
		workOuts.push(workOut)
		localStorage.setItem('workout', JSON.stringify(workOuts))
	}
	static removeWorkOut(id) {
		const workOuts = Storage.getWorkouts()
		workOuts.forEach((workOut, index) => {
			if (workOut.id === id) {
				workOuts.splice(index, 1)
			}
			localStorage.setItem('workOut', JSON.stringify(workOuts))
		})
	}
	static clearAll() {
		localStorage.clear()
	}
}

export default Storage
