import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from '../'
import { localizer, getMessagesEs } from '../../helpers'
import { useEffect, useState } from 'react'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'

export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { openDateModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id) || (user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'while'
    }

    return { style }
  }

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event});
    openDateModal();
  }
  
  const onSelect = (event) => {
    setActiveEvent(event)
  }
  
  const onViewChanged = (event) => {
    console.log(event);
    localStorage.setItem('lastView', event );
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvent();
  }, [])
  

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{event: CalendarEvent}}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
