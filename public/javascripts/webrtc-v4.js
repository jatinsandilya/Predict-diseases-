(function() {


    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // WebRTC Simple Calling API + Mobile
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    var PHONE = window.PHONE = function(config) {
      var PHONE = function() {};
      try{
        var pubnub = new PubNub(config);
      }catch(e){
        console.log(e)
      }
      var pubkey = config.publishKey || 'demo';
      var snapper = function() {
        return ' '
      }
      var subkey = config.subscribeKey || 'demo';
      var sessionid = PubNub.generateUUID();
      var mystream = null;
      var myvideo = document.createElement('video');
      var myconnection = false;
      var mediaconf = config.media || {
        audio: true,
        video: true
      };
      var conversations = {};
      /**
       * Some Common function we'll use in this library
       */

      var isItArray = function(arg) {
        return !!arg && (Array.isArray && Array.isArray(arg) || typeof(arg.length) === "number")
      };

      var each = function(o, f) {
        if (!o || !f) return;

        if (isItArray(o))
          for (var i = 0, l = o.length; i < l;)
            f.call(o[i], o[i], i++);
        else
          for (var i in o)
            o.hasOwnProperty &&
            o.hasOwnProperty(i) &&
            f.call(o[i], i, o[i]);
      }


      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // RTC Peer Connection Session (one per call)
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      var PeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // ICE (many route options per call)
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      var IceCandidate =
        window.mozRTCIceCandidate ||
        window.RTCIceCandidate;

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Media Session Description (offer and answer per call)
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      var SessionDescription =
        window.RTCSessionDescription ||
        window.mozRTCSessionDescription ||
        window.webkitRTCSessionDescription;

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Local Microphone and Camera Media (one per device)
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // STUN Server List Configuration (public STUN list)
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      var rtcconfig = {
        iceServers: [{
          "url": navigator.mozGetUserMedia ? "stun:stun.services.mozilla.com" : navigator.webkitGetUserMedia ? "stun:stun.l.google.com:19302" : "stun:23.21.150.121"
        }, {
          url: "stun:stun.l.google.com:19302"
        }, {
          url: "stun:stun1.l.google.com:19302"
        }, {
          url: "stun:stun2.l.google.com:19302"
        }, {
          url: "stun:stun3.l.google.com:19302"
        }, {
          url: "stun:stun4.l.google.com:19302"
        }, {
          url: "stun:23.21.150.121"
        }, {
          url: "stun:stun01.sipphone.com"
        }, {
          url: "stun:stun.ekiga.net"
        }, {
          url: "stun:stun.fwdnet.net"
        }, {
          url: "stun:stun.ideasip.com"
        }, {
          url: "stun:stun.iptel.org"
        }, {
          url: "stun:stun.rixtelecom.se"
        }, {
          url: "stun:stun.schlund.de"
        }, {
          url: "stun:stunserver.org"
        }, {
          url: "stun:stun.softjoys.com"
        }, {
          url: "stun:stun.voiparound.com"
        }, {
          url: "stun:stun.voipbuster.com"
        }, {
          url: "stun:stun.voipstunt.com"
        }, {
          url: "stun:stun.voxgratia.org"
        }, {
          url: "stun:stun.xten.com"
        }]
      };

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Custom STUN Options
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      function add_servers(servers) {
        if (servers.constructor === Array)
          [].unshift.apply(rtcconfig.iceServers, servers);
        else rtcconfig.iceServers.unshift(servers);
      }

      if ('servers' in config) add_servers(config.servers);

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // PHONE Events
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      var messagecb = function() {};
      var readycb = function() {};
      var unablecb = function() {};
      var debugcb = function() {};
      var connectcb = function() {};
      var disconnectcb = function() {};
      var reconnectcb = function() {};
      var callstatuscb = function() {};
      var receivercb = function() {};

      PHONE.message = function(cb) {
        messagecb = cb
      };
      PHONE.ready = function(cb) {
        readycb = cb
      };
      PHONE.unable = function(cb) {
        unablecb = cb
      };
      PHONE.callstatus = function(cb) {
        callstatuscb = cb
      };
      PHONE.debug = function(cb) {
        debugcb = cb
      };
      PHONE.connect = function(cb) {
        connectcb = cb
      };
      PHONE.disconnect = function(cb) {
        disconnectcb = cb
      };
      PHONE.reconnect = function(cb) {
        reconnectcb = cb
      };
      PHONE.receive = function(cb) {
        receivercb = cb
      };

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Add/Get Conversation - Creates a new PC or Returns Existing PC
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      function get_conversation(number) {
        var talk = conversations[number] || (function(number) {
          var talk = {
            number: number,
            status: '',
            image: document.createElement('img'),
            started: +new Date,
            imgset: false,
            imgsent: 0,
            pc: new PeerConnection(rtcconfig),
            closed: false,
            usermsg: function() {},
            thumb: null,
            connect: function() {},
            end: function() {}
          };

          // Setup Event Methods
          talk.pc.onaddstream = config.onaddstream || onaddstream;
          talk.pc.onicecandidate = onicecandidate;
          talk.pc.number = number;

          // Disconnect and Hangup
          talk.hangup = function(signal) {
            if (talk.closed) return;

            talk.closed = true;
            talk.imgset = false;
            clearInterval(talk.snapi);

            if (signal !== false) transmit(number, {
              hangup: true
            });

            talk.end(talk);
            talk.pc.close();
            close_conversation(number);
          };

          // Stop Audio/Video Stream
          talk.stop = function() {
            if (mystream) mystream.stop();
            return mystream;
          };

          // Sending Messages
          talk.send = function(message) {
            transmit(number, {
              usermsg: message
            });
          };

          // Sending Stanpshots
          talk.snap = function() {
            var pic = snapper();
            if (talk.closed) clearInterval(talk.snapi);
            transmit(number, {
              thumbnail: pic
            });
            var img = document.createElement('img');
            img.src = pic;
            return {
              data: pic,
              image: img
            };
          };
          talk.snapi = setInterval(function() {
            if (talk.imgsent++ > 1) return clearInterval(talk.snapi);
            talk.snap();
          }, 1500);
          talk.snap();

          // Nice Accessor to Update Disconnect & Establis CBs
          talk.thumbnail = function(cb) {
            talk.thumb = cb;
            return talk
          };
          talk.ended = function(cb) {
            talk.end = cb;
            return talk
          };
          talk.connected = function(cb) {
            talk.connect = cb;
            return talk
          };
          talk.message = function(cb) {
            talk.usermsg = cb;
            return talk
          };

          // Add Local Media Streams Audio Video Mic Camera
          talk.pc.addStream(mystream);

          // Notify of Call Status
          update_conversation(talk, 'connecting');

          // Return Brand New Talk Reference
          conversations[number] = talk;
          return talk;
        })(number);

        // Return Existing or New Reference to Caller
        return talk;
      }

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Remove Conversation
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      function close_conversation(number) {
        conversations[number] = null;
        delete conversations[number];
      }

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Notify of Call Status Events
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      function update_conversation(talk, status) {
        talk.status = status;
        callstatuscb(talk);
        return talk;
      }

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Get Number
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      PHONE.number = function() {
        return config.number;
      };

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      // Get Call History
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      PHONE.history = function(settings) {
        pubnub.history({
            channel: settings[number],
          }, function(status, call_history) {

            settings['history'](call_history[0]);
          }
        );
    };



    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Make Call - Create new PeerConnection
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    PHONE.dial = function(number, servers) {
      if (!!servers) add_servers(servers);
      var talk = get_conversation(number);
      var pc = talk.pc;

      // Prevent Repeat Calls
      if (talk.dialed) return false;
      talk.dialed = true;

      // Send SDP Offer (Call)
      pc.createOffer(function(offer) {
        transmit(number, {
          hangup: true
        });
        transmit(number, offer, 2);
        pc.setLocalDescription(offer, debugcb, debugcb);
      }, debugcb);

      // Return Session Reference
      return talk;
    };

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Send Image Snap - Send Image Snap to All Calls or a Specific Call
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    PHONE.snap = function(message, number) {
      if (number) return get_conversation(number).snap(message);
      var pic = {};
      each(conversations, function(number, talk) {
        pic = talk.snap();
      });
      return pic;
    };

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Send Message - Send Message to All Calls or a Specific Call
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    PHONE.send = function(message, number) {
      if (number) return get_conversation(number).send(message);
      each(conversations, function(number, talk) {
        talk.send(message);
      });
    };

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // End Call - Close All Calls or a Specific Call
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    PHONE.hangup = function(number) {
      if (number) return get_conversation(number).hangup();
      each(conversations, function(number, talk) {
        talk.hangup();
      });
    };

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Auto-hangup on Leave
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    PubNub.bind('unload,beforeunload', window, function() {
      if (PHONE.goodbye) return true;
      PHONE.goodbye = true;

      each(conversations, function(number, talk) {
        var mynumber = config.number;
        var packet = {
          hangup: true
        };
        var message = {
          packet: packet,
          id: sessionid,
          number: mynumber
        };
        var client = new XMLHttpRequest();
        var url = 'https://pubsub.pubnub.com/publish/' +
          pubkey + '/' +
          subkey + '/0/' +
          number + '/0/' +
          JSON.stringify(message);

        client.open('GET', url, false);
        client.send();
        talk.hangup();
      });

      return true;
    });

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Grab Local Video Snapshot
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function snapshots_setup(stream) {
      var video = myvideo;
      var canvas = document.createElement('canvas');
      var context = canvas.getContext("2d");
      var snap = {
        width: 240,
        height: 180
      };

      // Video Settings
      video.width = snap.width;
      video.height = snap.height;
      video.src = URL.createObjectURL(stream);
      video.volume = 0.0;
      video.play();

      // Canvas Settings
      canvas.width = snap.width;
      canvas.height = snap.height;

      // Capture Local Pic
      snapper = function() {
        try {
          context.drawImage(video, 0, 0, snap.width, snap.height);
        } catch (e) {}
        return canvas.toDataURL('image/jpeg', 0.30);
      };

      PHONE.video = video;
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Visually Display New Stream
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function onaddstream(obj) {
      var vid = document.createElement('video');
      var stream = obj.stream;
      var number = (obj.srcElement || obj.target).number;
      var talk = get_conversation(number);

      vid.setAttribute('autoplay', 'autoplay');
      vid.src = URL.createObjectURL(stream);

      talk.video = vid;
      talk.connect(talk);
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // On ICE Route Candidate Discovery
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function onicecandidate(event) {
      if (!event.candidate) return;
      transmit(this.number, event.candidate);
    };

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Listen For New Incoming Calls
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function subscribe() {
      // Add Listener
      pubnub.addListener({
        status: function(statusEvent) {
          if (statusEvent.category === "PNConnectedCategory") { //connect
            onready(true);
          }
          if (statusEvent.category === "PNReconnectedCategory") { //reconnect
            reconnectcb();
          }
          if (statusEvent.category === "PNNetworkDownCategory") { //disconnect
            disconnectcb();
          }

        },
        message: function(message) {
          // handle message
          receive(message.message)
        }
      });
      // Subscribe to channel
      pubnub.subscribe({
        channels: [config.number]
      });
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // When Ready to Receive Calls
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function onready(subscribed) {
      if (subscribed) myconnection = true;
      if (!(mystream && myconnection)) return;

      connectcb();
      readycb();
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Prepare Local Media Camera and Mic
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function getusermedia() {
      navigator.getUserMedia(mediaconf, function(stream) {
        if (!stream) return unablecb(stream);
        console.log("setting up stream");
        window.mystream = mystream = stream;
        snapshots_setup(stream);
        onready();
        subscribe();
      }, function(info) {
        debugcb(info);
        return unablecb(info);
      });
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Send SDP Call Offers/Answers and ICE Candidates to Peer
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function transmit(phone, packet, times, time) {
      if (!packet) return;
      var number = config.number;
      var message = {
        packet: packet,
        id: sessionid,
        number: number
      };
      debugcb(message);
      pubnub.publish({
        channel: phone,
        message: message
      });

      // Recurse if Requested for
      if (!times) return;
      time = time || 1;
      if (time++ >= times) return;
      setTimeout(function() {
        transmit(phone, packet, times, time);
      }, 150);
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // SDP Offers & ICE Candidates Receivable Processing
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function receive(message) {
      // Debug Callback of Data to Watch
      debugcb(message);

      // Get Call Reference
      var talk = get_conversation(message.number);

      // Ignore if Closed
      if (talk.closed) return;

      // User Message
      if (message.packet.usermsg) {
        messagecb(talk, message.packet.usermsg);
        return talk.usermsg(talk, message.packet.usermsg);
      }

      // Thumbnail Preview Image
      if (message.packet.thumbnail) return create_thumbnail(message);

      // If Hangup Request
      if (message.packet.hangup) return talk.hangup(false);

      // If Peer Calling Inbound (Incoming)
      if (message.packet.sdp && !talk.received) {
        talk.received = true;
        receivercb(talk);
      }

      // Update Peer Connection with SDP Offer or ICE Routes
      if (message.packet.sdp) add_sdp_offer(message);
      else add_ice_route(message);
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Create Remote Friend Thumbnail
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function create_thumbnail(message) {
      var talk = get_conversation(message.number);
      talk.image.src = message.packet.thumbnail;

      // Call only once
      if (!talk.thumb) return;
      if (!talk.imgset) talk.thumb(talk);
      talk.imgset = true;
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Add SDP Offer/Answers
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function add_sdp_offer(message) {
      // Get Call Reference
      var talk = get_conversation(message.number);
      var pc = talk.pc;
      var type = message.packet.type == 'offer' ? 'offer' : 'answer';

      // Deduplicate SDP Offerings/Answers
      if (type in talk) return;
      talk[type] = true;
      talk.dialed = true;

      // Notify of Call Status
      update_conversation(talk, 'routing');

      // Add SDP Offer/Answer
      pc.setRemoteDescription(
        new SessionDescription(message.packet),
        function() {
          // Set Connected Status
          update_conversation(talk, 'connected');

          // Call Online and Ready
          if (pc.remoteDescription.type != 'offer') return;

          // Create Answer to Call
          pc.createAnswer(function(answer) {
            pc.setLocalDescription(answer, debugcb, debugcb);
            transmit(message.number, answer, 2);
          }, debugcb);
        }, debugcb
      );
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Add ICE Candidate Routes
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function add_ice_route(message) {
      // Leave if Non-good ICE Packet
      if (!message.packet) return;
      if (!message.packet.candidate) return;

      // Get Call Reference
      var talk = get_conversation(message.number);
      var pc = talk.pc;

      // Add ICE Candidate Routes
      pc.addIceCandidate(
        new IceCandidate(message.packet),
        debugcb,
        debugcb
      );
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Main - Request Camera and Mic
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


    // Some Custom Wrapper Functions

    PHONE.getCameraMic = function(){
      if(mystream){
        mystream.getVideoTracks()[0].start();
        mystream.getAudioTracks()[0].start();

      }else{
        getusermedia();
      }

    };

    PHONE.stopCameraMic = function(){
      console.log("Stoping Camara");
      if(! mystream){
        console.log("stream not found");
        return;
      }

      if(mystream.active){
        console.log("Found Active Stream");
        mystream.getVideoTracks()[0].stop();
        mystream.getAudioTracks()[0].stop();
      }
    };

    PHONE.toogleAudio = function(){
      if(! mystream){
        console.log("webrtc>> stream not found");
        return;
      }

      if(mystream.active){
        var audioTracks = mystream.getAudioTracks();
        for (var i = 0, l = audioTracks.length; i < l; i++) {
          audioTracks[i].enabled = !audioTracks[i].enabled;
        }
      }
    };

    PHONE.toogleVideo = function(){
      if(! mystream){
        console.log("webrtc>> stream not found");
        return;
      }

      if(mystream.active){
        var videoTracks = mystream.getVideoTracks();
        for (var i = 0, l = videoTracks.length; i < l; i++) {
          videoTracks[i].enabled = !videoTracks[i].enabled;
        }
      }
    };

    return PHONE;
  };


})();


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Request fresh TURN servers from XirSys
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function get_xirsys_servers() {
  var servers;
  $.ajax({
    type: 'POST',
    url: 'https://service.xirsys.com/getIceServers',
    data: {
      room: 'default',
      application: 'default',
      domain: 'sajjad.inov.io',
      ident: 'inovio',
      secret: '037f831a-734d-11e6-ba40-6e7222d6b30c',
    },
    success: function(res) {
      // res = JSON.parse(res);
      if (!res.e) servers = res.d.iceServers;
    },
    async: false
  });
  return servers;
}

/* WebRTC PubNub Controller
 * Author: Kevin Gleason
 * Date: July 15, 2015
 * Description: A wrapper library for the PubNub WebRTC SDK to make simple video
 *              functions a breeze to implement.
 *
 * TODO: make getVideoElement a native non-jQuery function
 *
 */

// (function() {
//
//     var CONTROLLER = window.CONTROLLER = function(phone) {
//       if (!window.phone) window.phone = phone;
//       var ctrlChan = controlChannel(phone.number());
//       var pubnub = phone.pubnub;
//       var userArray = [];
//       subscribe();
//
//       var CONTROLLER = function() {};
//
//       // Get the control version of a users channel
//       function controlChannel(number) {
//         return number + "-ctrl";
//       }
//
//       // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//       // Setup Phone and Session callbacks.
//       // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//       var readycb = function() {};
//       var unablecb = function() {};
//       var receivecb = function(session) {};
//       var videotogglecb = function(session, isEnabled) {};
//       var audiotogglecb = function(session, isEnabled) {};
//
//       CONTROLLER.ready = function(cb) {
//         readycb = cb
//       };
//       CONTROLLER.unable = function(cb) {
//         unablecb = cb
//       };
//       CONTROLLER.receive = function(cb) {
//         receivecb = cb
//       };
//       CONTROLLER.videoToggled = function(cb) {
//         videotogglecb = cb
//       };
//       CONTROLLER.audioToggled = function(cb) {
//         audiotogglecb = cb
//       };
//
//       phone.ready(function() {
//         readycb()
//       });
//       phone.unable(function() {
//         unablecb()
//       });
//       phone.receive(function(session) {
//         manage_users(session);
//         receivecb(session);
//       });
//
//       /* Require some boolean form of authentication to accept a call
//       var authcb    = function(){};
//       CONTROLLER.answerCall = function(session, auth, cb){
//       	auth(acceptCall(session, cb), session);
//       }
//
//       function acceptCall(session, cb){ // Return function bound to session that needs a boolean.
//       	return function(accept) {
//       		if (accept) cb(session);
//       		else phone.hangup(session.number);
//       	}
//       }*/
//
//       // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//       // Setup broadcasting, your screen to all.
//       // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//       var streamreceivecb = function(m) {};
//       var streamprescb = function(m) {};
//       var stream_name = "";
//
//
//       CONTROLLER.streamPresence = function(cb) {
//         streamprescb = cb;
//       }
//       CONTROLLER.streamReceive = function(cb) {
//         streamreceivecb = cb;
//       }
//
//       function broadcast(vid) {
//         var video = document.createElement('video');
//         video.src = URL.createObjectURL(phone.mystream);
//         video.volume = 0.0;
//         video.play();
//         video.setAttribute('autoplay', 'autoplay');
//         video.setAttribute('data-number', phone.number());
//         vid.style.cssText = "-moz-transform: scale(-1, 1); \
// 						 	-webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
// 							transform: scale(-1, 1); filter: FlipH;";
//         vid.appendChild(video);
//       };
//
//       function stream_subscribe(name) {
//         var ch = (name ? name : phone.number()) + "-stream";
//
//         pubnub.addListener({
//           status: function(statusEvent) {
//             if (statusEvent.category === "PNConnectedCategory") {
//               stream_name = ch;
//               console.log("Streaming channel " + ch);
//             }
//           },
//           message: function(message) {
//             // handle message
//             streamreceivecb(message.message);
//           },
//           presence: function(presenceEvent) {
//             // handle presence
//             streamprescb(presenceEvent);
//           }
//         })
//
//         pubnub.subscribe({
//           channels: [ch]
//         });
//       }
//
//       CONTROLLER.stream = function() {
//         stream_subscribe();
//       }
//
//       CONTROLLER.joinStream = function(name) {
//         stream_subscribe(name);
//         publishCtrl(controlChannel(name), "userJoin", phone.number());
//       }
//
//       CONTROLLER.leaveStream = function(name) {
//         var ch = (name ? name : phone.number()) + "-stream";
//         pubnub.unsubscribe({
//           channels: [ch],
//         });
//       }
//
//       CONTROLLER.send = function(message, number) {
//         if (phone.oneway) return stream_message(message);
//         phone.send(message, number);
//       };
//
//       function stream_message(message) {
//         if (!stream_name) return; // Not in a stream
//         pubnub.publish({
//             channel: stream_name,
//             message: msg
//           },
//           function(m) {
//             console.log(m)
//           }
//         );
//       }
//
//
//       // Give it a div and it will set up the thumbnail image
//       CONTROLLER.addLocalStream = function(streamHolder) {
//         broadcast(streamHolder);
//       };
//
//       CONTROLLER.dial = function(number, servers) { // Authenticate here??
//
//         //==================Special Modification======================
//         //=== Modify the library to get xirsys servers directly ======
//         var servers = get_xirsys_servers();
//         //==================Special Modification End==================
//         //
//         var session = phone.dial(number, servers); // Dial Number
//         if (!session) return; // No Duplicate Dialing Allowed
//       };
//
//       CONTROLLER.hangup = function(number) {
//         if (number) {
//           if (phone.oneway) CONTROLLER.leaveStream(number);
//           phone.hangup(number);
//           return publishCtrl(controlChannel(number), "userLeave", phone.number())
//         }
//         if (phone.oneway) CONTROLLER.leaveStream();
//         phone.hangup();
//         for (var i = 0; i < userArray.length; i++) {
//           var cChan = controlChannel(userArray[i].number);
//           publishCtrl(cChan, "userLeave", phone.number());
//         }
//       };
//
//       CONTROLLER.toggleAudio = function() {
//         var audio = false;
//         var audioTracks = window.phone.mystream.getAudioTracks();
//         for (var i = 0, l = audioTracks.length; i < l; i++) {
//           audioTracks[i].enabled = !audioTracks[i].enabled;
//           audio = audioTracks[i].enabled;
//         }
//         publishCtrlAll("userAudio", {
//           user: phone.number(),
//           audio: audio
//         }); // Stream false if paused
//         return audio;
//       };
//
//       CONTROLLER.toggleVideo = function() {
//         var video = false;
//         var videoTracks = window.phone.mystream.getVideoTracks();
//         for (var i = 0, l = videoTracks.length; i < l; i++) {
//           videoTracks[i].enabled = !videoTracks[i].enabled;
//           video = videoTracks[i].enabled;
//         }
//         publishCtrlAll("userVideo", {
//           user: phone.number(),
//           video: video
//         }); // Stream false if paused
//         return video;
//       };
//
//       CONTROLLER.isOnline = function(number, cb) {
//         pubnub.here_now({
//             channel: number
//           }, function(m) {
//             console.log(m); // TODO Comment out
//             cb(m.occupancy != 0);
//           }
//         );
//     };
//
//     CONTROLLER.isStreaming = function(number, cb) {
//       CONTROLLER.isOnline(number + "-stream", cb);
//     };
//
//     CONTROLLER.getVideoElement = function(number) {
//       return $('*[data-number="' + number + '"]');
//     }
//
//     function manage_users(session) {
//       if (session.number == phone.number()) return; // Do nothing if it is self.
//       var idx = findWithAttr(userArray, "number", session.number); // Find session by number
//       if (session.closed) {
//         if (idx != -1) userArray.splice(idx, 1)[0]; // User leaving
//       } else { // New User added to stream/group
//         if (idx == -1) { // Tell everyone in array of new user first, then add to array.
//           if (!phone.oneway) publishCtrlAll("userJoin", session.number);
//           userArray.push(session);
//         }
//       }
//       userArray = userArray.filter(function(s) {
//         return !s.closed;
//       }); // Clean to only open talks
//       // console.log(userArray);
//     }
//
//     function add_to_stream(number) {
//       phone.dial(number);
//     }
//
//     function add_to_group(number) {
//       var session = phone.dial(number, get_xirsys_servers()); // Dial Number
//       if (!session) return; // No Dupelicate Dialing Allowed
//     }
//
//     function publishCtrlAll(type, data) {
//       for (var i = 0; i < userArray.length; i++) {
//         var cChan = controlChannel(userArray[i].number);
//         publishCtrl(cChan, type, data);
//       }
//     }
//
//     function publishCtrl(ch, type, data) {
//       // console.log("Pub to " + ch);
//       var msg = {
//         type: type,
//         data: data
//       };
//       pubnub.publish({
//           channel: ch,
//           message: msg
//         }, function(m) {
//           console.log(m)
//         }
//       );
//   }
//
//   function subscribe() {
//
//     pubnub.addListener({
//       status: function(statusEvent) {
//         if (statusEvent.category === "PNConnectedCategory") {
//           console.log("Subscribed to channel " + ctrlChan);
//         }
//       },
//       message: function(message) {
//         // handle message
//         receive(message.message);
//       }
//     });
//
//     pubnub.subscribe({
//       channels: [ctrlChan]
//     });
//   }
//
//   function receive(m) {
//     switch (m.type) {
//       case "userCall":
//         callAuth(m.data);
//         break;
//       case "userJoin":
//         if (phone.oneway) {
//           add_to_stream(m.data);
//         } // JOIN STREAM HERE!
//         else add_to_group(m.data);
//         break;
//       case "userLeave":
//         var idx = findWithAttr(userArray, "number", m.data);
//         if (idx != -1) userArray.splice(idx, 1)[0];
//         break;
//       case "userVideo":
//         var idx = findWithAttr(userArray, "number", m.data.user);
//         var vidEnabled = m.data.video;
//         if (idx != -1) videotogglecb(userArray[idx], vidEnabled);
//         break;
//       case "userAudio":
//         var idx = findWithAttr(userArray, "number", m.data.user);
//         var audEnabled = m.data.audio;
//         if (idx != -1) audiotogglecb(userArray[idx], audEnabled);
//         break;
//     }
//     // console.log(m);
//   }
//
//   function findWithAttr(array, attr, value) {
//     for (var i = 0; i < array.length; i += 1) {
//       if (array[i][attr] === value) {
//         return i;
//       }
//     }
//     return -1;
//   }
//
//   return CONTROLLER;
// }
//
// })();
