
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA264QibU35cgHbptuguFG54Sjrq2aQ0iE",
    authDomain: "train-scheduler-ad940.firebaseapp.com",
    databaseURL: "https://train-scheduler-ad940.firebaseio.com",
    projectId: "train-scheduler-ad940",
    storageBucket: "",
    messagingSenderId: "996704342081"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

  //  Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();


   // Creates local "temporary" object for holding train data
   var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency,
  };
 // Uploads train data to the database
 database.ref().push(newTrain);

 // Clears all of the text-boxes
 $("#train-name-input").val("");
 $("#destination-input").val("");
 $("#firstTrain-input").val("");
 $("#frequency-input").val("");
});


// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {


  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;


    // Time calculation;

	//First time
	var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");


	// Current time
	var currentTime = moment();

	// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;

	// Mins until train
	var tMinutesTillTrain = frequency - tRemainder;

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");


// Create & append the new row


$("#train-table > tbody").append("<tr><td>" + trainName + 
          "</td><td>"+ destination +
          "</td><td>" + frequency + " mins" + 
          "</td><td>" + nextTrain + 
          "</td><td>" +  tMinutesTillTrain+
            "</td></tr>");

});


