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
        for(var i=0; i<cpuCount; i++) {
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

    nextStep() {
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
        // Clock tick:
        this.clock++;
    }

    run() {
        // Run all the CPUs on clock tick
        for(var i=0; i < cpus.length; i++) {
            var cpu = cpus[i];
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

        if(!ended) {
            setTimeout(this.run(), this.simSpeed);
            this.run();
        } else {
            this.end();
        }
    }

    end() {}
}
