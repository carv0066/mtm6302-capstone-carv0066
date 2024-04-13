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
continueInput.addEventListener('click', function() {
    showSection(pictureOfDaySection);
});

//Click on favourites icon and go to favourites
favouritesButtons.forEach(button => {
    button.addEventListener('click', function() {
        showSection(favouritesSection);
    });
});

// Initially show the home section
showSection(homeSection);


// read next steps
//make sure to connect my app with the api to receive the right information and replace the innerHTML of the html i have for
//pictureofday

