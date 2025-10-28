let data = null;
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
const closePopup = document.querySelector(".ayah-card button");

const ayahRecord = {
    sad: [],
    anxiety: [],
    irritability: [],
    lability: [],
    apathy: [],
    hopeless: [],
    overwhelm: [],
    loneliness: [],
    guilt: [],
    numbness: []
};

(async function(){
    try{
        data =  await axios.get("./moods.json");
    }catch(error){
        console.log("error detected in fetching data.");
    }
    
})();

const boxes = document.querySelectorAll(".box");
for(box of boxes){
    box.addEventListener("click", function(){
        let moodType = this.classList[1];
        showAyah(moodType);
    });
}

// Dang how useless was this 😂🤣
// function handleBoxClick(event){
//     let moodType = this.classList[1];
//     showAyah(moodType);
//     console.log(this);
//     // switch (moodType){
//     //     case "sad":
//     //         showAyah(moodType);
//     //         break;
//     //     case "anxiety":
//     //         showAyah(moodType);
//     //         break;
//     //     case "irritability":
//     //         showAyah(moodType);
//     //         break;
//     //     case "lability":
//     //         showAyah(moodType);
//     //         break;
//     //     case "apathy":
//     //         showAyah(moodType);
//     //         break;
//     //     case "hopeless":
//     //         showAyah(moodType);
//     //         break;
//     //     case "overwhelm":
//     //         showAyah(moodType);
//     //         break;
//     //     case "loneliness":
//     //         showAyah(moodType);
//     //         break;
//     //     case "guilt":
//     //         showAyah(moodType);
//     //         break;
//     //     case "numbness":
//     //         showAyah(moodType);
//     //         break;
//     //     default:
//     //         console.log("is never possible");
//     // }
// }

function showAyah(mood){
    const randAyah = genRandomAyah(mood);

    console.log(data.data.moods[mood][randAyah].arabic);
    console.log(data.data.moods[mood][randAyah].translation_ur.text);
    console.log(data.data.moods[mood][randAyah].translation_en.text);

    showAyahPopup(mood, randAyah);

    ayahPage.classList.toggle("hidden");
    body.classList.toggle("active-popup");
}

function showAyahPopup(mood, ayahId){
    ayahReference.innerHTML = `<a target="_blank" id="ayahLabel" href="https://quran.com/${data.data.moods[mood][ayahId].surah}?startingVerse=${data.data.moods[mood][ayahId].ayah}">Reference ${data.data.moods[mood][ayahId].key}</a>`
    ayah.innerText = data.data.moods[mood][ayahId].arabic;
    transliteration.innerText = data.data.moods[mood][ayahId].transliteration;
    urdu.innerText = data.data.moods[mood][ayahId].translation_ur.text;
    english.innerText = data.data.moods[mood][ayahId].translation_en.text;
    tafsir.innerHTML = `<a target="_blank" class="tafsir-link" href="${data.data.moods[mood][ayahId].tafsir_link}">${data.data.moods[mood][ayahId].tafsir_snippet}</a>` 
}

closePopup.addEventListener("click", (event)=>{
    // event.stopPropagation();
    ayahPage.classList.toggle("hidden");
    body.classList.toggle("active-popup");
})

// close when clicking the overlay (outside the card).
// ensure clicks inside the card do not bubble up to the overlay.
ayahPage.addEventListener("click", (event) => {
    if (event.target === ayahPage) {
        ayahPage.classList.toggle("hidden");
        body.classList.toggle("active-popup");
    }
});

//deadly-recursive my version 😅
// function genRandomAyah(mood){
//     const ayah = Math.floor(Math.random()*5);
//     if(ayahRecord[mood].length != 5){
//         if(ayahRecord[mood].includes(ayah)){
//             console.log("first if run;")
//             return genRandomAyah(mood);//If we keep getting the random number that's already in the array, this could theoretically recurse infinitely
//         }else{
//             console.log("else inner run;")
//             ayahRecord[mood].push(ayah);
//             return ayah;
//         }
//     }else{
//         console.log("else outer run;")
//         ayahRecord[mood] = [];//Array is now empty
//         // return ayah;// But 'ayah' might be a duplicate from previous calls!
//         return genRandomAyah(mood);
//     }
// }

//non-recursive
function genRandomAyah(mood) {
    if (ayahRecord[mood].length === 5) {
        ayahRecord[mood] = []; // Reset when full
    }
    
    let ayah;
    do {
        ayah = Math.floor(Math.random() * 5);
    } while (ayahRecord[mood].includes(ayah));
    
    ayahRecord[mood].push(ayah);
    return ayah;
}