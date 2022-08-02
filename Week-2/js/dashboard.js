//co the lay du lieu trong mang
const Devices = [
        {
                "device": "TV",
                "macAdress": "00:1B:44:11:3A:B7",
                "ip": "127.0.0.2",
                "createDate": "2021-05-31",
                "power": "50"
        },
        {
                "device": "Sasher",
                "macAdress": "00:1B:44:11:3A:B8",
                "ip": "127.0.0.3",
                "createDate": "2021-05-31",
                "power": "60"
        },
        {
                "device": "Refigerator",
                "macAdress": "00:1B:44:11:3A:B9",
                "ip": "127.0.0.4",
                "createDate": "2021-05-31",
                "power": "80"
        },
        {
                "device": "Selling Fan",
                "macAdress": "00:1B:44:11:3A:B2",
                "ip": "127.0.0.5",
                "createDate": "2021-05-31",
                "power": "100"
        }
]
//lay du lieu tren file json
const getProducts = async () => {
        try {
                const results = await fetch("./data/device.json");
                const data = await results.json();

                const devices = data.Devices;

                return devices;
        } catch (err) {
                console.log(err);
        }
};
//check loi
function showError(input, message) {
        let parent = input.parentElement;
        let small = parent.querySelector('small');
        parent.classList.add("error");
        small.innerText = message;
}
function showSuccess(input) {
        let parent = input.parentElement;
        let small = parent.querySelector('small');
        parent.classList.remove("error");
        small.innerText = "";
}
function checkEmtyError(listInput) {
        let isEmtyError = false;
        listInput.forEach(input => {
                input.value = input.value.trim();
                if (!input.value) {
                        isEmtyError = true;
                        showError(input, "Không được để trống!");
                } else {
                        showSuccess(input);
                }
        });
        return isEmtyError;
}
// load du lieu
const displayProductItems = items => {
        let displayProduct = items.map((divice, index) => `
         <tr>
          <td>${divice.device}</td>
          <td>${divice.macAdress}</td>
          <td>${divice.ip}</td>
          <td>${divice.createDate}</td>
          <td>${divice.power}</td>
          <td>
          <div class="action">
          <span onclick="DeleteDe(${index})"  class="delete"><i class="fa fa-trash" aria-hidden="true"></i></span>
          <span onclick="Edit(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
        </div>
         </tr>
 `);
        displayProduct = displayProduct.join("");
        if (divece) {
                divece.innerHTML = displayProduct;
        }
}
const divece = document.querySelector(".main-device");
const load = window.addEventListener("DOMContentLoaded", async function () {
        var nas = localStorage.getItem('name');
        var password = localStorage.getItem('password');
        if (!nas || !password) {
                window.location.href = "/signin.html";
        } else {

                // const products = await getProducts();
                const products = Devices;
                var total = 0;
                products.map(item => {
                        total += parseInt(item.power);
                });

                displayProductItems(products);
                document.getElementsByClassName('spanTotal')[0].innerText = total;
        }

});
//remove 
function DeleteDe(x) {
        var total = 0;
        Devices.splice(x, 1);
        labels.splice(x, 1);
        power.splice(x, 1);
        backgroundColor.splice(x, 1);

        Devices.map(item => {
                total += parseInt(item.power);
        });
        displayProductItems(Devices);
        document.getElementsByClassName('spanTotal')[0].innerText = total;
        myChart.update();

}

//add DEvice
var names = document.querySelector('#name');
var mac = document.querySelector('#mac');
var ip = document.querySelector('#ip')
var number = document.querySelector('#number');
var date = document.querySelector('#date');
function getRandomInt(max) {
        return Math.floor(Math.random() * max);
}
async function addDevice() {
        let isError = checkEmtyError([names, mac, ip, number, date]);
        if (!isError) {
                var total = 0;
                Devices.map(item => {
                        total += parseInt(item.power);
                });
                newDevice = {
                        device: names.value,
                        macAdress: mac.value,
                        ip: ip.value,
                        createDate: date.value,
                        power: number.value
                };
                total += parseInt(newDevice.power);

                let background = `rgb(${getRandomInt(255)}, ${getRandomInt(255)},${getRandomInt(255)})`;
                if (newDevice) {
                        Devices.push(newDevice);
                        labels.push(newDevice.device);
                        backgroundColor.push(background);
                        power.push(newDevice.power)

                }
                displayProductItems(Devices);

                document.getElementsByClassName('spanTotal')[0].innerText = total;
                myChart.update();
                names.value = "";
                mac.value = "";
                ip.value = "";
                number.value = "";
                date.value = "";
        } else {
                console.log("noooo")
        }

}
//chart
const labels = [
        'TV',
        'Washer',
        'Refigeator',
        'Seling'

];

const backgroundColor = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(255,140,0)'
];
const power = [50, 60, 80, 100]
const data = {
        labels: labels,
        datasets: [{
                label: 'My First Dataset',
                data: power,
                backgroundColor: backgroundColor,
                hoverOffset: 0
        }]
};
const config = {
        type: 'doughnut',
        data: data,
};
const myChart = new Chart(
        document.getElementById('myChart'),
        config
);
function toggleMenu() {
        let toggle = document.querySelector(".toggle");
        let topbar = document.querySelector(".topbar");
        let navigation = document.querySelector(".navigation");
        let navigation2 = document.querySelector(".navigation2");
        let main = document.querySelector(".main");
        toggle.classList.toggle("active");
        topbar.classList.toggle("active");
        navigation.classList.toggle("active");
        navigation2.classList.toggle("active");
        main.classList.toggle("active");

}
// dang xuat
function SignOut() {
        localStorage.removeItem("name");
        localStorage.removeItem("password");
        window.location.href = "/signin.html?"
}


//edit
function Edit(x) {
        let devicetmp = {};
        devicetmp = Devices[x];
        document.getElementById("nameEit").value = devicetmp.device;
        document.getElementById("macEdit").value = devicetmp.macAdress;
        document.getElementById("ipEdit").value = devicetmp.ip;
        document.getElementById("dateEdit").value = devicetmp.createDate;
        document.getElementById("numberEdit").value = devicetmp.power;
        model.classList.toggle('hide');
        // SaveDevice(x);
}
var btnOpen = document.querySelector('.openEdit');
var model = document.querySelector('.model');
var iconClose = document.querySelector('.model_herder span')
var iconSave = document.querySelector('.model_footer button')

var txtinpuEdit = document.querySelector('#editteinput')
function toogle() {
        model.classList.toggle('hide');
}

iconSave.addEventListener('click', function () {
        var x;
        var txtnameEdit = document.querySelector("#nameEit")
        var txtmacEdit = document.querySelector("#macEdit")
        var txtipEdit = document.querySelector("#ipEdit")
        var txtdateEdit = document.querySelector("#dateEdit")
        var txtnumberEdit = document.querySelector("#numberEdit");
        let iserror = checkEmtyError([txtnameEdit, txtnumberEdit]);
        if (!iserror) {
                Devices.map((item, index) => {
                        if (item.ip == txtipEdit.value.trim()) {
                                x = index;
                                return
                        }
                });
                var total = 0;
                let devicetmp1 = {};
                devicetmp1 = {
                        device: txtnameEdit.value.trim(),
                        macAdress: txtmacEdit.value.trim(),
                        ip: txtipEdit.value.trim(),
                        createDate: txtdateEdit.value.trim(),
                        power: txtnumberEdit.value.trim(),
                }
                labels[x] = devicetmp1.device;
                power[x] = devicetmp1.power;
                Devices[x] = devicetmp1;
                Devices.map(item => {
                        total += parseInt(item.power);
                });
                displayProductItems(Devices);
                document.getElementsByClassName('spanTotal')[0].innerText = total;
                myChart.update();
                model.classList.toggle('hide');
        }

});
iconClose.addEventListener('click', function () {
        model.classList.toggle('hide');
})

