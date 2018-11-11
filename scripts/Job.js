/**
 * Created by user on 10/12/2018.
 */
class Job {

    constructor(pid) {
        // Generate random data below: TODO
        this.pid = pid; // Process ID
        this.burstsCount = Math.ceil(Math.random() * (10 - 1) + 1); // How many bursts the program needs to be completed
        this.burstsRemaining = this.burstsCount; // Bursts still needed to finish task
        this.priority = Math.ceil(Math.random() * (100 - 1) + 1); // Priority of the job
        this.startTime = 0; // The time the Job got started by the CPU
        this.arrivalTime = Math.ceil(Math.random() * (this.burstsCount - 1) + 1); // The time the Job gets to the CPU ready queue
        this.turnAroundTime = 0; // The time counted while in the ready queue and while being done (starting from arrivalTime)
        this.waitTime = 0; // The time spent waiting in the ready queue while not being a completed job
        this.completed = false; // Is the Job completed?
        this.percentageDone = 0; // Percent of the program being completed ((burstCount / burstsRemaining) * 100)
        this.active = false; // Is the Job currently active in a CPU or not?
        this.quantCount = 0; // For use with Round-Robin
        this.timesActive = 0; // For use with Round-Robin
        // ^ All above data should be randomly generated (besides turnAroundTime, waitTime, startTime, completed, percentageDone) ^
    }

    /**
     * restart()
     *  This method resets all the data of Job to their default values
     *  in case someone would like to restart the Job's from their
     *  starting positions.
     */
    restart() {
        this.burstsRemaining = this.burstsCount;
        this.percentageDone = 0;
        this.active = false;
        this.completed = false;
        this.startTime = 0;
        this.turnAroundTime = 0;
        this.waitTime = 0;
        this.quantCount = 0;
        this.timesActive = 0;
    }

    /**
     * isActive()
     *  Is this Job currently active in a CPU?
     * @returns {boolean|*}
     */
    isActive() {
        return this.active;
    }

    /**
     * getTimesActive()
     *  This is only used for the Round Robin algorithm
     * @returns {number|*}
     */
    getTimesActive() {
        return this.timesActive;
    }

    /**
     * setTimesActive(timesActive)
     *  This is only used for the Round Robin algorithm
     * @param timesActive
     */
    setTimesActive(timesActive) {
        this.timesActive = timesActive;
    }

    /**
     * getQuantCount()
     *  This is only used for the Round Robin algorithm
     * @returns {number|*}
     */
    getQuantCount() {
        return this.quantCount;
    }

    /**
     * setQuantCount(quantCount)
     *  This is only used for the Round Robin algorithm
     * @param quantCount
     */
    setQuantCount(quantCount) {
        this.quantCount = quantCount;
    }

    getBurstsCountDone() {
        return ((this.burstsCount - this.burstsRemaining));
    }

    getPID() {
        return this.pid;
    }
    getBurstsCount() {
        return this.burstsCount;
    }
    getBurstsRemaining() {
        return this.burstsRemaining;
    }
    getPriorityLevel() {
        return this.priority;
    }
    getStartTime() {
        return this.startTime;
    }
    getArrivalTime() {
        return this.arrivalTime;
    }
    getTurnAroundTime() {
        return this.turnAroundTime;
    }
    getWaitTime() {
        return this.waitTime;
    }
    isCompleted() {
        return this.completed;
    }
    getPercentDone() {
        return this.percentageDone;
    }

    // Setters
    setActive(active) {
        this.active = active;
    }

    setBurstsCount(burstsCount) {
        this.burstsCount = burstsCount;
    }
    setBurstsRemaining(burstsRemaining) {
        this.burstsRemaining = burstsRemaining;
    }
    setPriority(priority) {
        this.priority = priority;
    }
    setArrivalTime(arrivalTime) {
        this.arrivalTime = arrivalTime;
    }
    setStartTime(startTime) {
        this.startTime = startTime;
    }
    setTurnAroundTime(turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
    }
    setWaitTime(waitTime) {
        this.waitTime = waitTime;
    }
    setCompleted(completed) {
        this.completed = completed;
    }
    setPercentDone(percentDone) {
        this.percentageDone = percentDone;
    }
}