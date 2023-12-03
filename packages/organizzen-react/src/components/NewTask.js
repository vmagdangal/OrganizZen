import React, { useState, useEffect } from 'react'
import './NewTask.css'

function NewTask(props) {
    const [task, setTask] = useState({
        id: '',
        name: '',
        description: '',
        link: '',
        date: '',
        color: '',
        event: '',
    })

    function submitForm() {
        props.handleSubmit(selectedEvent, task)
        setTask({
            id: '',
            name: '',
            description: '',
            link: '',
            date: '',
            color: '',
            event: '',
        })
    }
    function handleChange(e) {
        const { name, value } = e.target
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
            event: selectedEvent,
        }))
    }

    const [popup, popupState] = useState(false)
    const togglePopup = () => {
        popupState(!popup)
    }

    const [eventOptions, setEventOptions] = useState([])
    const [selectedEvent, setEventSelect] = useState('')

    useEffect(() => {
        fetch('http://localhost:8000/events')
            .then((response) => response.json())
            .then((data) => {
                setEventOptions(data.events_list)
                setEventSelect(data.events_list[0].id)
            })
    }, [])

    const handleEventSelect = (e) => {
        setEventSelect(e.target.value)
        console.log('Selected Event ID:', e.target.value)
    }

    return (
        <>
            <button className="popupButton" onClick={togglePopup}>
                Add Task
            </button>

            {popup && (
                <div className="popupWindow">
                    <div className="overlay"></div>
                    <div className="popupContent">
                        <button id="popupClose" onClick={togglePopup}>
                            X
                        </button>
                        <h1>New Task</h1>
                        <form className="popupForm">
                            <label htmlFor="taskName">Name: </label>
                            <br></br>
                            <input
                                id="name"
                                name="name"
                                onChange={handleChange}
                            />
                            <br></br> <br></br>
                            <label htmlFor="taskDescription">
                                Description:{' '}
                            </label>
                            <br></br>
                            <input
                                id="description"
                                name="description"
                                onChange={handleChange}
                            />
                            <br></br> <br></br>
                            <label htmlFor="taskLink">Link (Optional): </label>
                            <br></br>
                            <input
                                id="link"
                                name="link"
                                onChange={handleChange}
                            />
                            <br></br> <br></br>
                            <label htmlFor="date">Deadline: </label>
                            <br></br>
                            <input
                                id="date"
                                type="date"
                                name="date"
                                onChange={handleChange}
                            />
                            <br></br> <br></br>
                            <label>
                                Event:
                                <br></br>
                                <select
                                    name="event"
                                    id="event"
                                    onChange={handleEventSelect}
                                    value={selectedEvent}
                                >
                                    {eventOptions.map((event) => (
                                        <option key={event.id} value={event.id}>
                                            {event.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br></br> <br></br>
                            <label htmlFor="color">
                                Label Color:
                                <br></br>
                                <select
                                    name="color"
                                    id="color"
                                    onChange={handleChange}
                                >
                                    <option key="none" value="none">
                                        None
                                    </option>
                                    <option key="red" value="red">
                                        Red
                                    </option>
                                    <option key="orange" value="orange">
                                        Orange
                                    </option>
                                    <option key="yellow" value="yellow">
                                        Yellow
                                    </option>
                                    <option key="green" value="green">
                                        Green
                                    </option>
                                    <option key="blue" value="blue">
                                        Blue
                                    </option>
                                    <option key="purple" value="purple">
                                        Purple
                                    </option>
                                    <option key="pink" value="pink">
                                        Pink
                                    </option>
                                    <option key="brown" value="brown">
                                        Brown
                                    </option>
                                </select>
                            </label>
                            <br></br> <br></br>
                            <input
                                type="submit"
                                value="Submit"
                                id="submitform"
                                onClick={submitForm}
                            />
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default NewTask
