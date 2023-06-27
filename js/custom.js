// Lấy canvas và context của canvas
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext("2d");

// Lấy dữ liệu cho biểu đồ
var chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My Dataset",
      data: [10, 20, 15, 25, 18, 30, 22],
      fill: false,
      borderColor: "rgb(50, 192, 192)",
      tension: 0.2,
    },
  ],
};

// Thiết lập các options cho biểu đồ
var chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

// Tạo đối tượng biểu đồ bằng Chart.js
var myChart = new Chart(ctx, {
  type: "line",
  data: chartData,
  options: chartOptions,
});

// Cập nhật dữ liệu và vẽ lại biểu đồ
function updateChart(newLabel, newData) {
  myChart.data.datasets[0].data.push(newData);
  myChart.data.labels.push(newLabel)
  myChart.update();
}


// Lấy phần tử div để hiển thị tọa độ
var coordinatesTooltip = document.getElementById("coordinates-tooltip");

// Thêm sự kiện mousemove vào canvas để hiển thị tọa độ vị trí con trỏ chuột
canvas.addEventListener("mousemove", function (event) {
  // Lấy tọa độ của canvas trên trang web
  var canvasRect = canvas.getBoundingClientRect();

  // Lấy tọa độ chuột khi di chuyển trên canvas
  var mouseY = event.clientY - canvasRect.top;
  var mouseX = event.clientX - canvasRect.left;

  // Tính toán tọa độ của điểm được click trên biểu đồ
  var yValue = myChart.scales["y-axis-0"].getValueForPixel(mouseY);

  // Hiển thị tọa độ của điểm được click bên cạnh con trỏ chuột
  var yCoordinate = document.getElementById("y-coordinate");
  yCoordinate.textContent = "Y: " + yValue.toFixed(2);

  // Đặt vị trí của phần tử div bên cạnh con trỏ chuột
  coordinatesTooltip.style.top = mouseY - 30 + "px";
  coordinatesTooltip.style.left = mouseX - 30 + "px";
  // Hiển thị phần tử div
  coordinatesTooltip.classList.add("show");
});