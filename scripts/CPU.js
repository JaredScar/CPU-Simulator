/**
 * Created by user on 10/12/2018.
 */
class CPU {
    private var readyQueue; // readyQueue in which jobs are gotten from

    public CPU(readyQueue) {
        this.readyQueue = readyQueue;
    }

    public runFCFS() {
        // Get a job done with the First-Come First-Served algo
    }
    public runSJF() {
        // Get a job done with the Shortest Job First algo
    }
    public runSRTF() {
        // Get a job done with the Shortest Remaining Time First algo
    }
    public runRR() {
        // Get a job done with the Round-Robin algo
    }
    public runPNP() {
        // Get a job done with the Priority Non-Preemptive algo
    }
    public runPP() {
        // Get a job done with the Priority Preemptive algo
    }
}