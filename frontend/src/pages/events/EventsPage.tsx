import EventList from '../../components/EventAndExperience/EventList/EventList';
import EventDetail from '../../components/EventAndExperience/EventDetail/EventDetail';
import Workshop from '../../components/EventAndExperience/Workshop/Workshop';

const EventsPage = () => {
    return (
        <div>
            <EventList eventId={''} />
            <EventDetail eventId={''} />
            <Workshop />
            {/* More components related to events */}
        </div>
    );
};

export default EventsPage;
