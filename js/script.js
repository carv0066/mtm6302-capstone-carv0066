document.addEventListener('DOMContentLoaded', function() {
    const homeSection = document.getElementById('home-section');
    const favouritesSection = document.getElementById('favourites-section');
    const continueInput = document.getElementById('show-picture-of-day');
    const favouritesButtons = document.querySelectorAll('.show-favourites');
    const pictureOfDaySection = document.getElementById('pictureofday-section');

    // Function to show/hide sections
    function showSection(section) {
        homeSection.style.display = 'none';
        pictureOfDaySection.style.display = 'none';
        favouritesSection.style.display = 'none';

        // Show the selected section    
        section.style.display = 'block';

        if (section === favouritesSection) {
            setupAddToFavorites();
            setupModalForFavorites();
        }
    }

    // Click on favourites icon and go to favourites
    favouritesButtons.forEach(button => {
        button.addEventListener('click', function () {
            showSection(favouritesSection);

        });
    });



    function saveToFavorites(imageUrl, altText) {
        let favourites = JSON.parse(localStorage.getItem('favorites')) || [];

        favourites.push({ imageUrl, altText });

        // Save the updated favorites array back to local storage
        localStorage.setItem('favorites', JSON.stringify(favourites));
    }


    // Function to remove an image from favorites
function removeFromFavorites(imageContainer) {
    
    imageContainer.remove();

    const imageUrl = imageContainer.querySelector('.grid-image').src;
    const altText = imageContainer.querySelector('.grid-image').alt;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(favorite => favorite.imageUrl !== imageUrl || favorite.altText !== altText);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}
    // Function to set up event listener for the "Add to favorites" button
    function setupAddToFavorites() {
        const addToFavourites = document.getElementById("add-fav");
        if (addToFavourites) {
            addToFavourites.addEventListener("click", function() {

                const imageUrl = document.querySelector('.picofday-image').src;
                const altText = document.querySelector('.picofday-image').alt;

                
                saveToFavorites(imageUrl, altText);
                console.log("Image added to favorites.");

                // Update the display in favourites section so it shows the new image added inmediatly
                displayFavourites();
            });
        }
    }

    // Function to display favorites from local storage
    function displayFavourites() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
    
        const imageGrid = document.querySelector('.image-grid');
        imageGrid.innerHTML = ''; 
    
        if (favorites && favorites.length > 0) {
            favorites.forEach(favorite => {
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('image');
    
                const img = document.createElement('img');
                img.src = favorite.imageUrl;
                img.alt = favorite.altText;
                img.classList.add('grid-image');
    
                const removeButton = document.createElement('button');
                removeButton.innerText = 'Remove';
                removeButton.classList.add('remove-button');

                removeButton.addEventListener('click', function() {
                    removeFromFavorites(imageDiv);
                });

                imageDiv.appendChild(img);
                imageDiv.appendChild(removeButton); 
                imageGrid.appendChild(imageDiv); // Append to the image grid
            });
        } else {
            imageGrid.textContent = 'You have no favorites yet.';
        }
    }
    

displayFavourites();


    // Fetching data from API and showing picture of the day
    if (continueInput) {
        continueInput.addEventListener('click', async function () {
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
                <img src="${data.url}"
                alt="picture of the day"
                class="picofday-image"
                >
            </div>
            <div id="modal" class="modal"></div>
                <p class="date-p-pic">Image Credit & Copyright: ${data.copyright}</p>
            </div>
            <div class="button-container">
                <Button class="add-fav" id="add-fav">Add to favourites</Button>
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
                    <p>Authors & editors: Robert Nemiroff (MTU) & Jerry Bonnell (UMCP)</p>
                    <p>NASA Official: Amber Straughn Specific rights apply.</p>
                    <p>NASA Web Privacy Policy and Important Notices</p>
                    <p>A service of: ASD at NASA / GSFC,</p>
                    <p>NASA Science Activation</p>
                    <p>& Michigan Tech. U.</p>
                </div>
            </footer>
            </div>`;

            // Show the picture of the day section
            showSection(pictureOfDaySection);

            setupShowFavourites();
            setupAddToFavorites();

            const imageResizeMain = document.querySelector('.picofday-image');

            //Click on image to resize it
            imageResizeMain.addEventListener("click", function () {
                console.log("you clicked on the image")
                openModal(data.hdurl);
                });

        });
    }

    // Function to open modal with image
    function openModal(imageUrl) {
        const modal = document.querySelector('.modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${imageUrl}" alt="picture of the day large" class="modal-image">
            </div>
        `;
        modal.style.display = "block";

        
        const closeModal = document.querySelector('.close');
        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Function to set up event listener for the "show-favourites" button
    function setupShowFavourites() {
        const showFavouritesButton = document.querySelector('#pictureofday-section .show-favourites');
        if (showFavouritesButton) {
            showFavouritesButton.addEventListener('click', function () {
                showSection(favouritesSection);
                setupModalForFavorites();
            });
        }
    }

  // Function for modal for favorite images
function setupModalForFavorites() {
    const favoriteImages = document.querySelectorAll('.grid-image');
    favoriteImages.forEach(image => {
        image.addEventListener('click', function () {
            const imageUrl = this.src;
            openModal(imageUrl);
        });
    });
}

// Function to open modal with larger image
function openModal(imageUrl) {
    const modal = document.querySelector('.modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${imageUrl}" alt="larger image" class="modal-image">
        </div>
    `;
    modal.style.display = "block";


    const closeModal = document.querySelector('.close');
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

setupModalForFavorites(); 
});
