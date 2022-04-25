class process{
    name;
    arrivalTime;
    burstTime;
    waitingTime;
    turnaroundTime;
    completionTime;
    responseTime;
    isArrived;
    
    constructor(name, arrivalTime, burstTime){
       
       this.name = name;
       this.arrivalTime = arrivalTime;
       this.burstTime = burstTime;
       this.waitingTime = 0;
       this.turnaroundTime = 0;
       this.completionTime = 0;
       this.responseTime = 0;
       this.isArrived = false;
    }
 
}
class gantt_Chart{
    proc;
    startTime;
    endTime;
    constructor(proc, startTime, endTime){
        this.proc = proc;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    

}

// processes.push(new process("P1", 0, 8));
// processes.push(new process("P2", 1, 4));
// processes.push(new process("P3", 2, 2));
// processes.push(new process("P4", 3, 1));
// processes.push(new process("P5", 4, 3));
// processes.push(new process("P6", 5, 2));

// processes.push(new process("P1", 0, 5));
// processes.push(new process("P2", 1, 3));
// processes.push(new process("P3", 2, 4));
// processes.push(new process("P4", 4, 1));

// processes.push(new process("P1", 0, 7));
// processes.push(new process("P2", 1, 5));
// processes.push(new process("P3", 2, 3));
// processes.push(new process("P4", 3, 1));
// processes.push(new process("P5", 4, 2));
// processes.push(new process("P6", 5, 1));

// processes.push(new process("P1", 0, 9));
// processes.push(new process("P2", 1, 4));
// processes.push(new process("P3", 2, 9));

// processes.push(new process("P1", 0, 3));
// processes.push(new process("P2", 1, 2));
// processes.push(new process("P3", 2, 1));
// processes.push(new process("P4", 3, 4));
// processes.push(new process("P5", 5, 5));
// processes.push(new process("P6", 5, 2));


// processes.push(new process("P1", 3, 4));
// processes.push(new process("P2", 5, 3));
// processes.push(new process("P3", 0, 2));
// processes.push(new process("P4", 5, 1));
// processes.push(new process("P5", 4, 3));

// processes.push(new process("P1", 0, 2));
// processes.push(new process("P2", 3, 1));
// processes.push(new process("P3", 5, 6));

