let srtfGantt_Chart = [];
let burstTime = [];
function srtf(srtfProcesses) {

  srtfGantt_Chart = [];  
  burstTime = srtfProcesses.map((p) => p.burstTime);
  srtfProcesses.sort(function (a, b) {
    return a.arrivalTime - b.arrivalTime;
  });
 
  srtfGantt_Chart.push(new gantt_Chart(srtfProcesses[0].name, srtfProcesses[0].arrivalTime,srtfProcesses[0].arrivalTime+1 ));
  burstTime[0]--;
  let start = 0;
  let end = 1;
  let max_burstTime = Math.max(...burstTime);
  let i = 1;
  gIndex = 1;
  while (max_burstTime > 0) {
    let i = getProcesses(start, end, srtfProcesses);
    // console.log(srtfProcesses[i]);
    if (burstTime[i] > 0) { 
      srtfGantt_Chart.push(
        new gantt_Chart(
          srtfProcesses[i].name,
          srtfGantt_Chart[gIndex - 1].endTime,
          srtfGantt_Chart[gIndex-1].endTime + 1
        )
      );
      end++;
    //   srtfGantt_Chart[gIndex].endTime = end;
      gIndex++;
      burstTime[i]--;
    }

    max_burstTime = Math.max(...burstTime);
  }

  const data = getCalculation(generalizedGantt_Chart(),srtfProcesses)
    return data;
} // end of srtf

function getSRTFGantt_Chart() {
  return srtfGantt_Chart;
}

function getProcesses(start, end, pross) {
  let tempArr = [];
  if (end <= Math.max(...pross.map((p) => p.arrivalTime))) {
    for (let i = start; i <= end; i++) {
      if (i >= pross.length) {
        break;
      } else {
        tempArr.push(burstTime[i]);
      }
    }
  } else {
    for (let i = 0; i < pross.length; i++) {
      if (pross[i].arrivalTime <= end && burstTime[i] > 0) {
        tempArr.push(burstTime[i]);
      }
    }
  }
  let p = findMinProcesses(tempArr);
  return burstTime.indexOf(p);
}
function findMinProcesses(bTime) {
  let min = bTime[0];
  for (let i = 1; i < bTime.length; i++) {
    if (bTime[i] < min && bTime[i] > 0) {
      min = bTime[i];
    }
  }
  return min;
}

function getCalculation(gantt_Chart,pross) {

   
  for (let i = 0; i < pross.length; i++) {
    for (let j = 0; j < gantt_Chart.length; j++) {
      if (pross[i].name === gantt_Chart[j].proc) {
        pross[i].completionTime = gantt_Chart[j].endTime;
        pross[i].turnaroundTime =
          pross[i].completionTime - pross[i].arrivalTime;
        pross[i].waitingTime =
          pross[i].turnaroundTime - pross[i].burstTime;
          pross[i].responseTime = pross[i].completionTime - pross[i].turnaroundTime;
      }
    }

    pross[i].responseTime =
      gantt_Chart.find((p) => p.proc === pross[i].name).startTime;
  }
  return pross;
}
function generalizedGantt_Chart() {
  let generalGantt_Chart = [];  
  generalGantt_Chart.push(new gantt_Chart(srtfGantt_Chart[0].proc, srtfGantt_Chart[0].startTime, srtfGantt_Chart[0].endTime));
  for (let i = 1; i < srtfGantt_Chart.length; i++) {
    if (generalGantt_Chart[generalGantt_Chart.length-1].proc === srtfGantt_Chart[i].proc) {
      generalGantt_Chart[generalGantt_Chart.length-1].endTime = srtfGantt_Chart[i].endTime;
    } else {
      generalGantt_Chart.push(
        new gantt_Chart(
          srtfGantt_Chart[i].proc,
          srtfGantt_Chart[i].startTime,
          srtfGantt_Chart[i].endTime
        )
      );
    }
  }
  return generalGantt_Chart;
}
