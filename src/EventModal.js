import { fromUnixTime } from 'date-fns';
import React, { useState } from 'react';

const EventModal = ({ event }) => {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const startDateUnixTimestamp = event['Start Date (YYYY-mm-dd)'];
    const startDate = startDateUnixTimestamp ? fromUnixTime(startDateUnixTimestamp).toString() : 'Not available';

    return (
        <div>
            <p className='cal-event-title cursor-pointer' onClick={() => setShowModal(true)}>{event.title.rendered}</p>
            {showModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white rounded-lg p-8 max-w-sm'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg font-bold'>{event.title.rendered}</h2>
                            <button className='text-gray-600 hover:text-gray-800' onClick={handleCloseModal}>
                                <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            </button>
                        </div>
                        <p>{event.Location}</p>
                        <small>{event['Host region']}</small>
                        <p>{startDate}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventModal;