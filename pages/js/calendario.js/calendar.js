import { getEvent, getSchool, postLecture } from "./methods.js";
import { monthsAll } from "./months.js";

export const createCalendar = async () => {

    const calendar = document.querySelector(".calendar"),
        date = document.querySelector(".date"),
        daysContainer = document.querySelector(".days"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        todayBtn = document.querySelector(".today-btn"),
        gotoBtn = document.querySelector(".goto-btn"),
        dateInput = document.querySelector(".date-input"),
        eventDay = document.querySelector(".event-day"),
        eventDate = document.querySelector(".event-date"),
        eventsContainer = document.querySelector(".events"),
        addEventBtn = document.querySelector(".add-event"),
        addEventWrapper = document.querySelector(".add-event-wrapper "),
        addEventCloseBtn = document.querySelector(".close "),
        addEventTitle = document.querySelector(".event-name "),
        addObjective = document.querySelector(".event-time-from "),
        addDate = document.querySelector(".event-time-to "),
        addEventSubmit = document.querySelector(".add-event-btn ");

    let today = new Date();

    let activeDay;
    let month = today.getMonth();
    let year = today.getFullYear();

    const months = monthsAll

    const eventsArr = [];
    getEvents();

    function initCalendar() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        date.innerHTML = months[month] + " " + year;

        let days = "";

        for (let x = day; x > 0; x--) {
            days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDate; i++) {
            //check if event is present on that day
            let event = false;
            eventsArr.forEach((eventObj) => {
                if (
                    eventObj.day === i &&
                    eventObj.month === month + 1 &&
                    eventObj.year === year
                ) {
                    event = true;
                }
            });
            if (
                i === new Date().getDate() &&
                year === new Date().getFullYear() &&
                month === new Date().getMonth()
            ) {
                activeDay = i;
                getActiveDay(i);
                updateEvents(i);
                if (event) {
                    days += `<div class="day today active event">${i}</div>`;
                } else {
                    days += `<div class="day today active">${i}</div>`;
                }
            } else {
                if (event) {
                    days += `<div class="day event">${i}</div>`;
                } else {
                    days += `<div class="day ">${i}</div>`;
                }
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day next-date">${j}</div>`;
        }
        daysContainer.innerHTML = days;
        addListner();
    }

    //function to add month and year on prev and next button
    function prevMonth() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        initCalendar();
    }

    function nextMonth() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        initCalendar();
    }

    prev.addEventListener("click", prevMonth);
    next.addEventListener("click", nextMonth);

    initCalendar();

    //function to add active on day
    function addListner() {
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
            day.addEventListener("click", (e) => {
                getActiveDay(e.target.innerHTML);
                updateEvents(Number(e.target.innerHTML));
                activeDay = Number(e.target.innerHTML);
                //remove active
                days.forEach((day) => {
                    day.classList.remove("active");
                });
                //if clicked prev-date or next-date switch to that month
                if (e.target.classList.contains("prev-date")) {
                    prevMonth();
                    //add active to clicked day afte month is change
                    setTimeout(() => {
                        //add active where no prev-date or next-date
                        const days = document.querySelectorAll(".day");
                        days.forEach((day) => {
                            if (
                                !day.classList.contains("prev-date") &&
                                day.innerHTML === e.target.innerHTML
                            ) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                } else if (e.target.classList.contains("next-date")) {
                    nextMonth();
                    //add active to clicked day afte month is changed
                    setTimeout(() => {
                        const days = document.querySelectorAll(".day");
                        days.forEach((day) => {
                            if (
                                !day.classList.contains("next-date") &&
                                day.innerHTML === e.target.innerHTML
                            ) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                } else {
                    e.target.classList.add("active");
                }
            });
        });
    }

    todayBtn.addEventListener("click", () => {
        today = new Date();
        month = today.getMonth();
        year = today.getFullYear();
        initCalendar();
    });



    //function get active day day name and date and update eventday eventdate
    function getActiveDay(date) {
        const day = new Date(year, month, date);
        const dayNames = [
          'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
          'Quinta-feira', 'Sexta-feira', 'Sábado'
        ];
        const dayIndex = day.getDay();
        const dayName = dayNames[dayIndex];
        eventDay.innerHTML = dayName;
        eventDate.innerHTML = date + " " + months[month] + " " + year;
      }
      

    function updateEvents(date) {
        let events = "";
        eventsArr.forEach((event) => {
            if (
                date === event.day &&
                month + 1 === event.month &&
                year === event.year
            ) {
                event.events.forEach((event) => {
                    events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.tema}</h3>
            </div>
            <div class="event-objective">
              <span class="event-objective">${event.objetivo}</span>
            </div>  
        </div>`;
                });
            }
        });
        if (events === "") {
            events = `<div class="no-event">
            <h3>Sem eventos</h3>
        </div>`;
        }
        eventsContainer.innerHTML = events;
        saveEvents();
    }

    //function to add event
    addEventBtn.addEventListener("click", () => {
        addEventWrapper.classList.toggle("active");
    });

    addEventCloseBtn.addEventListener("click", () => {
        addEventWrapper.classList.remove("active");
    });

    document.addEventListener("click", (e) => {
        if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
            addEventWrapper.classList.remove("active");
        }
    });


    const dateLecture = `${year}-${String(month).padStart(2, '0')}-${String(activeDay).padStart(2, '0')}`

    addEventSubmit.addEventListener("click", () => {
        const eventTitle = addEventTitle.value;
        const eventObjective = addObjective.value;
        const eventDate = dateLecture;
        const selectedValue = getSelectedValue()

        const newEvent = {
            tema: eventTitle,
            objetivo: eventObjective,
            data_palestra: dateLecture,
            id_escola: parseInt(selectedValue)
        };

        if (eventTitle === "" || eventObjective === "" || eventDate === "") {
            alert("Por favor! Preencha todos os campos!");
            return;
        }else{
            // postLecture(newEvent)
        }


        //check if event is already added
        let eventExist = false;
        eventsArr.forEach((event) => {
            if (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            ) {
                event.events.forEach((event) => {
                    if (event.title === eventTitle) {
                        eventExist = true;
                    }
                });
            }
        });
        if (eventExist) {
            alert("Esse evento já existe!");
            return;
        }

        
        let eventAdded = false;
        if (eventsArr.length > 0) {
            eventsArr.forEach((item) => {
                if (
                    item.day === activeDay &&
                    item.month === month + 1 &&
                    item.year === year
                ) {
                    item.events.push(newEvent);
                    eventAdded = true;
                }
            });
        }

        if (!eventAdded) {
            eventsArr.push({
                day: activeDay,
                month: month + 1,
                year: year,
                events: [newEvent],
            });
        }
        addEventWrapper.classList.remove("active");

        addEventTitle.value = "";
        addObjective.value = "";
        addDate.value = "";
        updateEvents(activeDay);

        const activeDayEl = document.querySelector(".day.active");
        if (!activeDayEl.classList.contains("event")) {
            activeDayEl.classList.add("event");
        }
    });


    eventsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("event")) {
            if (confirm("Tem certeza que deseja excluir esse evento?")) {
                console.log(e.target);
                const eventTitle = e.target.children[0].children[1].innerHTML;
                eventsArr.forEach((event) => {
                    if (
                        event.day === activeDay &&
                        event.month === month + 1 &&
                        event.year === year
                    ) {
                        event.events.forEach((item, index) => {
                            console.log(item);
                            if (item.tema === eventTitle) {
                                event.events.splice(index, 1);
                            }
                        });
                        //if no events left in a day then remove that day from eventsArr
                        if (event.events.length === 0) {
                            eventsArr.splice(eventsArr.indexOf(event), 1);
                            const activeDayEl = document.querySelector(".day.active");
                            if (activeDayEl.classList.contains("event")) {
                                activeDayEl.classList.remove("event");
                            }
                        }
                    }
                });
                updateEvents(activeDay);
            }
        }
    });

    //function to save events in local storage
    function saveEvents() {
        localStorage.setItem("events", JSON.stringify(eventsArr));
    }

    //function to get events from local storage
    function getEvents() {
        //check if events are already saved in local storage then return event else nothing
        if (localStorage.getItem("events") === null) {
            return;
        } else {
            return eventsArr.push(...JSON.parse(localStorage.getItem("events")));
        }

    }


    const createFilter = function (school) {
        const selectSchool = document.getElementById('selectSchool')
        const schoolId = document.createElement('option')

        schoolId.value = school[0]
        schoolId.textContent = `${school[1]} - ${school[0]}`

        selectSchool.append(schoolId)
        return selectSchool
    };
    const getSelected = async function () {
        const schools = await getSchool()
        const mapingSchool = schools.map(i => {
            return [
                i.escola.id,
                i.escola.nome
            ]
        })

        const select = document.getElementById('school')
        const onlySchool = mapingSchool.map(createFilter)

        select.replaceChildren(...onlySchool)
    }

    await getSelected()

    const getSelectedValue = () => {
        const comboBoxSchool = document.getElementById('selectSchool');
        const selectedValue = comboBoxSchool.value;
        console.log(selectedValue);
        return selectedValue
    };

}