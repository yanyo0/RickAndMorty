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

})