//calculate all sets from dropdown
let jsonObject = [];
let setDropdown = document.getElementById("sets");
let getSetlist = document.getElementById("get-set-list");
let setlist = document.getElementById("set-list");

fetch("data.json")
    .then((res) => res.text())
    .then((text) => {
        jsonObject = JSON.parse(text);
        for (var i = 0; i < jsonObject.sets.length; i++) {
            var set = jsonObject.sets[i];
            setDropdown.innerHTML += `<option value="${set.date}">${set.date}</option>`;
        }

        //simulate pressing "latest" for get set list
        setlist.innerHTML = getSetForDate(jsonObject.sets[jsonObject.sets.length - 1]);
    })
.catch((e) => console.error(e));

function getSetForDate(set) {
    var setBuilder = `<div class="set-date"><h2>${set.date}</h2><div><div class="set-date-column"><h3>Will:</h3>`;

    for (var j = 0; j < set.will.length; j++) {
        setBuilder += `<p><strong>${set.will[j][0]}</strong> - <i>${set.will[j][1]}</i>`;
    }

    setBuilder += `</div><div class="set-date-column"><h3>Maximus:</h3>`

    for (var j = 0; j < set.max.length; j++) {
        setBuilder += `<p><strong>${set.max[j][0]}</strong> - <i>${set.max[j][1]}</i>`;
    }

    setBuilder += "</div></div></div>";

    return setBuilder;
}

getSetlist.onclick = function() {
    if (setDropdown.value === "Latest") {
        setlist.innerHTML = getSetForDate(jsonObject.sets[jsonObject.sets.length - 1]);
        return;
    }
    if (setDropdown.value === "All") {
        var allSets = "";
        for (var i = 0; i < jsonObject.sets.length; i++) {
            allSets += getSetForDate(jsonObject.sets[i]);
        }
        setlist.innerHTML = allSets;
        return;
    }
    for (var i = 0; i < jsonObject.sets.length; i++) {
        var set = jsonObject.sets[i];
        if (set.date !== setDropdown.value) {
            continue;
        }

        setlist.innerHTML = getSetForDate(set);
        return;
    }
};