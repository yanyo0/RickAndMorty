const $ = (elem) => document.querySelector(elem)
const $$ = (elem) => document.querySelectorAll(elem)



window.addEventListener("load", (e) => {

    // -----  VARIABLES  -----

    

    // -- BTN Light --

    const $btnMoodLight = $("#btnMoodLight");
    const $body = $("body");
    const $resultBox = $(".resultBox")

    // -- Inputs
    const $search = $("#search");
    const $selectType = $("#selectType");
    const $optionCharacters = $(".optionCharacters");
    const $optionLocations = $(".optionLocations");
    const $selectOrder = $("#selectOrder");


    let nameSearchCharacters = ``;
    let statusCharacter = "";
    let locationCharacters = "";
    let searchNameEpisode = "";

    let valueType, valueStatus, valueLocations , valueOrder, valuesearch

    // -- Section Errors--
    const $errors = $(".errors");

    
    // --  Section Season --
    const $seasonBox = $(".seasonBox");
    const $sectionIndividualSeason = $(".sectionIndividualSeason")
    const $season1 = $("#season1");
    const $season2 = $("#season2");
    const $season3 = $("#season3");
    const $season4 = $("#season4");
    const $season5 = $("#season5");
    const $season6 = $("#season6");
    const $season1Pages = $(".season1Pages")
    const $season2Pages = $(".season2Pages")
    const $season3Pages = $(".season3Pages")
    const $season4Pages = $(".season4Pages")
    const $season5Pages = $(".season5Pages")
    const $season6Pages = $(".season6Pages")
    const $numPageEpisodes = $("#numPageEpisodes")
    const $modalCharactersEpisodes = $(".modalCharactersEpisodes")
    const $paintModalCharactersEpisodes = $(".paint-modalCharactersEpisodes")
    const $btnCloseEpisodesCh = $(".btnCloseEpisodesCh")


    let pagesEpisode = 1
    let episode = ""


    // -- Section Character --

    let page = 1
    const $containerInfoCharacter = $(".containerInfoCharacter");
    const $characterBox = $("#characterBox");
    const $searchResult = $("#searchResult");



    // -- Modal Individual character --

    const $btnCloseModalCharacter = $(".btn_closeModalCharacter");
    const $modalCharacter = $(".modalCharacter")
    // -- BTN Pages --

    const $firstPage = $("#first-page");
    const $previousPage = $("#previous-page");
    const $numPage = $("#numPage");
    const $countPages = $("#countPages");
    const $nextPage = $("#next-page");
    const $lastPage = $("#last-page");

    let totalPages = 0



    // --MODAL Individual Character --
    const $episodeViewCharacter = $(".episode-viewCharacter");
    const $viewCharacter = $("#viewCharacter");



    // --- SECTION LOCATIONS  ---
    const $containerLocation = $(".containerLocation")
    const $sectionLocations = $(".sectionLocations")
    const $errorsLocation = $(".errorsLocation");
    let searchLocation = "";
    let pagesLocation = "";
    let location = "";
    
    let numInitLocation = 0
    let numFinalLocation = numInitLocation + 9
    let elementResto = 0

   //  --Modal Locations characters--
   const $modalCharactersLocation = $(".modalCharactersLocation");
   const $paintModalCharactersLocation = $(".paint-modalCharactersLocation");
   const $btnCloseLocationCh = $(".btnCloseLocationCh")


   // --Location pages--
   const $firstPageLocation = $("#first-pageLocation");
   const $previousPageLocation = $("#previous-pageLocation");
   const $numPageLocation = $("#numPageLocation");
   const $nextPageLocation = $("#next-pageLocation");
   const $lastPageLocation = $("#last-pageLocation");
  
   let numPagesLocations = 1;
   let totalElementsLocation 


//    -----SECTION CHARACTERS ----

const pagination = (data) => {
    $numPage.value = page;
    $countPages.innerText = "";
    $countPages.innerText = ` de ${data}`;

 }

 const paintIndividualCharacter = async (num) => {
    try{
       const response = await fetch(`https://rickandmortyapi.com/api/character/${num}`)
       const data = await response.json()
       $viewCharacter.innerHTML = "";
       $viewCharacter.innerHTML = `
          <div>
           <img class="img-viewCharacter" src="${data.image}" alt="Imagen de ${data.name}"/>
          </div>
          <div class="infoBox-viewCharacter">
               <h3>${data.name}</h3>
               <div class="itemsCharacters">
               <h6>Estado:</h6>
               <p>${data.status}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Especie:</h6>
               <p>${data.species}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Tipo:</h6>
               <p>${data.type !== "" ? data.type : "-" }</p>
               </div>
               <div class="itemsCharacters">
               <h6>Genero:</h6>
               <p>${data.gender}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Origen:</h6>
               <p>${data.origin.name}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Creado:</h6>
               <p>${Date(data.create)}</p>
               </div>
          </div>
       `;
    } catch (error) {
       $viewCharacter.innerHTML = `
       <section class="errors">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>No se pudo cargar el contenido!<br> Intente cargar la pagina nuevamente</p>
         </section>
       `
    }

  }

  const paintCharacters = (data, box) => {
    box.innerHTML = "";
    data.forEach(character => {
       box.innerHTML += `
       <div class="cardCharacter" id="${character.id}">
             <div class="characterImg">
               <img src="${character.image}" alt="Imagen de ${character.name}" />
             </div>
             <h5>${character.name}</h5>
           </div>
       `
    })
    const $$cardCharacter = $$(".cardCharacter")
    $$cardCharacter.forEach(box => box.addEventListener("click", (e) => {
       console.log(box.id)
       $modalCharacter.classList.remove("display");
       paintIndividualCharacter(box.id)
    }))
   }

  const loadDataCharacters = async(url) => {
    try{
       const response = await fetch(`${url}?page=${page}${nameSearchCharacters}${statusCharacter}${locationCharacters}`)
       const data = await response.json()
       paintCharacters(data.results, $characterBox);
       $searchResult.innerText = "";
       $searchResult.innerText = data.info.count;
       totalPages = data.info.pages
       pagination(totalPages);
       $errors.classList.add("display");
    } catch (error) {
       $errors.classList.remove("display")
    }

   }


 const loadNextPage =() => {
    if(page + 1 <= totalPages ){
    page = page + 1
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }}

 const loadLastPage = () => {
    if(page !== totalPages){
       page = totalPages;
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }
    }

 const loadPreviousPage = () => {
    if(page - 1 > 0 ){
       page = page - 1
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
       }
    }

 const loadfirstpage = () => {
    if(page !== 1){
    page = 1;
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }
 }

 const electionPageCharacters = () => {
    if($numPage.value > 0 && $numPage.value <= totalPages  ){
       page = $numPage.value
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
       }
    }



    

// -- Input --

const valueInputs = () => {
    valuesearch = $search.value
    valueType = $selectType.value
    valueStatus = $optionCharacters.value
    valueLocations = $optionLocations.value
    valueOrder = $selectOrder.value
 }
 
 
 
 
 const inputSelectType = (value) => {
     if(value === "characters"){
        $resultBox.classList.remove("display");
        $optionCharacters.classList.remove("display");
        $optionLocations.classList.add("display");
        $containerInfoCharacter.classList.remove("display");
        $seasonBox.classList.add("display");
        $sectionIndividualSeason.classList.add("display");
        $containerLocation.classList.add("display");
        $selectOrder.setAttribute("disabled","")
        $search.removeAttribute("disabled");
 
     } else if(value === "locations") {
        $resultBox.classList.add("display");
        $containerInfoCharacter.classList.add("display");
        $optionCharacters.classList.add("display");
        $optionLocations.classList.remove("display");
        $sectionIndividualSeason.classList.add("display");
        $containerLocation.classList.remove("display");
        $seasonBox.classList.add("display");
        $selectOrder.removeAttribute("disabled");
        $search.setAttribute("disabled","")
     } else{
       $resultBox.classList.add("display");
        $optionCharacters.classList.add("display");
        $optionLocations.classList.add("display");
        $containerInfoCharacter.classList.add("display");
        $seasonBox.classList.remove("display");
        $sectionIndividualSeason.classList.add("display");
        $containerLocation.classList.add("display");
        $search.setAttribute("disabled","")
     }
 }
 
 
 const charactersStatus = (value) => {
 
  if(value === "all") {
    statusCharacter = "";
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
  } else {
    statusCharacter = `&status=${value}`;
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
  }
 
 }
 
 const characterLocation = (value) => {
    if(value === "all") {
       locationCharacters = "";
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
     } else {
       locationCharacters = `&status=${value}`;
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
     }
 
 }
 

})