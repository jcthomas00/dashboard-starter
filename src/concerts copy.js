class Chart{
    
    constructor(){
        let myChart;
    }

    render(labels, followerCounts, colors){
        const data = {
            labels: labels,
            datasets: [{
              label: 'Artist Follower Counts',
              data: followerCounts,
              backgroundColor: colors
            }]
          };
    
        const config = {
            type: 'polarArea',
            data: data,
            options: {
                events: ['mousemove'],
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
          };
          if(this.myChart){
            this.myChart.destroy();
          }
          this.myChart = new Chart(document.getElementById('myChart'), config);
    }

}

export default Chart;
