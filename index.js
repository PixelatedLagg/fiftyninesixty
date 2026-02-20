//calculate all sets from dropdown
let jsonObject = [];
let setDropdown = document.getElementById("sets");
let getSetlist = document.getElementById("get-set-list");
let setlist = document.getElementById("set-list");

fetch("data.json")
    .then((res) => res.text())
    .then((text) => {
        jsonObj = JSON.parse(text);
        console.log(jsonObj);
        for (var i = 0; i < jsonObj.sets.length; i++) {
            var set = jsonObj.sets[i];
            setDropdown.innerHTML += `<option value="${set.date}">${set.date}</option>`;
        }
    })
.catch((e) => console.error(e));

getSetlist.onclick = function() {
    console.log(setDropdown.value);
    for (var i = 0; i < jsonObj.sets.length; i++) {
        var set = jsonObj.sets[i];
        if (set.date !== setDropdown.value) {
            continue;
        }

        var setBuilder = "<h3>Will:</h3>";

        for (var j = 0; j < set.will.length; j++) {
            console.log("hello");
            setBuilder += `<p><strong>${set.will[j][0]}</strong> - <i>${set.will[j][1]}</i>`;
        }

        setBuilder += "<h3>Maximus:</h3>"

        for (var j = 0; j < set.max.length; j++) {
            setBuilder += `<p><strong>${set.max[j][0]}</strong> - <i>${set.max[j][1]}</i>`;
        }

        setlist.innerHTML = setBuilder;
        return;
    }
};