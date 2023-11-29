const calendar = document.getElementsByClassName("days").item(0);
const actualDay = document.getElementById("actual-day");
const yesterday = document.getElementById("yesterday");
const tomorrow = document.getElementById("tomorrow");

const monthText = [
	'January', 'February', 'March', 'April',
	'May', 'June', 'July', 'August',
	'September', 'October', 'November', 'December'
];

class Calendar {
	constructor(month, year, day) {
		this.month = month;
		this.year = year;
		this.day = day;
		this.setDay();
	}

	setDay = () => actualDay.textContent = `${monthText[this.month]} ${this.day}`;

	daysInMonth = () => new Date(this.year, this.month, 0).getDate();

	firstDay = () => new Date(this.year, this.month - 1, 1).getDay();

	printCalendar = () => {
		calendar.innerHTML = '';
		const firstDay = this.firstDay();
		const daysInMonth = this.daysInMonth();
		if (firstDay > 1) {
			for (let index = 1; index < firstDay; index++) {
				calendar.appendChild(Calendar.appendDay('', false));
			}
		}
		for (let index = 1; index <= daysInMonth; index++) {
			const dayElement = index == this.day
				? Calendar.appendDay(index, true)
				: Calendar.appendDay(index, false);
			calendar.appendChild(dayElement);
		}
	}

	static appendDay = (day, actual) => {
		const dayElement = document.createElement("time");
		if (actual) {
			dayElement.setAttribute("class", "actual framed");
		} else {
			dayElement.setAttribute("class", "framed");
		}
		dayElement.textContent = day;
		return dayElement;
	}

}

const c = new Calendar(11, 2023, 29);
c.printCalendar();

yesterday.onclick = () => {
	c.day--;
	c.printCalendar();
}

tomorrow.onclick = () => {
	c.day++;
	c.printCalendar();
}