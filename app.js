let data;
const body = document.querySelector("body");
const boxContainer = document.querySelector(".box-container");
const blurOverlay = document.querySelector(".blur-overlay");
const ayahPage = document.querySelector(".ayah-page");
const ayahCard = document.querySelector(".ayah-card");
const ayah = document.querySelector(".ayah");
const urdu = document.querySelector(".urdu");
const english = document.querySelector(".english");
const transliteration = document.querySelector(".roman");
const ayahReference = document.querySelector("#ayahLabel");
const tafsir = document.querySelector(".tafsir");
const closePopup = document.querySelector(".ayah-close");

(async function(){
    data =  await axios.get("./moods.json");
})();

const boxes = document.querySelectorAll(".box");
for(box of boxes){
    box.addEventListener("click", handleBoxClick);
}

function handleBoxClick(event){
    let moodType = this.classList[1];
    switch (moodType){
        case "sad":
            showAyah(moodType);
            break;
        case "anxiety":
            showAyah(moodType);
            break;
        case "irritability":
            showAyah(moodType);
            break;
        case "lability":
            showAyah(moodType);
            break;
        case "apathy":
            showAyah(moodType);
            break;
        case "hopeless":
            showAyah(moodType);
            break;
        case "overwhelm":
            showAyah(moodType);
            break;
        case "loneliness":
            showAyah(moodType);
            break;
        case "guilt":
            showAyah(moodType);
            break;
        case "numbness":
            showAyah(moodType);
            break;
        default:
            console.log("is never possible");
    }
}

function showAyah(mood){
    console.log(data.data.moods[mood][0].arabic);
    console.log(data.data.moods[mood][0].translation_ur.text);
    console.log(data.data.moods[mood][0].translation_en.text);

    ayahReference.innerText = `Key ${data.data.moods[mood][0].key}`
    ayah.innerText = data.data.moods[mood][0].arabic;
    transliteration.innerText = data.data.moods[mood][0].transliteration;
    urdu.innerText = data.data.moods[mood][0].translation_ur.text;
    english.innerText = data.data.moods[mood][0].translation_en.text;
    tafsir.innerHTML = `<a class="tafsir-link" href="${data.data.moods[mood][0].tafsir_link}">${data.data.moods[mood][0].tafsir_snippet}</a>` 

    // boxContainer.classList.toggle("hidden");
    ayahPage.classList.toggle("hidden");
    body.classList.toggle("active-popup");
}

closePopup.addEventListener("click", (event)=>{
    event.stopPropagation();
    console.log("cloce clicked")
    // boxContainer.classList.toggle("hidden");
    ayahPage.classList.toggle("hidden");
    body.classList.toggle("active-popup");
})

ayahPage.addEventListener("click", (event) => {
    event.stopPropagation();
    ayahPage.classList.toggle("hidden");
    body.classList.toggle("active-popup");
});