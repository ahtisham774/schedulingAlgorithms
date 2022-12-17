    
document.getElementById('btn_Solve').addEventListener('click', ()=>{
    let res = [];
    let gChart  = [];
    let   algo = document.getElementById('my-select').value;
    let   arrivalTime = document.getElementById('arrivalTime').value.trim().replace( /  +/g, ' ' );
    let   burstTime = document.getElementById('brustTime').value.trim().replace( /  +/g, ' ' );
    let   arrivalTimes = arrivalTime.split(' ').map(p => Number(p));
    let   brustTimes = burstTime.split(' ').map(p => Number(p));
    const input = []
        for(let i = 0; i < arrivalTimes.length; i++){
                let p = {
                    'arrivalTime': arrivalTimes[i],
                    'burstTime': brustTimes[i]
                }
                input.push(p);
        }
    data = input.sort((a,b) => a.arrivalTime - b.arrivalTime);

    if(algo === '1'){

        document.getElementById('algo').innerText = 'FCFS';
        res = [];
        gChart  = [];
        res = fcfs(calculation(data));
        gChart = getFCFSGantt_Chart(); 
        displayData(res, gChart);  
    }
    else if(algo === '2'){
        console.log('SJF');
        document.getElementById('algo').innerText = 'SJF';
        res = [];
        gChart  = [];
        res = sjf(calculation(data));
        gChart = getSJFGantt_Chart();
        displayData(res, gChart);
    }
    else if(algo === '3'){
        console.log('SRTF');
        document.getElementById('algo').innerText = 'SRTF';
        res = [];
        gChart  = [];
        res = srtf(calculation(data));
        gChart = generalizedGantt_Chart();
        displayData(res, gChart);
    }

})


function displayData(res, gChart){
    document.getElementById('result').innerHTML = getData(res);
    document.getElementById('avgWaitingTime').innerText = AverageWaitingTime(res);
    document.getElementById('avgTurnAroundTime').innerText = AverageTurnAroundTime(res);
    document.getElementById('gTitle').style.display ='block';
    document.getElementById('gantt_chart').innerHTML = getGantt_Chart(gChart) ;
    document.getElementById('gantt_chartVal').innerHTML = getGantt_ChartVal(gChart); 
}

function calculation(d){
    let pName = [];
    for(let i = 0; i < d.length; i++){
        pName.push(`P${i+1}`);
    }
    let pros = [];
    for(let i = 0; i < d.length; i++){
        pros.push(new process(pName[i], d[i].arrivalTime, d[i].burstTime));
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