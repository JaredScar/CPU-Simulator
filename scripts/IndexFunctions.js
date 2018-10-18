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

    if(this.handler !=null)
        this.handler.ended = false;

    if(this.handler == null) {
        var manualInput = confirm("You would like to input the data for the jobs manually?");
        finalCpuCount = cpuCount.find(":selected").text();
        finalJobCount = jobCount.find(":selected").text();
        finalSimSpeed = simSpeed.find(":selected").text();
        this.handler = new Main_Handler(cpuCount.find(":selected").text(), jobCount.find(":selected").text(), simSpeed.find(":selected").text());
        this.updater = new Updater(this.handler);
        this.handler.setUpdater(this.updater);
        this.handler.setSchedulerAlgo(algo.find(":selected").text());
        if(manualInput === true) {
            // They want to input the data for the Jobs themselves
            var inQueue = [];
            for(var job in this.handler.getReadyQueue()) {
                job.setArrivalTime(parseInt(prompt("When does the process arrive?")));
                job.setBurstsCount(parseInt(prompt("How many bursts does the process have?")));
                job.setPriority(parseInt(prompt("What is the priority of this process?")));
                inQueue.push(job);
            }
            this.handler.getReadyQueue().setQueue(inQueue);
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
    if(this.updater != null) {
        // Now we update the table with the information:
        this.updater.update_table();
        // We update the page now as well:
        this.updater.update_page();
    }
    if(this.handler == null) {
        var manualInput = confirm("You would like to input the data for the jobs manually?");
        finalCpuCount = cpuCount.find(":selected").text();
        finalJobCount = jobCount.find(":selected").text();
        finalSimSpeed = simSpeed.find(":selected").text();
        this.handler = new Main_Handler(cpuCount.find(":selected").text(), jobCount.find(":selected").text(), simSpeed.find(":selected").text());
        this.updater = new Updater(this.handler);
        this.handler.setUpdater(this.updater);
        this.handler.setSchedulerAlgo(algo.find(":selected").text());
        if(manualInput === true) {
            // They want to input the data for the Jobs themselves
            var inQueue = [];
            var jobs = this.handler.getReadyQueue().getJobs();
            for(var i=0; i < jobs.length; i++) {
                var job = jobs[i];
                job.setArrivalTime(parseInt(prompt("When does the process arrive?")));
                job.setBurstsCount(parseInt(prompt("How many bursts does the process have?")));
                job.setPriority(parseInt(prompt("What is the priority of this process?")));
            }
            this.handler.QUEUE = jobs;

            // Now we update the table with the information:
            this.updater.update_table();
            // We update the page now as well:
            this.updater.update_page();
        } else {
            // They want random data
            this.handler.nextStep();

            // Now we update the table with the information:
            this.updater.update_table();
            // We update the page now as well:
            this.updater.update_page();
        }
    } else {
        this.handler.nextStep();
    }
}
function restart() {
    this.handler = null;
    this.updater = null;
    window.location.reload();
}
function start_another() {
    this.handler = null;
    this.updater = null;
    window.location.reload();
    simulate();
}
function finish() {
    this.handler.runToComplete();
}