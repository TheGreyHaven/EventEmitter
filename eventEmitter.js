// Resources
// https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/
// https://betterprogramming.pub/how-to-create-your-own-event-emitter-in-javascript-fbd5db2447c4
// https://www.youtube.com/watch?v=X-AhceP6jpA&ab_channel=StephenGrider
// https://stackoverflow.com/questions/3393686/only-fire-an-event-once
// https://nodejs.org/api/events.html


class EventEmitter {

	listeners = {};


	/** Adds the listener function to the end of the listeners array for the event named eventName. 
	 * Multiple calls passing the same combination of eventName and listener will result in the listener being added, 
	 * and called, multiple times. 
	 */
	on(eventName, callback) {
		this.listeners[eventName] = this.listeners[eventName] || []; // The array allows for multiple listeners
		this.listeners[eventName].push(callback);
	}

	// Removes the specified listener from the listener array for the event named eventName.
	off(eventName, listenerToRemove) {
		const filterListeners = (listener) => listener !== listenerToRemove;
		this.listeners[eventName] = this.listeners[eventName].filter(filterListeners);
	}


	/** Adds a one-time listener function for the event named 'eventName'. 
	 * The next time eventName is triggered, this listener is removed and then invoked
	 */
	once(eventName, callback) {
		this.listeners[eventName] = this.listeners[eventName] || [];
		const onceWrapper = () => {
			callback();
			this.off(eventName, onceWrapper);
		}
		this.listeners[eventName].push(onceWrapper);
	}


	/** Synchronously calls each of the listeners registered for the event named eventName, 
	 * in the order they were registered, passing the supplied arguments to each.
	 */
	emit(eventName, ...rest) {

		if (this.listeners[eventName]) {
			this.listeners[eventName].forEach(cb => {
				cb(...rest);
			});
		}
	}
}



// const ee = new EventEmitter();

// function c1() {
// 	console.log('Hello!');
// }

// function c2() {
// 	console.log('Hola!');
// }


// function c3() {
// 	console.log('Just once!');
// }

// ee.on('test-event1', c1);
// ee.on('test-event2', c2);
// ee.emit('test-event1');
// ee.emit('test-event2');
// ee.off('test-event2', c2);
// ee.emit('test-event1');
// ee.emit('test-event2');



// ee.once('once', c3);


// ee.emit('once');
// ee.emit('once');
// ee.emit('once');




