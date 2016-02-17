var app = angular.module('Pomodoro', []);
app.controller('MainCtrl', function($scope, $interval) {
  $scope.breakLength = 5;
  $scope.sessionLength = 25;
  $scope.timeLeft = $scope.sessionLength;
  //for filling the height with colours accordingly
  $scope.fillHeight = '0%';
  $scope.sessionName = 'Keep Going';
  $scope.currentTotal;
  
  var runTimer = false;
  var secs = 60 * $scope.timeLeft;
  $scope.originalTime = $scope.sessionLength;
  
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
  
  // Change default session length
  $scope.sessionLengthChange = function(time) {
    if (!runTimer){
      if ($scope.sessionName === 'Keep Going') {
        $scope.sessionLength += time;
        if ($scope.sessionLength < 0) {
          $scope.sessionLength = 0;
        }
        $scope.timeLeft = $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
      }
    }
  }
  
  // Change default break length
  $scope.breakLengthChange = function(time) {
    if (!runTimer){
      $scope.breakLength += time;
      if ($scope.breakLength < 0) {
        $scope.breakLength = 0;
      }
      if ($scope.sessionName === 'Break!') {
        $scope.timeLeft = $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.breakLength;
      }
    }
  }
  
  $scope.toggleTimer = function() {
    if (!runTimer) {
      if ($scope.currentName === 'Keep Going') {
        $scope.currentLength = $scope.sessionLength;
      } else {
        $scope.currentLength = $scope.breakLength;
      }
      
      updateTimer();
      runTimer = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(runTimer);
      runTimer = false;
    }
  }
  
  function updateTimer() {
    secs -= 1;
    //check if countdown finished-if over,play music and update all variables else manipulate colour fill
    if (secs < 0) {
      var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      var audio = new Audio(wav);
      audio.play();
      
      // toggle break and session
      $scope.fillColor = '#000000';
      if ($scope.sessionName === 'Break!') {
        $scope.sessionName = 'Keep Going';
        $scope.currentLength = $scope.sessionLength;
        $scope.timeLeft = 60 * $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
      } else {
        $scope.sessionName = 'Break!';
        $scope.currentLength = $scope.breakLength;
        $scope.timeLeft = 60 * $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.breakLength;
      }
    } else {
      if ($scope.sessionName === 'Break!') {
        $scope.fillColor = '#96281B';
        $("h1").css("background-color", "#006400");
      } else {
        $scope.fillColor='#006400';       
        $("h1").css("background-color", "#96281B");
      }
      $scope.timeLeft = secondsToHms(secs);
      
      var denom = 60 * $scope.originalTime;
      var perc = Math.abs((secs/ denom) * 100 - 100);
      $scope.fillHeight = (100-perc) + '%';
    }
  }
  
});