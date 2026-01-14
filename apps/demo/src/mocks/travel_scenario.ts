import type { ServerToClientMessage } from '@a2ui-renderer/react';

export const TRAVEL_SCENARIO: ServerToClientMessage[] = [
    // 1. Create Surface
    {
        createSurface: {
            surfaceId: 'travel-surface',
            catalogId: 'demo-catalog'
        }
    },
    // 2. Initial Skeleton (Loading State)
    {
        updateComponents: {
            surfaceId: 'travel-surface',
            components: [
                {
                    id: 'root',
                    component: 'Column',
                    children: ['header', 'loading-card']
                },
                {
                    id: 'header',
                    component: 'Heading',
                    text: 'Planning your trip to Paris...'
                },
                {
                    id: 'loading-card',
                    component: 'Card',
                    children: 'loading-text'
                },
                {
                    id: 'loading-text',
                    component: 'Text',
                    text: 'Searching for flights...'
                }
            ]
        }
    },
    // 3. Update: Found Flights (Replace loading card with meaningful content)
    {
        updateComponents: {
            surfaceId: 'travel-surface',
            components: [
                {
                    id: 'header',
                    component: 'Heading', // Update text
                    text: 'Trip to Paris, France 🇫🇷'
                },
                {
                    id: 'root',
                    component: 'Column',
                    children: ['header', 'flight-section', 'hotel-section'] // Add hotel section
                },
                {
                    id: 'flight-section',
                    component: 'Card',
                    children: ['flight-title', 'flight-row']
                },
                {
                    id: 'flight-title',
                    component: 'Text',
                    text: '✈️ Outbound Flight'
                },
                {
                    id: 'flight-row',
                    component: 'Row',
                    children: ['origin', 'arrow', 'dest', 'price']
                },
                {
                    id: 'origin',
                    component: 'Text',
                    text: 'SFO (10:00 AM)'
                },
                {
                    id: 'arrow',
                    component: 'Text',
                    text: '→'
                },
                {
                    id: 'dest',
                    component: 'Text',
                    text: 'CDG (5:00 PM)'
                },
                {
                    id: 'price',
                    component: 'Text',
                    text: '$850'
                },
                 {
                    id: 'hotel-section',
                    component: 'Card',
                    children: 'hotel-loading'
                },
                {
                    id: 'hotel-loading',
                    component: 'Text',
                    text: 'Checking hotels...'
                }
            ]
        }
    },
    // 4. Update: Found Hotel
    {
        updateComponents: {
            surfaceId: 'travel-surface',
            components: [
                {
                    id: 'hotel-section',
                    component: 'Card',
                    children: ['hotel-title', 'hotel-details']
                },
                {
                    id: 'hotel-title',
                    component: 'Text',
                    text: '🏨 Ritz Paris'
                },
                 {
                    id: 'hotel-details',
                    component: 'Text',
                    text: '5 nights • King Suite • $6,000 total'
                },
                {
                    id: 'root',
                    component: 'Column',
                    children: ['header', 'flight-section', 'hotel-section', 'confirm-btn']
                },
                {
                    id: 'confirm-btn',
                    component: 'Button',
                    label: 'Book Itinerary',
                    variant: 'primary',
                    action: { name: 'book_trip', context: { id: 'trip_123' } }
                }
            ]
        }
    }
];
