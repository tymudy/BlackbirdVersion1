/**
 * @license
 * Copyright (c) 2016 Crestron Electronics. All rights reserved.
 * 
 * The control system functions, listeners are defined over here.
 * @namespace crestron
 **/
var Crestron = Crestron || {};

Crestron = (function () {
    'use strict';

    var RCB = "r";
    var SERIAL = "s";
    var ANALOG = "a";
    var DIGITAL = "d";
    var _isBlackbird = (typeof Blackbird !== "undefined" ? true : false); //Check only once
    var _isWebkit = (typeof window.webkit !== "undefined" ? true : false); //Check only once
	
	/*
	 * This is a timeout parameter to simulate the control system response delay in
	 * local browser 
	 */
    var simulateCSTime = 0;


    /**
     * Update Analog value to the control system.
     *
	 * @function crestron#updateAnalog
     * @param {number} joinId - Analog joinId.
     * @param {number} aVal - Analog value.
     **/
    function updateAnalog(joinId, aVal) {
        if (_isBlackbird) {
            Blackbird.updateAnalogJoin(joinId, aVal);
        } else if (_isWebkit) {
            window.webkit.messageHandlers.handleJoinAnalogSend.postMessage({
                'joinNumber': joinId,
                'joinValue': aVal
            });
        } else {
            setTimeout(function () {
                handleAnalogJoinChanged(joinId, aVal);
            }, Crestron.UI.JoinService.simulateCSTime);
        }
    }

    /**
     * Update Serial value to the control system.
     *
	 * @function crestron#updateSerial
     * @param {number} joinId - Serial joinId.
     * @param {number} sVal - Serial value.
     **/
    function updateSerial(joinId, sVal) {
        if (_isBlackbird) {
            Blackbird.updateSerialJoin(joinId, sVal);
        } else if (_isWebkit) {
            window.webkit.messageHandlers.handleJoinSerialSend.postMessage({
                'joinNumber': joinId,
                'joinValue': sVal
            });
        } else {
            setTimeout(function () {
                handleSerialJoinChanged(joinId, sVal);
            }, Crestron.UI.JoinService.simulateCSTime);
        }
    }

    /**
     * Update Digital value to the control system.
     *
	 * @function crestron#updateDigital
     * @param {number} joinId - Serial joinId.
     * @param {number} dVal - Serial value.
     **/
    function updateDigital(joinId, dVal) {
        if (_isBlackbird) {
            Blackbird.updateDigitalJoin(joinId, dVal);
        } else if (_isWebkit) {
            window.webkit.messageHandlers.handleJoinDigitalSend.postMessage({
                'joinNumber': joinId,
                'joinValue': dVal
            });
        } else {
            setTimeout(function () {
                handleDigitalJoinChanged(joinId, dVal);
            }, Crestron.UI.JoinService.simulateCSTime);
        }
    }
	
	

	
	
    /**
     * Listener related functions are defined over here.
     *
	 * @function crestron#createListener
     * @param {string} type - Type can be analog, digital or serial.
     **/
    function createListener(type) {
		var _joinListeners = {}; // private
		var _cachedValues = [];

        /**
         * Call back the respective function added to the listener for the
         * respective joinId.
         *
		 * @function crestron#publish
         * @param {number} joinId - Join Id.
         * @param {number} joinValue - Join value.
         **/
        function publish(joinId, joinValue, extra1, extra2) {
			_cachedValues[joinId] = joinValue;
            if (joinId in _joinListeners) {
                var listeners = _joinListeners[joinId];
                var count = listeners.length;
                while (count--) {
                    listeners[count](joinId, joinValue, extra1, extra2);
                }
            }
        }

        /**
         * Subscribe the listener to a particular joinId.
         *
		 * @function crestron#addListener
         * @param {number} joinId - Join Id.
         * @param {number} joinValue - Join value.
         **/
        function addListener(joinId, listener) {
			// TODO use WeakSet for listeners.  Need to find way to iterate though.
            if (!(joinId in _joinListeners)) {
                var newListenerList = [];
                newListenerList.push(listener);
                _joinListeners[joinId] = newListenerList;
            } else {
                var currListener = _joinListeners[joinId];
                if (!(listener in currListener)) {
                    currListener.push(listener);
                }
            }
			
			listener(joinId, getCachedValue(joinId));	
        }

        /**
         * Remove the listener to a particular joinId.
         *
		 * @function crestron#removeListener
         * @param {number} joinId - Join Id.
         * @param {function} listener - Callback function.
         **/
        function removeListener(joinId, listener) {
            if (joinId in _joinListeners) {
                var currListener = _joinListeners[joinId];
				var idx = currListener.indexOf(listener);
                if (idx >= 0) {
                    currListener.splice(idx,1);
                }
            }
        }

        /**
         * Call the appropriate method based on type.
         *
		 * @function crestron#updateJoin
         * @param {number} joinId - Join Id.
         * @param {function} listener - Callback function.
         **/
        function updateJoin(joinId, val) {
            switch (type) {
                case SERIAL:
                    updateSerial(joinId, val);
                    break;
                case ANALOG:
					// TODO put in throttling. 
                    updateAnalog(joinId, val);
                    break;
                case DIGITAL:
                    updateDigital(joinId, val);
                    break;
                default:
                    break;
            }
        }
		
		/**
		 * Get the cached value of a given joinId
		 *
		 * @function crestron#getCachedValue
		 * @param {number} joinId - JoinId
		 **/
		function getCachedValue(joinId) {
			var currValue = _cachedValues[joinId];
			if (currValue === undefined) {
				switch (type) {
					case SERIAL:
						currValue = "";
						break;
					case ANALOG:
						currValue = 0;
						break;
					case DIGITAL:
						currValue = false;
						break;
					default:
						break;
				}
            }				
			return currValue;
		}
		
		function getCache() {
			return _cachedValues;
		}	

        return {
			__getCache: getCache,
            subscribe: addListener,
            desubscribe: removeListener,
            publish: publish,
            updateCS: updateJoin
        };
    }

    return {
        UI: {
            JoinService: {
				RCB: RCB,
				SERIAL: SERIAL,
				ANALOG: ANALOG,
				DIGITAL: DIGITAL,
				simulateCSTime: simulateCSTime,			
                analogListener: new createListener(ANALOG),
                serialListener: new createListener(SERIAL),
                digitalListener: new createListener(DIGITAL)
            }
        }
    };
}());





//Blackbird Dispatcher Listeners -- Starts
function handleDigitalJoinChanged(joinId, joinValue) {
    Crestron.UI.JoinService.digitalListener.publish(joinId, joinValue);
}
//Called by BlackBird
function handleAnalogJoinChanged(joinId, joinValue) {
    var newVal = joinValue;
    if (joinValue < 0) {
        newVal = Math.abs(joinValue);
        newVal = 65535 - newVal;
    }
    Crestron.UI.JoinService.analogListener.publish(joinId, newVal);
}
//Called by BlackBird
function handleSerialJoinChanged(joinId, joinValue) {
    Crestron.UI.JoinService.serialListener.publish(joinId, joinValue);
}

// called by native code in blackbird
function handleRCBJoinChanged(joinId, terminalValue, terminalTime) {
	// terminalTime is in units of 10ms or 1/100th of a second. multiply by 10 to get to msec units. 
	Crestron.UI.JoinService.analogListener.publish(joinId, terminalValue, terminalTime * 10);
}

function handleJoinChanged(joinArray) {
	if (joinArray.constructor !== Array) {
		return;
	}
	for (var idx = 0, len = joinArray.length; idx < len ; idx++) {
		var joinType = joinArray[idx].t; 
		var joinValue = joinArray[idx].v;
		var joinId = joinArray[idx].id;
		if (!Number.isInteger(joinId)) { // TODO: better performing isInt() here http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
			continue;
		}
		switch (joinType) {
			case Crestron.UI.JoinService.RCB:
				var time = joinArray[idx].time;
				if (Number.isInteger(joinValue) && Number.isInteger(time)) {
					handleRCBJoinChanged(joinId, joinValue, time);
				}
				break;
			case Crestron.UI.JoinService.ANALOG:
				if (Number.isInteger(joinValue)) {
					handleAnalogJoinChanged(joinId, joinValue);
				}			
				break;
			case Crestron.UI.JoinService.DIGITAL:
				if (typeof(joinValue) === "boolean") {
					handleDigitalJoinChanged(joinId, joinValue);
				}
				break;
			case Crestron.UI.JoinService.SERIAL:
				if (typeof(joinValue) === "string") {
					handleSerialJoinChanged(joinId, joinValue);
				}
				break;			
			default:
				break;
		}
	}
}


