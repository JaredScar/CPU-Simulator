/**
 * Created by user on 10/14/2018.
 */
class ReadyQueue {
    constructor(jobs) {
        this.queue = jobs;
        this.QUEUE = jobs; // This never gets it's Jobs removed
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