$(document).ready(function(){
  // Bootstrap script activation.
  $('#database').DataTable();

  // fonction to change the layout displayed
  $(".fa-th-large").click(function() {
    $("#database").hide();
    $("#database_wrapper").hide();
    $(".content").css("display", "flex");
  });

  $(".fa-bars").click(function() {
    $("#database").show();
    $("#database_wrapper").show();
    $(".content").hide();
  });

  // Script selectize that will fit for country selection. Documentation here https://selectize.github.io/selectize.js/

  $('#select-country').selectize({
      sortField: 'text'
  });

  // Fonction to hide the bootstrap script and retarget the content element ouside of it
  $(".col-sm-6").hide();
  $("#database_length").appendTo(".rightside-menu");
  $("#database_filter").appendTo(".rightside-menu");

  // Fonction to change the togglebar icon when click on it
  $(".fa-square-o").click(function() {
    $(this).toggleClass("fa-check-square");
    $(".database").find("i").not(this).removeClass("fa-check-square");
  });


  // Fonction to change the add category icon when hover on it
  $("td").hover(function() {
    $(".fa-plus", this).removeClass("fa-plus").addClass("fa-plus-circle");
  }, function() {
    $(".fa-plus-circle", this).removeClass("fa-plus-circle").addClass("fa-plus");
  });

  // Fonction to toggle the detail popup when click on the data list item
  $(".fa-square-o", this).click(function() {
      $("#data1").toggle(); // Here we have to implement a fonction that will select the specific data attribute to the specific clicked id.
      $("footer").slideToggle();
  });


  $(".fa-plus").click(function() {
    $("#data1").toggle(); // Here we have to implement a fonction that will select the specific data attribute to the specific clicked id.
    $("footer").slideToggle();
  });

  $(".image-box span", this).click(function() {
      $("#data1").toggle(); // Here we have to implement a fonction that will select the specific data attribute to the specific clicked id.
      $("footer").slideToggle();
  });
});

  // script function for charts
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;

        //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "50px " + fontStyle;

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.bottom) / 1);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;

        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }
  });

  // Chart that show the shares by browsers see this link to add data http://www.chartjs.org/docs/latest/developers/api.html

  var ctx = $("#chart1");

  var config = {
      type: 'doughnut',
      data: {
          datasets: [{
              data: [45, 25, 20, 10],
              backgroundColor: [
                '#8CA4FB',
                '#718DF3',
                '#2D50D2',
                '#051F7D',
              ],
              label: 'Shares'
          }],
          labels: [
              "mozilla",
              "chrome",
              "explorer",
              "safari",
          ]
      },

      options: {
        elements: {
          center: {
            text: 'shares in %',
            sidePadding: 20
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
              display: true,
              position: 'bottom',
              boxWidth: '10'
          },
          animation: {
              animateScale: true,
              animateRotate: true
          },
          circumference: Math.PI,
			    rotation: 1.0 * Math.PI
      }
  };
  var chart1 = new Chart(ctx, config);

  // Chart that show the shares by landing pages, see this link to add data http://www.chartjs.org/docs/latest/developers/api.html

  var ctx = $("#chart3");
  var barChartData = {
       labels: ["Default", "Advertorial1", "Checkout Page", "Landing Page 2"],
       datasets: [{
           label: 'Conversion Rate',
           backgroundColor: ['#8CA4FB', '#8CA4FB', '#8CA4FB', '#8CA4FB'],
           yAxisID: "y-axis-1",
           data: [1, 4, 10, 25]
       }, {
           label: 'EPC',
           backgroundColor: ['#2D50D2', '#2D50D2', '#2D50D2', '#2D50D2'],
           yAxisID: "y-axis-2",
           data: [30, 40, 60, 90]
       }]

   };
  var config = {
      type: 'bar',
      data: barChartData,
      options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
              position: 'bottom',
              boxWidth: '10'
          },
          scales: {
              yAxes: [{
                  type: "linear",
                  display: true,
                  position: "left",
                  labelString: "Conversion Rate",
                  id: "y-axis-1",
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                  }
              }, {
                  type: "linear",
                  display: true,
                  position: "right",
                  labelString: "EPC",
                  id: "y-axis-2",
                  ticks: {
                    // Include a porcentage sign in the ticks
                    callback: function(value, index, values) {
                        return value + '%';
                    }
                  },
                  gridLines: {
                      display: false,
                      drawOnChartArea: false
                  }
              }],
          }
      }
  };
  var chart3 = new Chart(ctx, config);
