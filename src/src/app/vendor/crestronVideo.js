/**
 * @license
 * @namespace SchedulingPanel
 * @version 0.1
 **/

var CrestronVideo = CrestronVideo || {};

CrestronVideo = ( function ( ) {
    'use strict';

    var respIncorrectParam = { error: 'Incorrect parameters' },
        _callbacks = {},
        _listeners = {},
        _cacheData = {};

    function isString ( param ) {
        return (typeof param === 'string' || param instanceof String );
    }

    function isBoolean ( param ) {
        return (typeof param === 'boolean' || param instanceof Boolean );
    }

    function isFunction ( callback ) {
        return callback && ( callback instanceof Function );
    }

    function doErrorParamsCallback ( callback ) {
        if ( isFunction ( callback ) )
            callback( false, respIncorrectParam );
        console.log("Invalid params");
    }

    function registerCallback (action, callback) {
        var timestamp = null; 

        if ( isFunction( callback ) ) {
            timestamp = Date.now( ) + '';
            _callbacks[timestamp] = callback;
        }

        console.log('Register Callback: ' + timestamp);
        return timestamp;
    }

    function doCallbackOnPublishAction ( callbackId, success, resp ) {
        var data = {};

        console.log('SchedulingPanel Action Recive: ' + callbackId + '  - success: ' + success + ' - resp: '  + ' - ' + resp );
        if ( callbackId && _callbacks[callbackId] ) {
            try {
                data = JSON.parse( resp );
            } catch ( err ) {
                console.log('Invalid JSON: ' + resp);
            }
            _callbacks[callbackId]( success, data );
            delete _callbacks[callbackId];
        }
    }

    function doCallbackOnPushishData ( type, resp, hideLog ) {
        var data = { },
            listeners = _listeners[ type ];
            
        console.log('SchedulingPanel Data Recive: ' + type + (hideLog ? '' : ' - resp: ' + resp ));
        try {
            data = JSON.parse( resp );
        } catch (err) {
            console.log('Invalid JSON: ' + resp);
        }

        if ( listeners ) {
            for(var i = 0; i < listeners.length; i++ ) {
                listeners[i] ( data );
            }
        }
        _cacheData[ type ] = data;
    }

    function addListener( type, callback, cache ) {
        _listeners[type] = _listeners[type] || [];
        _listeners[type].push( callback );
        if ( cache && _cacheData[type] )
            callback (_cacheData[type]);
    }

    function removeListener ( type, callback ) {
        var curList = _listeners[type];
        if (curList) {
            for (var i = curList.length; i >= 0; i-- ) {
                if ( curList[i] === callback ) {
                    curList.splice(i, 1);
                    break;
                }
            }
        }
    }

    return {
        webUI: {
            subscribe: {
                data: {
                    stream: function ( callback, cache ) {
                        addListener('stream', callback, cache === false ? cache : true );
                    }
                }
            },
            unsubscribe: {
                data: {
                    stream: function ( callback ) {
                        removeListener( 'stream', callback);
                    }
                }
            },
            publish: {
                data: {
                    stream: function ( resp ) {
                        doCallbackOnPushishData( 'stream', resp , true);
                    }
                }
            },
            send: {
                action: {
                    start: function ( ) {
                        BlackbirdVideo.start();
                    },
                    stop: function ( ) {
                        BlackbirdVideo.stop();
                    },
                    sendNextChunk: function ( index ) {
                        BlackbirdVideo.sendNextChunk( index );
                    }
                }
            }
        }
    }
})();