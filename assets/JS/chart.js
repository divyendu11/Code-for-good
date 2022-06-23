// For status gender representation
var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:3000/find";

xmlhttp.open("GET",url,true);
xmlhttp.send();
xmlhttp.onreadystatechange=function(){
  if(this.readyState==4 && this.status==200){
    var data = JSON.parse(this.responseText);    
    console.log(data)
    info=[0,0]
    for(var i=0;i<data.length;i++){
      if (data[i].gender=='Male'){
        info[0]++
      }else{
        info[1]++
      }
    }

  

  }
  
  var ctx = document.getElementById('chart').getContext('2d');


      var ans =new Chart(ctx,{
        type:'doughnut',
        data:{
      
          labels: [
            'Male',
            'Female'
          ],
          datasets: [{
            label: 'Gender',
            data: info,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(0, 0, 255)',
            ],
            hoverOffset: 5
          }]
          
        }
      })

}


// For status graph representation
var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:3000/find";
xmlhttp.open("GET",url,true);
xmlhttp.send();
xmlhttp.onreadystatechange=function(){
  if(this.readyState==4 && this.status==200){
    var data = JSON.parse(this.responseText);    
    console.log(data)
    info2=[0,0]
    for(var i=0;i<data.length;i++){
      if (data[i].status=='Active'){
        info2[0]++
      }else{
        info2[1]++
      }
    }
    console.log(info2)

  

  }
  
  var ctx = document.getElementById('chart2').getContext('2d');


      var ans =new Chart(ctx,{
        type:'doughnut',
        data:{
      
          labels: [
            'Active',
            'Inactive'
          ],
          datasets: [{
            label: 'Status',
            data: info2,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(0, 0, 255)',
            ],
            hoverOffset: 5
          }]
          
        }
      })

    
}










