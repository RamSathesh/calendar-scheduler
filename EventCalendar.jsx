// Install FullCalendar dependencies using npm before running this code:
// npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction @mui/material @mui/icons-material

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Popover, TextField } from '@mui/material';
import './EventCalendar.css';

const EventScheduler = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting', start: '2024-01-01T10:00:00', end: '2024-01-01T12:00:00' },
    { id: 2, title: 'Workshop', start: '2024-01-03T14:00:00', end: '2024-01-03T16:00:00' },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const handleDateSelect = (selectInfo) => {
    setNewEvent({
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setAnchorEl(selectInfo.jsEvent.target);
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Do you want to delete the event '${clickInfo.event.title}'?`)) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: Date.now(),
          title: newEvent.title,
          start: newEvent.start,
          end: newEvent.end,
        },
      ]);
      handleClosePopover();
    }
  };

  return (
    <div className="scheduler-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <div className="popover-content">
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEvent}
            style={{ marginRight: '10px' }}
          >
            Add Event
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClosePopover}>
            Cancel
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default EventScheduler;

