let sjfGantt_Charts = [];
let sjfBurstTime = [];
function sjf(sjfProcesses) {
    console.log(sjfProcesses)
  sjfGantt_Charts = [];  
  sjfBurstTime = sjfProcesses.map((p) => p.burstTime);
    sjfGantt_Charts.push(
      new gantt_Chart(sjfProcesses[0].name, sjfProcesses[0].arrivalTime, sjfProcesses[0].arrivalTime+ sjfProcesses[0].burstTime)
    );
  sjfProcesses[0].isArrived = true;
  sjfBurstTime = sjfBurstTime.filter((p) => p !== sjfBurstTime[0]);
  sjfBurstTime = sjfBurstTime.sort((a, b) => a - b);
  for (let i = 1; i < sjfProcesses.length; i++) {
    let p = getSJFProcesses(sjfBurstTime, sjfProcesses);
    sjfBurstTime = sjfBurstTime.filter((p) => p !== sjfBurstTime[0]);
    console.log(p)
    sjfGantt_Charts.push(new gantt_Chart(p.name,sjfGantt_Charts[i-1].endTime,sjfGantt_Charts[i-1].endTime+p.burstTime)); 
    
  }
  return calculateCTWTTATRT(getSJFGantt_Chart(),sjfProcesses);
}

function getSJFGantt_Chart(){

    return sjfGantt_Charts;
}
function getSJFProcesses(burst, proc) {

let p = findProcess(burst[0],proc);
p.isArrived = true;
return p;
}
function findMinSJFProcesses(pro) {
let min = pro[0];
for (let i = 1; i < pro.length; i++) {
  if (pro[i] < min) {
    min = pro[i];
  }
}
return min;
}
function findProcess(p,pros){

    for (let i = 0; i < pros.length; i++) {
      if (p === pros[i].burstTime && pros[i].isArrived === false) {
        return pros[i];
      }
    }
    return new process(0,0,0);

}
function calculateCTWTTATRT(g_Chart,pr){

    for (let i = 0; i < pr.length; i++) {
        for (let j = 0; j < g_Chart.length; j++) {
          if (pr[i].name === g_Chart[j].proc) {
            pr[i].completionTime = g_Chart[j].endTime;
            pr[i].turnaroundTime =
            pr[i].completionTime - pr[i].arrivalTime;
            pr[i].waitingTime =
            pr[i].turnaroundTime - pr[i].burstTime;
          }
        }
    
        pr[i].responseTime =
        g_Chart.find((p) => p.proc === pr[i].name).startTime -
        pr[i].arrivalTime;
      }
      return pr;
}
