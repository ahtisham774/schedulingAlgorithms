let sfjGantt_Charts = [];
let sfjBurstTime = [];
function sjf(sjfProcesses) {
  sfjGantt_Charts = [];  
  sjfProcesses.sort(function (a, b) {
    return a.arrivalTime - b.arrivalTime;
  });
  sfjBurstTime = sjfProcesses.map((p) => p.burstTime);
    sfjGantt_Charts.push(
      new gantt_Chart(sjfProcesses[0].name, sjfProcesses[0].arrivalTime, sjfProcesses[0].burstTime)
    );
  sjfProcesses[0].isArrived = true;
  let start = sjfProcesses[0].arrivalTime;
  let end = sjfProcesses[0].burstTime;
  for (let i = 1; i < sjfProcesses.length; i++) {
    let p = getSJFProcesses(start, end, sjfProcesses);
    sfjGantt_Charts.push(new gantt_Chart(p.name,sfjGantt_Charts[i-1].endTime,sfjGantt_Charts[i-1].endTime+p.burstTime)); 
    end = sfjGantt_Charts[i].endTime;
    
  }
  return calculateCTWTTATRT(getSJFGantt_Chart(),sjfProcesses);
}

function getSJFGantt_Chart(){

    return sfjGantt_Charts;
}
function getSJFProcesses(start, end, proc) {
let tempArr = [];
if (end <= Math.max(...proc.map((p) => p.arrivalTime))) {  
  for (let i = start; i <= end; i++) {
    if (i >= proc.length && proc[i].isArrived === false) {
      break;
    } else {
      tempArr.push(sfjBurstTime[i]);
    }
  }
} else {
  for (let i = 0; i < proc.length; i++) {
    if (proc[i].arrivalTime <= end && proc[i].isArrived === false) {
      tempArr.push(sfjBurstTime[i]);
    }
  }
}
let p = findProcess(findMinSJFProcesses(tempArr),proc);
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
