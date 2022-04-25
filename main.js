document.getElementById('my-select').addEventListener('change', function() {
    if(this.value == '4') {
        document.getElementById('timeQuantum').style.display = 'block';  
    }
    else{
        document.getElementById('timeQuantum').style.display = 'none';
    }
    console.log('You selected: ', this.value);
  });
    
document.getElementById('btn_Solve').addEventListener('click', ()=>{
    let res = [];
    let gChart  = [];
    let   algo = document.getElementById('my-select').value;
    let   arrivalTime = document.getElementById('arrivalTime').value.trim().replace( /  +/g, ' ' );
    let   burstTime = document.getElementById('brustTime').value.trim().replace( /  +/g, ' ' );
    let   arrivalTimes = arrivalTime.split(' ').map(p => Number(p));
    let   brustTimes = burstTime.split(' ').map(p => Number(p));
    if(algo == '1'){

        document.getElementById('algo').innerText = 'FCFS';
        // res = []
        // gChart  = [];
        res = fcfs(calculation(arrivalTimes,brustTimes));
        gChart = getFCFSGantt_Chart();   
    }
    else if(algo == '2'){
        console.log('SJF');
        document.getElementById('algo').innerText = 'SJF';
        // res = []
        // gChart  = [];
        res = sjf(calculation(arrivalTimes,brustTimes));
        gChart = getSJFGantt_Chart();
    }
    else if(algo == '3'){
        console.log('SRTF');
        document.getElementById('algo').innerText = 'SRTF';
            // res = []
            // gChart  = [];
        res = srtf(calculation(arrivalTimes,brustTimes));
        gChart = generalizedGantt_Chart();
    }
    else if(algo == '4'){
        const timeQuantum = document.getElementById('tQ').value;
        console.log('RR',timeQuantum);
        document.getElementById('algo').innerText = 'RR';
    }
    document.getElementById('result').innerHTML = getData(res);
    document.getElementById('avgWaitingTime').innerText = AverageWaitingTime(res);
    document.getElementById('avgTurnAroundTime').innerText = AverageTurnAroundTime(res);
    document.getElementById('gTitle').style.display ='block';
    document.getElementById('gantt_chart').innerHTML = getGantt_Chart(gChart) ;
    document.getElementById('gantt_chartVal').innerHTML = getGantt_ChartVal(gChart); 

})

function calculation(at,bt){
    let pName = [];
    for(let i = 0; i < at.length; i++){
        pName.push(`P${i+1}`);
    }
    let pros = [];
    for(let i = 0; i < at.length; i++){
        pros.push(new process(pName[i], at[i], bt[i]));
    }
return pros;
}

function AverageWaitingTime(res){
    let sum = 0;
    for(let i = 0; i < res.length; i++){
        sum += res[i].waitingTime;
    }
    return sum/res.length;
}
function AverageTurnAroundTime(res){
    let sum = 0;
    for(let i = 0; i < res.length; i++){
        sum += res[i].turnaroundTime;
    }
    return sum/res.length;
}
function getGantt_Chart(gchart){
    let str = '';
    for(let i = 0; i < gchart.length; i++){
        str += `<div id="a" class="col-1 border 1 text-center">${gchart[i].proc}</div>`;

    }
    return str;
}
function getGantt_ChartVal(gchart){
    let val = '';
    for(let i = 0; i < gchart.length; i++){
        val += `<div id="a" class="col-1 text-left">${gchart[i].startTime}</div>`;
    }
    val += `<div id="a" class="text-right">${gchart[gchart.length-1].endTime}</div>`;
    return val;
}
function getData(res){
    let str = '';
    for(let i = 0; i < res.length; i++){
        str += `<tr><td>${res[i].name}</td><td>${res[i].arrivalTime}</td><td>${res[i].burstTime}</td><td>${res[i].completionTime}</td><td>${res[i].turnaroundTime}</td><td>${res[i].waitingTime}</td><td>${res[i].responseTime}</td></tr>`;
    }
    return str;
}