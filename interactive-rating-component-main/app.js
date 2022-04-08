document.addEventListener('DOMContentLoaded', () => {
    const btnSubmit = document.querySelector('.btn-submit')
    const ratingGrp = document.querySelector('.rating-btn-group')
    const ratingCard = document.querySelector('#rating-card')
    const stateCard = document.querySelector('#state-card')
    const ratingDispplay = document.querySelector('#rating-value')
    var ratingValue = 0


    //Get Number by clicking on btn from rating-btn-group
    ratingGrp.addEventListener("click", function (e) {
        ratingValue = parseInt(e.target.firstChild.nodeValue)
      }, true);

    //Submit the rating by clicking
    btnSubmit.addEventListener('click', () =>{
        //console.log(ratingScore)
        if (ratingValue != 0) {
            ratingCard.style.display = 'none';
            stateCard.style.display = 'block';
            ratingDispplay.innerHTML = ratingValue 
        }
    })

})
