
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;



$(document).on('keydown', function ( e ) {
    if (e.which == 32) {  // 27 is the ESC key
      startButton(e);
    }

});
        if (!('webkitSpeechRecognition' in window)) {
          upgrade();
        } else {
          var recognition = new webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;

          recognition.onstart = function() {
            recognizing = true;
            console.log('Speech recognition service has started');
          };

          recognition.onerror = function(event) {
            console.log('Speech recognition error detected: ' + event.error);
          };
          recognition.onend = function() {
            console.log('Speech recognition service disconnected');
          };
          recognition.onresult = function(event) {
            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
              } else {
                interim_transcript += event.results[i][0].transcript;
              }
            }
            final_transcript = capitalize(final_transcript);
            final_span.innerHTML = linebreak(final_transcript);
            interim_span.innerHTML = linebreak(interim_transcript);

          };
        }
        function upgrade() {
          showInfo('info_upgrade');
        }


        function startButton(event) {
          if (recognizing) {
            recognition.stop();
            return;
          }
          final_transcript = '';
          recognition.lang = 'en-US';
          recognition.start();
          ignore_onend = false;
          final_span.innerHTML = '';
          interim_span.innerHTML = '';
          showInfo('info_allow');

          start_timestamp = event.timeStamp;
        }

        function showInfo(s) {
            if (s) {
              for (var child = info.firstChild; child; child = child.nextSibling) {
                if (child.style) {
                  child.style.display = child.id == s ? 'inline' : 'none';
                }
              }
              info.style.visibility = 'visible';
            } else {
              info.style.visibility = 'hidden';
            }
        }

        var first_char = /\S/;
        function capitalize(s) {
         return s.replace(first_char, function(m) { return m.toUpperCase(); });
        }


    



