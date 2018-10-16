/**
 * Created by user on 10/14/2018.
 */
class ReadyQueue {
    constructor(jobs) {
        this.queue = jobs;
        this.QUEUE = jobs; // This never gets it's Jobs removed
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

    // TODO We may need another queue in which will be the main queue and adds the jobs as they arrive with their "arrivalTime":

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
            if(lowestTime == job.getArrivalTime()) {
                if(jobFinal.getBurstsCount() < job.getBurstsCount) {
                    lowestTime = job.getArrivalTime();
                    jobFinal = job;
                }
            }
        }
        return jobFinal;
    }
}