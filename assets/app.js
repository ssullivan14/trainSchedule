

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAXX8ASPni37VVa4HAdIswCbaOZOuo3a6o",
    authDomain: "fir-2-52247.firebaseapp.com",
    databaseURL: "https://fir-2-52247.firebaseio.com",
    projectId: "fir-2-52247",
    storageBucket: "fir-2-52247.appspot.com",
    messagingSenderId: "774112578685",
    appId: "1:774112578685:web:4322121b149322febfb514"
  };
  
  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();

  // 2. Button for adding Employees
$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
  var trainInput  = $("#train-name-input").val().trim();
  var destinationInput = $("#destination-input").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var frequencyInput = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var trainData = {
    train: trainInput,
    location: destinationInput,
    time: firstTrainTime,
    frequency: frequencyInput
  };

  // Uploads employee data to the database
  database.ref().push(trainData);

  // Logs everything to console
  console.log(trainData.train);
  console.log(trainData.location);
  console.log(trainData.time);
  console.log(trainData.frequency);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainLocation = childSnapshot.val().location;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainLocation);
  console.log(trainTime);
  console.log(trainFrequency);

  // Prettify the train start
//   var trainStartPretty = moment.unix(trainTime).format("LT");
  

  // Calculate the next arrival 
  var timeConverter = moment(trainTime, "HH:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(timeConverter), "minutes");
  var timeRemain = timeDiff % trainFrequency;
  var minAway = trainFrequency - timeRemain;
  var nextArrival = moment().add(minAway, "minutes");
  console.log(nextArrival);
  var arriveDisplay = moment(nextArrival).format("HH:mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainLocation),
    // $("<td>").text(trainTime),
    $("<td>").text(trainFrequency),
    $("<td>").text(arriveDisplay),
    $("<td>").text(minAway)
  );

  // Append the new row to the table
  $("#train-table").append(newRow);
});