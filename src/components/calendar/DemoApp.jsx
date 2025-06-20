import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid" // 플러그인
import React, { Component } from "react";



class CalenderTest extends Component {
    render() {
        return (
            <div className="App">
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    events={[
                        {title: '이벤트 테스트', date:'2025-06-20'}
                    ]}
                />
            </div>
        );
    }
}

export default CalenderTest;

