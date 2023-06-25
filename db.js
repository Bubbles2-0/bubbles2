async function createEvent(name, organizer, location, eventDate, event_type, spots_left){
    const admin = require('firebase-admin');

    // Initialize the Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://bubbles-390717-default-rtdb.firebaseio.com/' // Replace with your Firebase project URL
    });
    
    // Create a reference to the events node in the database
    const eventsRef = admin.database().ref('events');
    
    // Define the data for the new field
    const eventData = {
            event_name : name,
            event_attendees : [organizer],
            location : location,
            date : eventDate,
            eventType : event_type,
            spotsLeft : spots_left,
            restrictions : {age : 20}
    };
    
    // Push the new data under the events node
    key = null
    try {
        snapshot = await eventsRef.push(eventData)
        console.log('New field created successfully:', snapshot.key);
        key = snapshot.key
    } catch (error) {
        console.error('Error creating new field:', error);
    }
    
    return key
    
}

// changes is dictionary, {fieldToUpdate : new_val}
function updateEvent(eventId, changes){
    const admin = require('firebase-admin');

    // Initialize the Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://bubbles-390717-default-rtdb.firebaseio.com/' // Replace with your Firebase project URL
    });
    
    // Create a reference to the events node in the database
    const eventsRef = admin.database().ref(`events/${eventId}`);
    
    // Define the data for the new field
    eventsRef.update(changes)
    
    
}

async function getRecords(){
    const admin = require('firebase-admin');

    // Initialize the Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://bubbles-390717-default-rtdb.firebaseio.com/' // Replace with your Firebase project URL
    });
    
    // Create a reference to the events node in the database
    const eventsRef = admin.database().ref(`events`);
    
    // Define the data for the new field
    snapshot = await eventsRef.get()
    console.log(snapshot)
    
}
