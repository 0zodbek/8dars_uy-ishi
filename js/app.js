const form = document.querySelector("form");
const button = document.querySelector("#formbtn");
const keeper = document.querySelector("#keeper");
const edit = document.querySelector("#edit");
const del = document.querySelectorAll(".delete");
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
    infoLS = JSON.parse(localStorage.getItem("infoLS"));
  }
  return infoLS;
}

function createitem(info) {
  return `
<div id="listitem">
<div id="infopart">${info.information}</div>
<div id="buttons"><button id="edit" data-id = "${info.id},edit">EDIT</button><button class="delete" data-id = "${info.id}">DELETE</button></div>
</div>
`;
}
document.addEventListener("DOMContentLoaded", function () {
  let infos = getLS();
  infos.length > 0 &&
    infos.forEach((element) => {
      let item = createitem(element);
      wrapper.innerHTML += item;
    });
  const deletebtns = document.querySelectorAll(".delete");
  deletebtns.length > 0 &&
    deletebtns.forEach(function(element) {
      element.addEventListener("click", function(event) {
        event.preventDefault();
        let id = this.getAttribute('data-id');
        let isdelete = confirm("rostdan ham ochirishni hohlayszmi");
        if (isdelete && id) {
          let copiedInfos = JSON.parse(JSON.stringify(infos));
          copiedInfos = copiedInfos.filter(function(el) {
            return el.id != id;
          });
          localStorage.setItem('infoLS', JSON.stringify(copiedInfos));
          window.location.reload();
        }
      })
    })
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
      id: Date.now(),
    };
    infoLS.push(info);
    localStorage.setItem("infoLS", JSON.stringify(infoLS));
    form.reset();
    let infoo = createitem(info);
    wrapper.innerHTML += infoo;
  });
