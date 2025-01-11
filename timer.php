<!DOCTYPE html>
<html>
<head>
    <title>Countdown Timer</title>
    <script>
        function Countdown(endDate, elementId) {
            var self = this;
            this.endDate = endDate;
            this.elementId = elementId;
            this.timerId = null;

            this.start = function() {
                this.timerId = setInterval(function() {
                    self.updateTimer();
                }, 1000);
            };

            this.stop = function() {
                clearInterval(this.timerId);
            };

            this.updateTimer = function() {
                var timeLeft = Math.floor((this.endDate - new Date()) / 1000);

                if (timeLeft < 0) {
                    document.getElementById(this.elementId).innerHTML = "Countdown Expired";
                    this.stop();
                    return;
                }

                var hours = Math.floor(timeLeft / 3600);
                var minutes = Math.floor((timeLeft % 3600) / 60);
                var seconds = Math.floor(timeLeft % 60);

                document.getElementById(this.elementId).innerHTML = hours + "h "
                    + minutes + "m " + seconds + "s";
            };
        }

        var countdowns = [];

        function createCountdown(endDate, elementId) {
            var countdown = new Countdown(endDate, elementId);
            countdown.start();
            countdowns.push(countdown);
        }

        function saveEvent() {
            var eventDate = document.getElementById("eventDate").value;
            var eventTime = document.getElementById("eventTime").value;

            if (!eventDate || !eventTime) {
                alert("Please enter a valid date and time.");
                return;
            }

            var eventDateTime = new Date(eventDate + " " + eventTime);
            var elementId = "timer" + countdowns.length;

            createCountdown(eventDateTime, elementId);

            var eventList = document.getElementById("eventList");
            var listItem = document.createElement("li");
            listItem.innerHTML = eventDateTime.toLocaleString() + ": <span id='" + elementId + "'></span>";
            eventList.appendChild(listItem);

            document.getElementById("eventDate").value = "";
            document.getElementById("eventTime").value = "";
        }

        document.addEventListener("DOMContentLoaded", function() {
            var savedCountdowns = <?php echo json_encode($_SESSION['countdowns'] ?? []); ?>;
            savedCountdowns.forEach(function(savedCountdown) {
                createCountdown(new Date(savedCountdown.endDate), savedCountdown.elementId);
            });
        });

        window.addEventListener("beforeunload", function() {
            var countdownData = countdowns.map(function(countdown) {
                return {
                    endDate: countdown.endDate.toISOString(),
                    elementId: countdown.elementId
                };
            });

            <?php $_SESSION['countdowns'] = "REPLACE_WITH_SESSION_VARIABLE_NAME"; ?>;
            <?php echo $_SESSION['countdowns']; ?> = countdownData;
        });
    </script>
</head>
<body>
    <h1>Countdown Timer</h1>
    <div>
        <label for="eventDate">Event Date:</label>
        <input type="date" id="eventDate">
        <label for="eventTime">Event Time:</label>
        <input type="time" id="eventTime">
        <button onclick="saveEvent()">Save Event</button>
    </div>
    <h2>Events:</h2>
    <ul id="eventList"></ul>
</body>
</html>
