/**
 * Created by user on 10/12/2018.
 */
class Main_Handler {
    private var ended = false;
    private var cpus; // Array of CPU instances
    private var schedulerAlgo; // Selected Scheduling Algorithm
    private var clock = 0;
    private var simSpeed; // Speed that the simulation runs at (the main clock basically)
    public Main_Handler(cpuCount, jobCount, simSpeed) {
        this.cpus = [];
        var readyQueue = new ReadyQueue();
        for(var i=0; i<jobCount; i++) {
            readyQueue.add(new Job());
        }
        for(var i=0; i<cpuCount; i++) {
            this.cpus.push(new CPU(readyQueue));
        }
    }

    public run() {
        this.clock++;
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

        if(!ended) {
            setTimeout(this.run(), this.simSpeed);
            this.run();
        } else {
            this.end();
        }
    }

    public end() {}
}
