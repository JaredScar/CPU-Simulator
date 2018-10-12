/**
 * Created by user on 10/12/2018.
 */
class ReadyQueue {
    private var inQueue;
    public ReadyQueue() {}
    public ReadyQueue(jobsList) {
        this.inQueue = jobsList;
    }
    public add(job) {
        this.inQueue.push(job);
    }
    public remove(job) {
        this.inQueue.remove(job);
    }
}
