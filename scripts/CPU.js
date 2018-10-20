/**
 * Created by user on 10/12/2018.
 */
class CPU {

    constructor(main_handler) {
        this.main_handler = main_handler;
        this.currentJob = null;
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
                        var newJobFound = false;
                        while(!newJobFound) {
                            job = this.main_handler.getReadyQueue().getFirstCome();
                            if(job.getBurstsRemaining() === 0) {
                                job.setCompleted(true);
                                this.main_handler.getReadyQueue().remove(job);
                                if(this.main_handler.getReadyQueue().getJobs().length === 0) {
                                    // Stop code, all jobs done
                                    updater.disable_buttons();
                                    this.main_handler.end();
                                    return;
                                }
                            } else {
                                newJobFound = true;
                            }
                        }
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

        // Does the ReadyQueue have jobs in it?
        if(this.main_handler.getReadyQueue().getJobs().length > 0) {
            var job;
            if(this.currentJob === null) {
                job = this.main_handler.getReadyQueue().getShortestJobFirst(this.main_handler.getClock());
                this.currentJob = job;
            } else {
                job = this.currentJob;
            }
            // Make sure the clock is or has passed the ArrivalTime of the job:
            if (job.getArrivalTime() <= this.main_handler.getClock()) {
                job.active = true;
                // Does it have no more bursts remaining for it?:
                if (job.getBurstsRemaining() === 0) {
                    // Job was finished, mark it
                    job.setCompleted(true);
                    job.active = false;
                    this.main_handler.getReadyQueue().remove(job);

                    this.currentJob = null;

                    //Check if there is another job
                    if (this.main_handler.getReadyQueue().getJobs().length > 0) {
                        // Fetch new Job
                        var newJobFound = false;
                        while(!newJobFound) {
                            job = this.main_handler.getReadyQueue().getShortestJobFirst(this.main_handler.getClock());
                            if(job.getBurstsRemaining() === 0) {
                                job.setCompleted(true);
                                this.main_handler.getReadyQueue().remove(job);
                                if(this.main_handler.getReadyQueue().getJobs().length === 0) {
                                    // Stop code, all jobs done
                                    updater.disable_buttons();
                                    this.main_handler.end();
                                    return;
                                }
                            } else {
                                newJobFound = true;
                            }
                        }
                        job.active = true;
                        this.currentJob = job;
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

                // Sort the waitingQueue:
                this.main_handler.getReadyQueue().sortShortest();

                this.main_handler.getReadyQueue().update(this.main_handler.getClock());
            }
        }
    }
    runSRTF() {
        // Get a job done with the Shortest Remaining Time First algo

        // Does the ReadyQueue have jobs in it?
        if(this.main_handler.getReadyQueue().getJobs().length > 0) {
            var job = this.main_handler.getReadyQueue().getShortestJobFirst(this.main_handler.getClock());
            if(this.currentJob === null) {
                this.currentJob = job;
            } else {
                this.currentJob.active = false;
                if(this.currentJob.burstsRemaining !=0) {
                    this.main_handler.getReadyQueue().addWaitingJob(this.currentJob);
                }
                job.active = true;
                this.currentJob = job;
            }
            // Make sure the clock is or has passed the ArrivalTime of the job:
            if (job.getArrivalTime() <= this.main_handler.getClock()) {
                job.active = true;
                // Does it have no more bursts remaining for it?:
                if (job.getBurstsRemaining() === 0) {
                    // Job was finished, mark it
                    job.setCompleted(true);
                    job.active = false;
                    this.main_handler.getReadyQueue().remove(job);

                    this.currentJob = null;

                    //Check if there is another job
                    if (this.main_handler.getReadyQueue().getJobs().length > 0) {
                        // Fetch new Job
                        var newJobFound = false;
                        while(!newJobFound) {
                            job = this.main_handler.getReadyQueue().getShortestJobFirst(this.main_handler.getClock());
                            if(job.getBurstsRemaining() === 0) {
                                job.setCompleted(true);
                                this.main_handler.getReadyQueue().remove(job);
                                if(this.main_handler.getReadyQueue().getJobs().length === 0) {
                                    // Stop code, all jobs done
                                    updater.disable_buttons();
                                    this.main_handler.end();
                                    return;
                                }
                            } else {
                                newJobFound = true;
                            }
                        }
                        job.active = true;
                        this.currentJob = job;
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

                // Sort the waitingQueue:
                this.main_handler.getReadyQueue().sortShortest();

                this.main_handler.getReadyQueue().update(this.main_handler.getClock());
            }
        }
    }
    runRR() {
        // Get a job done with the Round-Robin algo

        // Does the ReadyQueue have jobs in it?
        if(this.main_handler.getReadyQueue().getJobs().length > 0) {
            var job = this.main_handler.getReadyQueue().getRR(this.main_handler.getClock(), this.main_handler.getQuantum());
            if(this.currentJob === null) {
                this.currentJob = job;
            } else {
                this.currentJob.active = false;
                if(this.currentJob.burstsRemaining !=0) {
                    this.main_handler.getReadyQueue().addWaitingJob(this.currentJob);
                }
                job.active = true;
                this.currentJob = job;
            }
            // Make sure the clock is or has passed the ArrivalTime of the job:
            if (job.getArrivalTime() <= this.main_handler.getClock()) {
                job.active = true;
                // Does it have no more bursts remaining for it?:
                if (job.getBurstsRemaining() === 0) {
                    // Job was finished, mark it
                    job.setCompleted(true);
                    job.active = false;
                    this.main_handler.getReadyQueue().remove(job);

                    this.currentJob = null;

                    //Check if there is another job
                    if (this.main_handler.getReadyQueue().getJobs().length > 0) {
                        // Fetch new Job
                        var newJobFound = false;
                        while(!newJobFound) {
                            job = this.main_handler.getReadyQueue().getRR(this.main_handler.getClock(), this.main_handler.getQuantum());
                            if(job.getBurstsRemaining() === 0) {
                                job.setCompleted(true);
                                this.main_handler.getReadyQueue().remove(job);
                                if(this.main_handler.getReadyQueue().getJobs().length === 0) {
                                    // Stop code, all jobs done
                                    updater.disable_buttons();
                                    this.main_handler.end();
                                    return;
                                }
                            } else {
                                newJobFound = true;
                            }
                        }
                        job.active = true;
                        this.currentJob = job;
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

                // Round-Robin = We set the quantCount
                job.setQuantCount( (job.getQuantCount() + 1) );
                if( (job.getQuantCount() % this.main_handler.getQuantum()) === 0) {
                    job.setTimesActive( (job.getTimesActive() + 1) );
                }

                // We need to add time to turnaround time:
                job.setTurnAroundTime((job.getTurnAroundTime() + 1));

                this.main_handler.getReadyQueue().update(this.main_handler.getClock());
            }
        }
    }
    runPNP() {
        // Get a job done with the Priority Non-Preemptive algo

        // Does the ReadyQueue have jobs in it?
        if(this.main_handler.getReadyQueue().getJobs().length > 0) {
            var job;
            if(this.currentJob === null) {
                job = this.main_handler.getReadyQueue().getPriorityFirst(this.main_handler.getClock());
                this.currentJob = job;
            } else {
                job = this.currentJob;
            }
            // Make sure the clock is or has passed the ArrivalTime of the job:
            if (job.getArrivalTime() <= this.main_handler.getClock()) {
                job.active = true;
                // Does it have no more bursts remaining for it?:
                if (job.getBurstsRemaining() === 0) {
                    // Job was finished, mark it
                    job.setCompleted(true);
                    job.active = false;
                    this.main_handler.getReadyQueue().remove(job);

                    this.currentJob = null;

                    //Check if there is another job
                    if (this.main_handler.getReadyQueue().getJobs().length > 0) {
                        // Fetch new Job
                        var newJobFound = false;
                        while(!newJobFound) {
                            job = this.main_handler.getReadyQueue().getPriorityFirst(this.main_handler.getClock());
                            if(job.getBurstsRemaining() === 0) {
                                job.setCompleted(true);
                                this.main_handler.getReadyQueue().remove(job);
                                if(this.main_handler.getReadyQueue().getJobs().length === 0) {
                                    // Stop code, all jobs done
                                    updater.disable_buttons();
                                    this.main_handler.end();
                                    return;
                                }
                            } else {
                                newJobFound = true;
                            }
                        }
                        job.active = true;
                        this.currentJob = job;
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

                // Sort the waitingQueue:
                this.main_handler.getReadyQueue().sortPriority();

                this.main_handler.getReadyQueue().update(this.main_handler.getClock());
            }
        }
    }
    runPP() {
        // Get a job done with the Priority Preemptive algo

        // Does the ReadyQueue have jobs in it?
        if(this.main_handler.getReadyQueue().getJobs().length > 0) {
            var job = this.main_handler.getReadyQueue().getPriorityFirst(this.main_handler.getClock());
            if(this.currentJob === null) {
                this.currentJob = job;
            } else {
                this.currentJob.active = false;
                if(this.currentJob.burstsRemaining !=0) {
                    this.main_handler.getReadyQueue().addWaitingJob(this.currentJob);
                }
                job.active = true;
                this.currentJob = job;
            }
            // Make sure the clock is or has passed the ArrivalTime of the job:
            if (job.getArrivalTime() <= this.main_handler.getClock()) {
                job.active = true;
                // Does it have no more bursts remaining for it?:
                if (job.getBurstsRemaining() === 0) {
                    // Job was finished, mark it
                    job.setCompleted(true);
                    job.active = false;
                    this.main_handler.getReadyQueue().remove(job);

                    this.currentJob = null;

                    //Check if there is another job
                    if (this.main_handler.getReadyQueue().getJobs().length > 0) {
                        // Fetch new Job
                        var newJobFound = false;
                        while(!newJobFound) {
                            job = this.main_handler.getReadyQueue().getPriorityFirst(this.main_handler.getClock());
                            if(job.getBurstsRemaining() === 0) {
                                job.setCompleted(true);
                                this.main_handler.getReadyQueue().remove(job);
                                if(this.main_handler.getReadyQueue().getJobs().length === 0) {
                                    // Stop code, all jobs done
                                    updater.disable_buttons();
                                    this.main_handler.end();
                                    return;
                                }
                            } else {
                                newJobFound = true;
                            }
                        }
                        job.active = true;
                        this.currentJob = job;
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

                // Sort the waitingQueue:
                this.main_handler.getReadyQueue().sortPriority();

                this.main_handler.getReadyQueue().update(this.main_handler.getClock());
            }
        }
    }
}