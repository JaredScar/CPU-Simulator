/**
 * Created by user on 10/14/2018.
 */
class ReadyQueue {
    constructor(jobs) {
        this.queue = jobs;
        this.QUEUE = jobs.slice(0); // This never gets it's Jobs removed
        this.waitingQueue = []; // The Queue which holds the Jobs on the Ready Queue
    }

    /**
     * getQUEUE()
     *  This function is used to get the Array containing Jobs.
     *  This is a Constant Array and elements within it are never removed.
     * @returns {*|Array.<T>|string|Blob|ArrayBuffer}
     */
    getQUEUE() {
        return this.QUEUE;
    }

    /**
     * getJobs()
     *  This function returns the Array containing Jobs
     *  that have not been finished. When a Job is finished,
     *  it is then removed from this Array.
     * @returns {*|null}
     */
    getJobs() {
        return this.queue;
    }

    /**
     * setQueue(queue)
     *  This function sets the new Array to
     *  the queue and QUEUE Arrays.
     * @param queue
     */
    setQueue(queue) {
        this.queue = queue;
        this.QUEUE = queue.slice(0);
    }

    /**
     * add(job)
     *  This adds a Job to the queue Array.
     * @param job
     */
    add(job) {
        this.queue.push(job);
    }

    /**
     * remove(job)
     *  This removes a Job from the queue Array.
     * @param job
     */
    remove(job) {
        this.queue = this.queue.filter(function(item) {
            return item !== job;
        });
    }

    /**
     * clear()
     *  This sets the queue Array to null.
     */
    clear() {
        this.queue = null;
    }

    /**
     * addWaitingJob(job)
     *  This adds a Job to to the
     *  Waiting Queue Array.
     * @param job
     */
    addWaitingJob(job) {
        this.waitingQueue.push(job);
    }

    /**
     * getWaitingQueue()
     *  This gets the Jobs currently
     *  waiting to be processed
     *  in the Waiting Queue Array.
     * @returns {Array|Array.<T>|*}
     */
    getWaitingQueue() {
        return this.waitingQueue;
    }

    /**
     * removeWaitingJob(job)
     *  This removes the specified Job
     *  from the Waiting Queue Array.
     * @param job
     */
    removeWaitingJob(job) {
        this.waitingQueue = this.waitingQueue.filter(function(item) {
            return item !== job;
        });
    }

    /**
     * update(clockTime)
     *  This function updates the Waiting Queue
     *  Array by checking all the Jobs' arrival times.
     *  It then adds the Job to the Waiting Queue Array when the
     *  clock time is at or has passed the Job's arrival time.
     * @param clockTime
     */
    update(clockTime) {
        for(var i=0; i < this.queue.length; i++) {
            var job = this.queue[i];
            if(job.getArrivalTime() === clockTime) {
                this.addWaitingJob(job);
            }
        }
    }

    // Functions that help for the scheduling algos
    /**
     * Get the first arrived Job that is in the queue (FCFS)
     * @returns Job
     */
    getFirstCome() {
        var lowestTime = this.queue[0].getArrivalTime();
        var jobFinal = this.queue[0];
        for(var i=0; i<this.queue.length; i++) {
            var job = this.queue[i];
            if(lowestTime > job.getArrivalTime()) {
                lowestTime = job.getArrivalTime();
                jobFinal = job;
            }
        }
        return jobFinal;
    }

    /**
     * Get the highest priority job in the waiting queue and order them highest to lowest (PNP)
     * Non-Preemptive & Preemptive use this function
     *
     * @param currentClockTick
     * @returns Job
     */
    getPriorityFirst(currentClockTick) {
        var jobFinal = this.getFirstCome();
        var highestPriority = jobFinal.getPriorityLevel();
        for(var i=0; i < this.queue.length; i++) {
            var job = this.queue[i];
            if(job.getArrivalTime() <= currentClockTick) {
                if(job.getPriorityLevel() > highestPriority) {
                    jobFinal = job;
                    highestPriority = job.getPriorityLevel();
                }
            }
        }
        return jobFinal;
    }
    /**
     * Get the shortest job in the waiting queue and order them shortest to highest (SJF) - Non-Preemptive
     * Get the shortest job in waiting queue and replace job in CPU if it has shorter time than CPU's job (STRF) - Preemptive
     *
     * @param currentClockTick
     * @returns Job
     */
    getShortestJobFirst(currentClockTick) {
        var jobFinal = this.getFirstCome();
        var shortestJob = jobFinal.getBurstsRemaining();
        for(var i=0; i < this.queue.length; i++) {
            var job = this.queue[i];
            if(job.getArrivalTime() <= currentClockTick) {
                if(job.getBurstsRemaining() < shortestJob) {
                    jobFinal = job;
                    shortestJob = job.getBurstsRemaining();
                }
            }
        }
        return jobFinal;
    }
    /**
     * Get the next Round Robin to be done
     *
     * @param currentClockTick
     * @param maxQuantums
     * @returns Job
     */
    getRR(currentClockTick, maxQuantums) {
        var jobFinal = this.getFirstCome();
        var quantCount = jobFinal.getQuantCount();
        for(var i=0; i < this.queue.length; i++) {
            var job = this.queue[i];
            if(job.getArrivalTime() <= currentClockTick) {
                if((jobFinal.getQuantCount() % maxQuantums) == 0) {
                    if (jobFinal.getTimesActive() > job.getTimesActive()) {
                        if(this.waitingQueue.length > 0 && this.waitingQueue[0].getPID() === job.getPID()) {
                            jobFinal = job;
                            quantCount = job.getQuantCount();
                        }
                    }
                }
            }
        }
        return jobFinal;
    }



    // Sorters
    /**
     * Update waitingQueue based on Priority Non-Preemptive & Preemptive
     */
    sortPriority() {
        this.waitingQueue = this.waitingQueue.sort(function(jobA, jobB) {
            if(jobA.getPriorityLevel() > jobB.getPriorityLevel())
                return -1;
            if(jobA.getPriorityLevel() < jobB.getPriorityLevel())
                return 1;
            return 0;
        });
    }

    /**
     * Update waitingQueue based on Shortest Job First & Shortest Time Remaining First
     */
    sortShortest() {
        this.waitingQueue = this.waitingQueue.sort(function(jobA, jobB) {
            if(jobA.getBurstsRemaining() < jobB.getBurstsRemaining)
                return -1;
            if(jobA.getBurstsRemaining() > jobB.getBurstsRemaining())
                return 1;
            return 0;
        });
    }
}
