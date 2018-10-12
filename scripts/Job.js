/**
 * Created by user on 10/12/2018.
 */
class Job {
    private var burstsCount; // How many bursts the program needs to be completed
    private var burstsRemaining; // Bursts still needed to finish task
    private var priority; // Priority of the job
    private var startTime; // The time the Job got started by the CPU
    private var arrivalTime; // The time the Job gets to the CPU ready queue
    private var turnAroundTime; // The time counted while in the ready queue and while being done (starting from arrivalTime)
    private var waitTime; // The time spent waiting in the ready queue while not being a completed job
    private var completed = false; // Is the Job completed?
    private var percentageDone; // Percent of the program being completed ((burstCount / burstsRemaining) * 100)
    // ^ All above data should be randomly generated (besides turnAroundTime, waitTime, startTime, completed, percentageDone) ^

    public Job() {
        // Generate random data below: TODO
    }

    // Getters
    public getBurstsCount() {
        return this.burstsCount;
    }
    public getBurstsRemaining() {
        return this.burstsRemaining;
    }
    public getPriorityLevel() {
        return this.priority;
    }
    public getStartTime() {
        return this.startTime;
    }
    public getArrivalTime() {
        return this.arrivalTime;
    }
    public getTurnAroundTime() {
        return this.turnAroundTime;
    }
    public getWaitTime() {
        return this.waitTime;
    }
    public isCompleted() {
        return this.completed;
    }
    public getPercentDone() {
        return this.percentageDone;
    }

    // Setters
    public update() {
        // Set up the HTML file values with new values in here TODO
    }

    public setBurstsCount(burstsCount) {
        this.burstsCount = burstsCount;
    }
    public setBurstsRemaining(burstsRemaining) {
        this.burstsRemaining = burstsRemaining;
    }
    public setStartTime(startTime) {
        this.startTime = startTime;
    }
    public setTurnAroundTime(turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
    }
    public setWaitTime(waitTime) {
        this.waitTime = waitTime;
    }
    public setCompleted(completed) {
        this.completed = completed;
    }
    public setPercentDone(percentDone) {
        this.percentageDone = percentDone;
    }
}