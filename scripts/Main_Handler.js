/**
 * Created by user on 10/12/2018.
 */
class Main_Handler {
    constructor(cpuCount, jobCount, simSpeed) {
        this.ended = false;
        this.cpus = []; // Array of CPU instances
        this.schedulerAlgo = null; // Selected Scheduling Algorithm
        this.clock = 0;
        this.simSpeed = 0; // Speed that the simulation runs at (the main clock basically)
        this.readyQueue = null;


        
        this.cpus = [];
        var readyQueueVar = [];
        for(var i=0; i<jobCount; i++) {
            var job = new Job(i);
            readyQueueVar.push(job);
        }
        this.readyQueue = new ReadyQueue(readyQueueVar);
        for(var j=0; j<cpuCount; j++) {
            this.cpus.push(new CPU(this));
        }
        this.simSpeed = simSpeed;
    }

    getReadyQueue() {
        return this.readyQueue;
    }

    getClock() {
        return this.clock;
    }

    setSchedulerAlgo(algo) {
        this.algo = algo;
    }

    setUpdater(updater) {
        this.updater = updater;
        this.updater.disable_inputs();
    }

    nextStep() {
        // Clock tick
        this.clock++;
        // Run all the CPUs on clock tick
        for(var i=0; i < this.cpus.length; i++) {
            var cpu = this.cpus[i];
            switch (this.schedulerAlgo) {
                case "FCFS":
                    cpu.runFCFS();
                    break;
                case "SJF":
                    cpu.runSJF();
                    break;
                case "SRTF":
                    cpu.runSRTF();
                    break;
                case "RR":
                    cpu.runRR();
                    break;
                case "PNP":
                    cpu.runPNP();
                    break;
                case "PP":
                    cpu.runPP();
                    break;
                default:
                    // Default is FCFS
                    cpu.runFCFS();
            }
        }
    }

    async run() {
        // Clock tick
        this.clock++;

        // Run all the CPUs on clock tick
        for (var i = 0; i < this.cpus.length; i++) {
            var cpu = this.cpus[i];
            switch (this.schedulerAlgo) {
                case "FCFS":
                    cpu.runFCFS();
                    break;
                case "SJF":
                    cpu.runSJF();
                    break;
                case "SRTF":
                    cpu.runSRTF();
                    break;
                case "RR":
                    cpu.runRR();
                    break;
                case "PNP":
                    cpu.runPNP();
                    break;
                case "PP":
                    cpu.runPP();
                    break;
                default:
                    // Default is FCFS
                    cpu.runFCFS();
            }
        }

        // Update the actual browser (Jobs Table, "CPU" section, "Ready Queue" section, "Average" section, and Gantt Chart)
        this.updater.update_table();
        this.updater.update_page();

        if (!this.ended) {
            await this.sleep((1000 * this.simSpeed));
            this.run();
        } else {
            this.end();
        }
    }


    sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

    // This is used for the "Finish" button to auto-complete it
    runToComplete() {
        // Update the actual browser (Jobs Table, "CPU" section, "Ready Queue" section, "Average" section, and Gantt Chart)
        this.updater.update_table();
        this.updater.update_page();

        // Run all the CPUs on clock tick
        for (var i = 0; i < this.cpus.length; i++) {
            var cpu = this.cpus[i];
            switch (this.schedulerAlgo) {
                case "FCFS":
                    cpu.runFCFS();
                    break;
                case "SJF":
                    cpu.runSJF();
                    break;
                case "SRTF":
                    cpu.runSRTF();
                    break;
                case "RR":
                    cpu.runRR();
                    break;
                case "PNP":
                    cpu.runPNP();
                    break;
                case "PP":
                    cpu.runPP();
                    break;
                default:
                    // Default is FCFS
                    cpu.runFCFS();
            }
        }

        // Clock tick
        this.clock++;

        if (!this.ended) {
            this.runToComplete();
        } else {
            this.end();
        }
    }

    end() {
        this.ended = true;
    }
}
