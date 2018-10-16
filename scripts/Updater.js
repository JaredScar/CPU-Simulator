/**
 * Created by user on 10/15/2018.
 */
var jobCount = $('#num-of-jobs');
var algo = $('#algo');
var simSpeed = $('#sim-speed');
var cpuCount = $('#cpu-count');

var finalCpuCount;
var finalSimSpeed;
var finalJobCount;

var nextStepButton = $('#next-step-button');
var stopButton = $('#stop-button');

var jobTable = $('#job-table');
var currentJob = $('#current-job');
var clockTimer = $('#clock-num');
var utilization = $('#utilization');
var readyQueue = $('#ready-queue-bars');
var waitingAverage = $('#wait-average');
var turnaroundAverage = $('#turnaround-average');
var liveChart = $('#live-chart');
class Updater {

    constructor(handler) {
        this.handler = handler;
    }

    update_page() {
        var jobs = this.handler.getReadyQueue().getQUEUE();
        // This should update the "CPU" section, "Ready Queue" section, "Average" section, and "Gantt Chart" section:

        // Set up the "CPU" section:
        // Set 'Current Job' in "CPU" section:
        var jobIsActive = false;
        for(var i = 0; i < jobs.length; i++) {
            var job = jobs[i];
            if(job.isActive()) {
                jobIsActive = true;
                currentJob.text("JOB " + job.getPID());
            }
        }
        if(!jobIsActive) {
            currentJob.text("NONE");
            utilization.text("0%");
        } else {
            utilization.text("100%");
        }
        // Set 'Clock Timer' in "CPU" section:
        clockTimer.text(this.handler.getClock());


        // Set up the ReadyQueue to hold the Jobs that have arrived, but can't go because a job is being done:
        var waitQueue = this.handler.getReadyQueue().getWaitingQueue();
        var activeJob = null;
        for(var i = 0; i < waitQueue.length; i++) {
            var job = waitQueue[i];
            var jobSpanID = $('#waitingQueue-' + job.getPID()); // "Ready Queue" section span element
            if(job.isActive()) {
                activeJob = job;
            } else {
                // We want to increase their wait time here too:
                job.setWaitTime((job.getWaitTime() + 1));
                // We want to increase their turn time here too:
                job.setTurnAroundTime((job.getTurnAroundTime() + 1));
            }
            if(jobSpanID.length <= 0) {
                // It doesn't exist, we need to create it
                readyQueue.append('<span class="ready-bar bar-' + job.getPID() + '" id="waitingQueue-' + job.getPID() + '">' + job.getPID() + '</span>');
            }
        }
        // Remove the job that has been started (if one has been):
        if(activeJob != null) {
            this.handler.getReadyQueue().removeWaitingJob(activeJob);
            // Remove it's SpanID too:
            var activeJobSpanID = $('#waitingQueue-' + activeJob.getPID());
            activeJobSpanID.remove();
        }

        // Set up the average count (easy math):
        var waitSum = 0;
        var turnSum = 0;
        for(var i = 0; i < jobs.length; i++) {
            var job = jobs[i];
            waitSum = job.getWaitTime() + waitSum;
            turnSum = job.getTurnAroundTime() + turnSum;
        }
        var waitAverage = (waitSum / jobs.length);
        var turnAverage = (turnSum / jobs.length);
        waitingAverage.text(waitAverage);
        turnaroundAverage.text(turnAverage);

        // Set up the Gantt Chart and add the job's burst if it's active:
        for (var i = 0; i < jobs.length; i++) {
            var job = jobs[i];
            if (job.isActive()) {
                // Then this is the job that gets it's Gantt chart added to
                for (var j = 0; j < parseInt(finalCpuCount); j++) {
                    liveChart.append('<span class="ready-bar bar-' + job.getPID() + '">' + job.getPID() + '</span>');
                }
            }
        }
    }

    update_table() {
        // Update values on Job Table:
        for (var i = 0; i < this.handler.getReadyQueue().getQUEUE().length; i++) {
            var job = this.handler.getReadyQueue().getQUEUE()[i];

            var arrivalTime = job.getArrivalTime();
            var burstsCount = job.getBurstsCount();
            var priority = job.getPriorityLevel();
            var startedTime = job.getStartTime();
            var waitedTime = job.getWaitTime();
            var burstsRemaining = job.getBurstsRemaining();
            var finished = job.isCompleted();
            var turn = job.getTurnAroundTime();
            var percentDone = job.getPercentDone();

            var pidTD = $('#PID-' + i);
            if (pidTD.length <= 0) {
                // Wasn't created yet, we need to insert new data
                jobTable.append('<tr><td id="PID-' + i + '">' + job.getPID() + '</td><td id="arrivalTime-' + i + '">' + arrivalTime + '</td><td id="burstsCount-' + i + '">' + burstsCount +
                    '</td><td id="priority-' + i + '">' + priority +
                    '</td><td id="startedTime-' + i + '">' + startedTime
                    + '</td><td id="waitedTime-' + i + '">' + waitedTime + '</td><td id="burstsRemaining-' + i + '">' + burstsRemaining +
                    '</td><td id="finished-' + i + '">' + finished + '</td><td id="turnaround-' + i + '">' + turn + '</td><td id="percentDone-' + i + '">' + percentDone + '</td></tr>');
            } else {
                // It has a row in the table already... Update values TODO
                var arrivalTD = $('#arrivalTime-' + i);
                var burstsCountTD = $('#burstsCount-' + i);
                var priorityTD = $('#priority-' + i);
                var startedTimeTD = $('#startedTime-' + i);
                var waitedTimeTD = $('#waitedTime-' + i);
                var burstsRemainingTD = $('#burstsRemaining-' + i);
                var finishedTD = $('#finished-' + i);
                var turnaroundTD = $('#turnaround-' + i);
                var percentDoneTD = $('#percentDone-' + i);

                // Update their values
                arrivalTD.text(arrivalTime);
                burstsCountTD.text(burstsCount);
                priorityTD.text(priority);
                startedTimeTD.text(startedTime);
                waitedTimeTD.text(waitedTime);
                burstsRemainingTD.text(burstsRemaining);
                finishedTD.text(finished);
                turnaroundTD.text(turn);
                percentDoneTD.text(percentDone);
            }
        }
    }
}