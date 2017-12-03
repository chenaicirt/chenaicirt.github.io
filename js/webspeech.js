


 $(document).keydown(function(e) {

    if (e.which == 32) {
      
        if (!('webkitSpeechRecognition' in window)) {
          upgrade();
        } else {
          start_button.style.display = 'inline-block';
          var recognition = new webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;

          recognition.onstart = function() {
            recognizing = true;
            showInfo('info_speak_now');
            start_img.src = '/intl/en/chrome/assets/common/images/content/mic-animate.gif';
          };

          recognition.onerror = function(event) {
            if (event.error == 'no-speech') {
              start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
              showInfo('info_no_speech');
              ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
              start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
              showInfo('info_no_microphone');
              ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
              if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
              } else {
                showInfo('info_denied');
              }
              ignore_onend = true;
            }
          };

          recognition.onend = function() {
            recognizing = false;
            if (ignore_onend) {
              return;
            }
            start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
            if (!final_transcript) {
              showInfo('info_start');
              return;
            }
            showInfo('');
            if (window.getSelection) {
              window.getSelection().removeAllRanges();
              var range = document.createRange();
              range.selectNode(document.getElementById('final_span'));
              window.getSelection().addRange(range);
            }
            if (create_email) {
              create_email = false;
              createEmail();
            }
          };

          recognition.onresult = function(event) {
            var interim_transcript = '';
            if (typeof(event.results) == 'undefined') {
              recognition.onend = null;
              recognition.stop();
              upgrade();
              return;
            }
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
            if (final_transcript || interim_transcript) {
              showButtons('inline-block');
            }
          };
        }

        function upgrade() {
          start_button.style.visibility = 'hidden';
          showInfo('info_upgrade');
        }
            }

 });




