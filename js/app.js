const form = document.querySelector("form");
const button = document.querySelector("#formbtn");
const keeper = document.querySelector("#keeper");
const edit = document.querySelector("#edit");
const del = document.querySelector("#delete");
const wrapper = document.querySelector("#infowrapper");
const li = document.querySelector("#listitem");

function validate() {
  if (keeper.value.length <= 6) {
    alert("Eng kamida 6 belgidan iborat bo'lsin");
    keeper.focus();
    keeper.style.outLineColor = "red";
    return false;
  }

  return true;
  2;
}

function getLS() {
  let infoLS = [];
  if (localStorage.getItem("infoLS")) {
    infoLS = JSON.parse(localStorage.getItem('infoLS'));
  }
  return infoLS;
}

function createitem(info) {
  return `
<div id="listitem">
<div id="infopart">${info.information}</div>
<div id="buttons"><button id="edit" data-id = "${info.id},edit">EDIT</button><button id="delete" data-id = "${info.id}">DELETE</button></div>
</div>
`;
}
document.addEventListener('DOMContentLoaded', function(){
let getlS = getLS();
getLS.length > 0 && getLS.forEach(element => {
    let item = createitem(element);
    wrapper.innerHTML += item;
});
})

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    let infoLS = getLS();
    let info = {
      information: keeper.value,
      id: Date.now()
    };
    infoLS.push(info);
    localStorage.setItem("infoLS", JSON.stringify(infoLS));
    form.reset();
    let infoo = createitem(info);
    wrapper.innerHTML += infoo;
  });
