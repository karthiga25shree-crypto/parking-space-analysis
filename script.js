// =====================================
// PARKING DATA
// =====================================

const parkingData = {

    totalSpaces: 50,

    occupiedSpaces: 36,

    hourly: {
        labels: [
            "8 AM",
            "9 AM",
            "10 AM",
            "11 AM",
            "12 PM",
            "1 PM",
            "2 PM",
            "3 PM",
            "4 PM",
            "5 PM"
        ],

        values: [
            18,
            25,
            31,
            36,
            40,
            42,
            47,
            45,
            39,
            35
        ]
    },

    daily: {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],

        values: [
            35,
            39,
            36,
            42,
            45
        ]
    }
};


// =====================================
// DASHBOARD CALCULATIONS
// =====================================

const total = parkingData.totalSpaces;

const occupied = parkingData.occupiedSpaces;

const available = total - occupied;

const occupancyRate =
    Math.round((occupied / total) * 100);


// Display values

document.getElementById("totalSpaces").textContent =
    total;

document.getElementById("occupiedSpaces").textContent =
    occupied;

document.getElementById("availableSpaces").textContent =
    available;

document.getElementById("occupancyRate").textContent =
    occupancyRate + "%";


// =====================================
// PEAK HOUR
// =====================================

const hourlyValues =
    parkingData.hourly.values;

const highestValue =
    Math.max(...hourlyValues);

const peakIndex =
    hourlyValues.indexOf(highestValue);

const peakHour =
    parkingData.hourly.labels[peakIndex];

document.getElementById("peakHour").textContent =
    peakHour;


// =====================================
// PARKING SLOT DISPLAY
// =====================================

const parkingGrid =
    document.getElementById("parkingGrid");


for (let i = 1; i <= total; i++) {

    const slot =
        document.createElement("div");

    slot.classList.add("slot");


    // First occupied spaces are marked occupied

    if (i <= occupied) {

        slot.classList.add("occupied");

        slot.textContent =
            "P" + i;

        slot.title =
            "Parking Slot " + i + " - Occupied";

    }

    else {

        slot.classList.add("available");

        slot.textContent =
            "P" + i;

        slot.title =
            "Parking Slot " + i + " - Available";

    }


    parkingGrid.appendChild(slot);
}


// =====================================
// HOURLY CHART
// =====================================

const hourlyCanvas =
    document.getElementById("hourlyChart");


new Chart(hourlyCanvas, {

    type: "bar",

    data: {

        labels:
            parkingData.hourly.labels,

        datasets: [

            {
                label:
                    "Occupied Spaces",

                data:
                    parkingData.hourly.values,

                borderWidth: 1
            }

        ]

    },

    options: {

        responsive: true,

        scales: {

            y: {

                beginAtZero: true,

                max: total,

                title: {

                    display: true,

                    text:
                        "Occupied Spaces"

                }

            }

        }

    }

});


// =====================================
// DAILY CHART
// =====================================

const dailyCanvas =
    document.getElementById("dailyChart");


new Chart(dailyCanvas, {

    type: "line",

    data: {

        labels:
            parkingData.daily.labels,

        datasets: [

            {
                label:
                    "Average Occupied Spaces",

                data:
                    parkingData.daily.values,

                borderWidth: 3,

                tension: 0.3,

                fill: false
            }

        ]

    },

    options: {

        responsive: true,

        scales: {

            y: {

                beginAtZero: true,

                max: total

            }

        }

    }

});


// =====================================
// OCCUPANCY ANALYSIS
// =====================================

const highest =
    Math.max(...hourlyValues);

const lowest =
    Math.min(...hourlyValues);

const average =
    Math.round(
        hourlyValues.reduce(
            (a, b) => a + b, 0
        ) / hourlyValues.length
    );


document.getElementById(
    "highestOccupancy"
).textContent =
    Math.round((highest / total) * 100) + "%";


document.getElementById(
    "lowestOccupancy"
).textContent =
    Math.round((lowest / total) * 100) + "%";


document.getElementById(
    "averageOccupancy"
).textContent =
    Math.round((average / total) * 100) + "%";
