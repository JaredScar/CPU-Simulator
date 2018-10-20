/**
 * Created by user on 10/14/2018.
 */
class ReadyQueue {
    constructor(jobs) {
        this.queue = jobs;
        this.QUEUE = jobs.slice(0); // This never gets it's Jobs removed
        this.waitingQueue = []; // The Queue which holds the Jobs on the Ready Queue
    }

    getQUEUE() {
        return this.QUEUE;
    }

    getJobs() {
        return this.queue;
    }

    setQueue(queue) {
        this.queue = queue;
        this.QUEUE = queue;
    }

    add(job) {
        this.queue.push(job);
    }

    remove(job) {
        this.queue = this.queue.filter(function(item) {
            return item !== job;
        });
    }

    clear() {
        this.queue = null;
    }

    addWaitingJob(job) {
        this.waitingQueue.push(job);
    }

    getWaitingQueue() {
        return this.waitingQueue;
    }

    removeWaitingJob(job) {
        this.waitingQueue = this.waitingQueue.filter(function(item) {
            return item !== job;
        });
    }

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
                if(job.getPriorityLevel() < highestPriority) {
                    jobFinal = job;
                    highestPriority = job.getPriorityLevel();
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
            if(jobA.getPriorityLevel() < jobB.getPriorityLevel())
                return -1;
            if(jobA.getPriorityLevel() > jobB.getPriorityLevel())
                return 1;
            return 0;
        });
    }
}