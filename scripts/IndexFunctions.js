/**
 * Created by user on 10/12/2018.
 */
/**
 * ids:
 * #num-of-jobs
 * #simulate-button
 * #algo
 * #stop-button
 * #sim-speed
 * #next-step-button
 * #cpu-count
 * #restart-button
 * #start-another
 * #finish
 *
 * #job-table
 *
 * #current-job
 * #clock-num
 *
 * #ready-queue-bars
 *
 * #wait-average
 * #turnaround-average
 *
 * #live-chart
 */
var handler = null;

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
var readyQueue = $('#ready-queue-bars');
var waitAverage = $('#wait-average');
var turnaroundAverage = $('#turnaround-average');
var liveChart = $('#live-chart');
function simulate() {
    // If they simulate, we disable the next step button while it's being simulated:
    nextStepButton.prop('disabled', true);
    // We want to enable the stop button since the simulation will be active:
    stopButton.removeAttr('disabled');
}
function stop() {}
function next_step() {
    if(this.handler == null) {
        manualInput = confirm("You would like to input the data for the jobs manually?");
        finalCpuCount = cpuCount.find(":selected").text();
        finalJobCount = jobCount.find(":selected").text();
        finalSimSpeed = simSpeed.find(":selected").text();
        this.handler = new Main_Handler(cpuCount.find(":selected").text(), jobCount.find(":selected").text(), simSpeed.find(":selected").text());
        if(manualInput === true) {
            // They want to input the data for the Jobs themselves
            var inQueue = [];
            for(job in this.handler.getReadyQueue()) {
                job.setArrivalTime(parseInt(prompt("When does the process arrive?")));
                job.setBurstsCount(parseInt(prompt("How many bursts does the process have?")));
                job.setPriority(parseInt(prompt("What is the priority of this process?")));
                inQueue.push(job);
            }
            this.handler.getReadyQueue().setQueue(inQueue);
        } else {
            // They want random data
            this.handler.nextStep();
        }
    } else {
        this.handler.nextStep();
    }
    // Now we update the table with the information:
    update_table();
    // We update the page now as well:
    update_page();
}
function restart() {}
function start_another() {}
function finish() {}

function update_page() {
    // This should update the "CPU" section, "Ready Queue" section, "Average" section, and "Gantt Chart" section:

    // TODO We need to set up the ReadyQueue to hold the Jobs that have arrived, but can't go because a job is being done:

    // TODO We need to set up the average count (easy math):

    // TODO We need to set up the Gantt Chart and add the job's burst if it's active:
    var jobs = this.handler.getReadyQueue().getQUEUE();
    for(var i=0; i < jobs.length; i++) {
        var job = jobs[i];
        if(job.isActive()) {
            // Then this is the job that gets it's Gantt chart added to
            for(var j=0; j < parseInt(finalCpuCount); j++) {
                liveChart.append('<span class="ready-bar bar-' + job.getPID() + '">' + job.getPID() + '</span>');
            }
        }
    }
}
function update_table() {
    // Update values on Job Table:
    for(var i = 0; i < this.handler.getReadyQueue().getQUEUE().length; i++) {
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
        if(pidTD.length <= 0) {
            // Wasn't created yet, we need to insert new data
            jobTable.append('<tr><td id="PID-' + i +'">' + job.getPID() + '</td><td id="arrivalTime-' + i + '">' + arrivalTime + '</td><td id="burstsCount-' + i + '">' + burstsCount +
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