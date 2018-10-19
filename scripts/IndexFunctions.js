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
var updater = null;

var jobCount = $('#num-of-jobs');
var algo = $('#algo');
var quantum = $('#quantum');
var cpuCount = $('#cpu-count');

var finalCpuCount;
var finalQuantum;
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
    // We want to disable simulate button since it's already simulating
    simulateButton.prop('disabled', true);

    if(this.handler !=null)
        this.handler.ended = false;

    if(this.handler == null) {
        var manualInput = confirm("You would like to input the data for the jobs manually?");
        finalCpuCount = cpuCount.find(":selected").text();
        finalJobCount = jobCount.find(":selected").text();
        finalSimSpeed = quantum.find(":selected").text();
        this.handler = new Main_Handler(cpuCount.find(":selected").text(), jobCount.find(":selected").text(), quantum.find(":selected").text());
        this.updater = new Updater(this.handler);
        this.handler.setUpdater(this.updater);
        this.handler.setSchedulerAlgo(algo.find(":selected").text());
        if(manualInput === true) {
            // They want to input the data for the Jobs themselves
            var jobs = this.handler.getReadyQueue().getJobs();
            var newQueue = [];
            for(var i=0; i < jobs.length; i++) {
                var job = jobs[i];
                job.setArrivalTime(parseInt(prompt("When does the process arrive?")));
                job.setBurstsCount(parseInt(prompt("How many bursts does the process have?")));
                job.setBurstsRemaining(job.getBurstsCount());
                job.setPriority(parseInt(prompt("What is the priority of this process?")));
                newQueue.push(job);
            }
            this.handler.getReadyQueue().setQueue(newQueue);
            this.handler.run();
        } else {
            // They want random data
            this.handler.run();
        }
    } else {
        this.handler.run();
    }
}
function stop() {
    this.handler.ended = true;
    stopButton.prop('disabled', true);
    nextStepButton.removeAttr('disabled');
}
function next_step() {
    if(this.handler == null) {
        var manualInput = confirm("You would like to input the data for the jobs manually?");
        finalCpuCount = cpuCount.find(":selected").text();
        finalJobCount = jobCount.find(":selected").text();
        finalSimSpeed = quantum.find(":selected").text();
        this.handler = new Main_Handler(cpuCount.find(":selected").text(), jobCount.find(":selected").text(), quantum.find(":selected").text());
        this.updater = new Updater(this.handler);
        this.handler.setUpdater(this.updater);
        this.handler.setSchedulerAlgo(algo.find(":selected").text());
        if(manualInput === true) {
            // They want to input the data for the Jobs themselves
            var jobs = this.handler.getReadyQueue().getJobs();
            var newQueue = [];
            for(var i=0; i < jobs.length; i++) {
                var job = jobs[i];
                job.setArrivalTime(parseInt(prompt("When does the process arrive?")));
                job.setBurstsCount(parseInt(prompt("How many bursts does the process have?")));
                job.setBurstsRemaining(job.getBurstsCount());
                job.setPriority(parseInt(prompt("What is the priority of this process?")));
                newQueue.push(job);
            }
            this.handler.getReadyQueue().setQueue(newQueue);
        } else {
            // They want random data
            this.handler.nextStep();
        }
    } else {
        this.handler.nextStep();
    }
    // Now we update the table with the information:
    this.updater.update_table();
    // We update the page now as well:
    this.updater.update_page();
}
function restart() {
    window.location.reload();
}
function start_another() {
    this.handler = null;
    this.updater = null;
    sessionStorage.setItem("Start_Another", true);
    window.location.reload();
}
function started_another() {
    if(sessionStorage.getItem("Start_Another")) {
        simulate();
        sessionStorage.clear();
    }
}
function finish() {
    this.handler.runToComplete();
}