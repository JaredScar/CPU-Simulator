/**
 * Created by user on 10/12/2018.
 */
class Main_Handler {
    constructor(cpuCount, jobCount, quantum) {
        this.ended = false;
        this.cpus = []; // Array of CPU instances
        this.schedulerAlgo = null; // Selected Scheduling Algorithm
        this.clock = -1;
        this.quantum = 0; // Quantum field (for Round-Robin)
        this.readyQueue = null;
        this.autoComplete = false;


        
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
        this.quantum = quantum;
    }

    setAutoComplete(autoComplete) {
        this.autoComplete = autoComplete;
    }

    getReadyQueue() {
        return this.readyQueue;
    }

    getQuantum() {
        return this.quantum;
    }

    getClock() {
        return this.clock;
    }

    setSchedulerAlgo(algo) {
        this.schedulerAlgo = algo;
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

        if ((!this.ended) && !(this.autoComplete)) {
            await this.sleep(1000);
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
        }
    }

    end() {
        this.ended = true;
    }
}
