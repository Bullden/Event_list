const EVENT_LIST = [];

document.getElementById('button-add').addEventListener('click', (e) => {
    e.preventDefault();
    const nameInputValue = document.getElementById('name').value;
    const dateInputValue = document.getElementById('date').value;
    const startInputValue = document.getElementById('start').value;
    const endInputValue = document.getElementById('end').value;
    
    let isErrorExists = false 
    
    if (nameInputValue === '') {
        alert('Заполните поле "Название"')
        isErrorExists = true
        return
    }
    if (dateInputValue === '') {
        alert('Заполните поле "Дата"')
        isErrorExists = true
        return
    }
    if (startInputValue === '') {
        alert('Заполните поле "Время начала"')
        isErrorExists = true
        return
    }
    if (endInputValue === '') {
        alert('Заполните поле "Время конца"')
        isErrorExists = true
        return
    }

    const eventItemInfo = {
        name: nameInputValue,
        start: startInputValue,
        end: endInputValue
    }

    let isDateSame = false
    EVENT_LIST.forEach(event => {
        if (event.dateKey === dateInputValue) {

            isDateSame = true

            let isTimeCrossing = false
            event.eventItemsArr.forEach(eventItem => {
                if (eventItem.start <= eventItemInfo.start && eventItem.end >= eventItemInfo.end) {
                    alert('Время уже зарезервировано под другое событие!')
                    isTimeCrossing = true
                    return
                }
            })
            
            !isTimeCrossing && !isErrorExists && event.eventItemsArr.push(eventItemInfo)
        }
    })

    if (!isDateSame && dateInputValue) {
        const newItem = {
            dateKey: dateInputValue,
            eventItemsArr: []
        }

        !isErrorExists && newItem.eventItemsArr.push(eventItemInfo)
        EVENT_LIST.push(newItem);
    }

    RenderEventList(EVENT_LIST);
})

function RenderEventList(eventArr) {
    let selectedDateIndex
    document.getElementById('event-list-container').innerHTML = ""
    document.getElementById('date-select-container').innerHTML = ""
    const pageWrapper = document.getElementById('date-select-container')
    const dateSelect = document.createElement('select')
    const defaultDateOption = document.createElement('option')
    defaultDateOption.setAttribute('value', '')
    dateSelect.selectedIndex = selectedDateIndex
    defaultDateOption.innerText = selectedDateIndex ? dateSelect.options[selectedDateIndex].value : 'Дата не выбрана'
    dateSelect.appendChild(defaultDateOption)

    eventArr.forEach(event => {
        
        const eventListWrapper = document.createElement('div');
        eventListWrapper.setAttribute('class','event-list-wrapper');
        const eventList = document.createElement('div');
        eventList.setAttribute('class','event-list');
        eventList.setAttribute('id','event-list');
        const containerForInfo = document.createElement('div');
        containerForInfo.setAttribute('class','container-for-info');
        containerForInfo.setAttribute('id','container-for-info');
        const headEventList = document.createElement('div');
        headEventList.setAttribute('class','event-list-start');
        const headEventListP = document.createElement('p');
        headEventListP.innerText = event.dateKey;
        headEventList.appendChild(headEventListP);
        containerForInfo.appendChild(headEventList);

        event.eventItemsArr.forEach((eventItem, idx) => {
            const infoAboutEventWrap = document.createElement('div');
            infoAboutEventWrap.setAttribute('class','event-list-info-wrapper');
            const infoAboutEvent = document.createElement('div');
            infoAboutEvent.setAttribute('class', 'event-list-info');
            const nameEvent = document.createElement('div');
            nameEvent.setAttribute('class','event-list-name');
            const nameEventP = document.createElement('p');
            nameEventP.innerText = eventItem.name;
            const timeAndButtons = document.createElement('div');
            timeAndButtons.setAttribute('class','event-list-time-buttons-wrapper');
            const timeWrap = document.createElement('div');
            timeWrap.setAttribute('class','event-list-date-wrapper');
            const startTime = document.createElement('div');
            startTime.setAttribute('class','event-list-time-start');
            startTime.setAttribute('id','event-list-time-start');
            const startTimeP = document.createElement('input');
            startTimeP.setAttribute('class','start-time');
            startTimeP.setAttribute('id','start-time');
            startTimeP.setAttribute('readonly','readonly');
            startTimeP.setAttribute('value', eventItem.start);
            const endTime = document.createElement('div');
            endTime.setAttribute('class','event-list-time-end');
            const endTimeP = document.createElement('input');
            endTimeP.setAttribute('id','end-time');
            endTimeP.setAttribute('class','end-time');
            endTimeP.setAttribute('readonly','readonly')
            endTimeP.setAttribute('value', eventItem.end);
            const buttonsWrap = document.createElement('div');
            buttonsWrap.setAttribute('class','event-list-buttons-wrapper')
            const buttonEditWrap = document.createElement('div');
            buttonEditWrap.setAttribute('class','event-list-button-edit-wrapper');
            const buttonEdit = document.createElement('div');
            buttonEdit.setAttribute('id','event-list-button-edit');
            buttonEdit.setAttribute('class','event-list-button-edit');
            buttonEdit.addEventListener('click',(e) => {
                e.preventDefault()
                document.getElementById('start-time').classList.toggle('start-time');
                document.getElementById('start-time').classList.toggle('start-time2');
                document.getElementById('end-time').classList.toggle('end-time');
                document.getElementById('end-time').classList.toggle('end-time2');
                document.getElementById('start-time').removeAttribute('readonly');
                document.getElementById('end-time').removeAttribute('readonly');
                document.getElementById('start-time').setAttribute('type','time');
                document.getElementById('end-time').setAttribute('type','time');
                document.getElementById('event-list-button-edit').classList.toggle('event-list-button-edit');
                document.getElementById('event-list-button-edit').classList.toggle('event-list-button-check');
            });
    
            const buttonDeleteWrap = document.createElement('div');
            buttonDeleteWrap.setAttribute('class','event-list-button-delete-wrapper');
            const buttonDelete = document.createElement('div');
            buttonDelete.setAttribute('id','event-list-button-delete');
            buttonDelete.setAttribute('class','event-list-button-delete');
            buttonDeleteWrap.addEventListener('click',(e) => {
                e.preventDefault()
                event.eventItemsArr.splice(idx, 1);
                RenderEventList(EVENT_LIST)
            })
            buttonDeleteWrap.appendChild(buttonDelete);
            buttonEditWrap.appendChild(buttonEdit);
            buttonsWrap.appendChild(buttonEditWrap);
            buttonsWrap.appendChild(buttonDeleteWrap);
            endTime.appendChild(endTimeP);
            startTime.appendChild(startTimeP);
            timeWrap.appendChild(startTime);
            timeWrap.appendChild(endTime);
            timeAndButtons.appendChild(timeWrap);
            timeAndButtons.appendChild(buttonsWrap);
            nameEvent.appendChild(nameEventP);
            infoAboutEvent.appendChild(nameEvent);
            infoAboutEvent.appendChild(timeAndButtons);
            infoAboutEventWrap.appendChild(infoAboutEvent);
            containerForInfo.appendChild(infoAboutEventWrap);
        })
        eventList.appendChild(containerForInfo);
        eventListWrapper.appendChild(eventList);

        document.getElementById('event-list-container').appendChild(eventListWrapper);
    })

    EVENT_LIST.forEach(event => {
        const dateOption = document.createElement('option')
        dateOption.setAttribute('value', event.dateKey)
        dateOption.innerText = event.dateKey
        dateSelect.appendChild(dateOption)
        dateSelect.addEventListener('change', () => {
            const selectedDate = dateSelect.options[dateSelect.selectedIndex].value
            const selectedDateEvents = EVENT_LIST.filter(item => item.dateKey === selectedDate)

            if (selectedDateEvents.length) {
                selectedDateIndex = dateSelect.selectedIndex
                RenderEventList(selectedDateEvents)
            } else {
                selectedDateIndex = 0
                RenderEventList(EVENT_LIST)
            }
        })

        pageWrapper.appendChild(dateSelect);
    })
}
