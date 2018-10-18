/**
 * Created by user on 10/12/2018.
 */
class CPU {

    constructor(main_handler) {
        this.main_handler = main_handler;
    }

    runFCFS() {
        // Get a job done with the First-Come First-Served algo

        // Does the ReadyQueue have jobs in it?
        if(this.main_handler.getReadyQueue().getJobs().length > 0) {
            var job = this.main_handler.getReadyQueue().getFirstCome();
            // Make sure the clock is or has passed the ArrivalTime of the job:
            if (job.getArrivalTime() <= this.main_handler.getClock()) {
                job.active = true;
                // Does it have no more bursts remaining for it?:
                if (job.getBurstsRemaining() === 0) {
                    // Job was finished, mark it
                    job.setCompleted(true);
                    job.active = false;
                    this.main_handler.getReadyQueue().remove(job);

                    //Check if there is another job
                    if (this.main_handler.getReadyQueue().getJobs().length > 0) {
                        // Fetch new Job
                        job = this.main_handler.getReadyQueue().getFirstCome();
                        job.active = true;
                    } else {
                        // Stop code, all jobs done
                        updater.disable_buttons();
                        this.main_handler.end();
                        return;
                    }
                }
                // Check if we just started the job:
                if (job.getBurstsCount() == job.getBurstsRemaining()) {
                    // We just started this job, we need to set it's start time
                    job.setStartTime(this.main_handler.getClock());
                }

                // Set the burstsRemaining
                job.setBurstsRemaining((job.getBurstsRemaining() - 1));

                // Set % ---> ( ((burstsCount - burstsRemaining) / burstsCount) * 100)
                job.setPercentDone(Math.ceil(((job.burstsCount - job.burstsRemaining) / job.burstsCount) * 100));

                // We need to add time to turnaround time:
                job.setTurnAroundTime((job.getTurnAroundTime() + 1));

                this.main_handler.getReadyQueue().update(this.main_handler.getClock());
            }
        }
    }
    runSJF() {
        // Get a job done with the Shortest Job First algo
    }
    runSRTF() {
        // Get a job done with the Shortest Remaining Time First algo
    }
    runRR() {
        // Get a job done with the Round-Robin algo
    }
    runPNP() {
        // Get a job done with the Priority Non-Preemptive algo
    }
    runPP() {
        // Get a job done with the Priority Preemptive algo
    }
}