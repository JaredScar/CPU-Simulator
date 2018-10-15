/**
 * Created by user on 10/12/2018.
 */
class CPU {

    constructor(main_handler) {
        this.main_handler = main_handler;
    }

    runFCFS() {
        // Get a job done with the First-Come First-Served algo
        if(this.main_handler.getReadyQueue().getJobs().length > 0) {
            var job = this.main_handler.getReadyQueue().getFirstCome();
            job.active = true;
            if (job.getBurstsRemaining() === 0) {
                // Job was finished, mark it
                job.setCompleted(true);
                job.active = false;
                this.main_handler.getReadyQueue().remove(job);

                //Check if there is another job
                if(this.main_handler.getReadyQueue().getJobs().length > 0) {
                    // Fetch new Job
                    job = this.main_handler.getReadyQueue().getFirstCome();
                    job.active = true;
                } else {
                    // Stop code, all jobs done
                    return;
                }
            }
            if (job.getBurstsCount() == job.getBurstsRemaining()) {
                // We just started this job, we need to set it's start time
                job.setStartTime(this.main_handler.getClock());
            }

            // Set the burstsRemaining
            job.setBurstsRemaining((job.getBurstsRemaining() - 1));

            //Set % ---> ( ((burstsCount - burstsRemaining) / burstsCount) * 100)
            job.setPercentDone(Math.ceil(((job.burstsCount - job.burstsRemaining) / job.burstsCount) * 100));
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