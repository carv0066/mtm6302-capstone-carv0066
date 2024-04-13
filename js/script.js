const homeSection = document.getElementById('home-section');
const pictureOfDaySection = document.getElementById('pictureofday-section');
const favouritesSection = document.getElementById('favourites-section');
const continueInput = document.getElementById('show-picture-of-day');
const favouritesButtons = document.querySelectorAll('.show-favourites');

// Function to show/hide sections
function showSection(section) {

    homeSection.style.display = 'none';
    pictureOfDaySection.style.display = 'none';
    favouritesSection.style.display = 'none';

    // Show the selected section
    section.style.display = 'block';
}

//Click on continue andmove to pictureofday section
continueInput.addEventListener('click', function () {
    showSection(pictureOfDaySection);
});

//Click on favourites icon and go to favourites
favouritesButtons.forEach(button => {
    button.addEventListener('click', function () {
        showSection(favouritesSection);
    });
});

// Initially show the home section
showSection(homeSection);


// Fetching data from API
continueInput.addEventListener("click", async function () {
    const inputDate = document.getElementById("date").value; //Grabs date id from the date input
    const apiKey = "N5TFxIqnAyuLX0EBJEHevXZh5cfezd1SsR6rQTaR";

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${inputDate}`)
    const data = await response.json();
    console.log(data);

    pictureOfDaySection.innerHTML = ` 
    <div class="pictureofday-container">
        <div class="square-button">
        <button class="show-favourites">
            <img src="images/space-icon.png" alt="Space Icon" class="space-icon">
        </button>
    </div>

    <!-- Title and Description -->
    <div>
        <h1 class="main-title-pic" >Astronomy Picture of the Day</h1>
        <p class="main-p-pic">Dive into the mesmerizing world of space by exploring the Astronomy Picture of the Day (APOD).
        The following section showcases the APOD information in a clear and visually appealing manner.</p>
    </div>
    <div>
        <h3>${data.title}</h3>
        <p class="date-p-pic">${data.date}</p>
    <div>
        <img src="${data.url}" alt="picture of the day" class="picofday-image">
    </div>
        <p class="date-p-pic">Image Credit & Copyright: ${data.copyright}</p>
    </div>
    <div class="button-container">
        <Button class="add-fav">Add to favourites</Button>
    </div>

    <!-- Body text -->
    <div>
        <p class="main-p-pic">${data.explanation}</p>
    </div>

    <!-- Orange Line -->
    <div class="orange-line"></div>

    <!-- Footer -->
    <footer>
        <div>
            <p>Authors & editors: Robert Nemiroff (MTU) & Jerry Bonnell (UMCP)</p>
            <p>NASA Official: Amber Straughn Specific rights apply.</p>
            <p>NASA Web Privacy Policy and Important Notices</p>
            <p>A service of: ASD at NASA / GSFC,</p>
            <p>NASA Science Activation</p>
            <p>& Michigan Tech. U.</p>
        </div>
    </footer>
</div>`
 // Add event listener to the show favourites button in the picture of the day section
const showFavouritesButton = document.querySelector('#pictureofday-section .show-favourites');
showFavouritesButton.addEventListener('click', function () {
    showSection(favouritesSection);
});
})