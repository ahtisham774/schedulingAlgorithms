    let fcfsGantt_chart = [];
    function fcfs(fcfsProcesses){
    fcfsGantt_chart = [];
    fcfsProcesses[0].completionTime = fcfsProcesses[0].arrivalTime + fcfsProcesses[0].burstTime;
    fcfsProcesses[0].turnaroundTime = fcfsProcesses[0].completionTime - fcfsProcesses[0].arrivalTime;
    fcfsProcesses[0].responseTime = 0;
    console.log(fcfsProcesses);
    fcfsGantt_chart.push(new gantt_Chart(fcfsProcesses[0].name, fcfsProcesses[0].arrivalTime, fcfsProcesses[0].arrivalTime+ fcfsProcesses[0].burstTime));
    for(let i = 1; i < fcfsProcesses.length; i++){
        if(fcfsProcesses[i].arrivalTime >= fcfsGantt_chart[i-1].endTime){
            fcfsGantt_chart.push(new gantt_Chart(fcfsProcesses[i].name, fcfsProcesses[i].arrivalTime, (fcfsProcesses[i].arrivalTime+fcfsProcesses[i].burstTime)));
        }
        else{
            fcfsGantt_chart.push(new gantt_Chart(fcfsProcesses[i].name, fcfsGantt_chart[i-1].endTime, (fcfsGantt_chart[i-1].endTime+fcfsProcesses[i].burstTime)));
        }
        fcfsProcesses[i].completionTime = fcfsGantt_chart[i].endTime;
        fcfsProcesses[i].turnaroundTime = fcfsProcesses[i].completionTime - fcfsProcesses[i].arrivalTime;
        fcfsProcesses[i].responseTime = fcfsGantt_chart[i].startTime - fcfsProcesses[i].arrivalTime ;
        fcfsProcesses[i].waitingTime = fcfsProcesses[i].turnaroundTime - fcfsProcesses[i].burstTime;
    }
    return fcfsProcesses;
   
}

function getFCFSGantt_Chart(){
    return fcfsGantt_chart;
}
