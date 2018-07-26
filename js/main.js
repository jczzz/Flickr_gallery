const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


searchForm.addEventListener('submit', e => {
    // Get search
    const searchTerm = searchInput.value;
    // Check for input
    if (searchTerm == '') {
      // Show message
      showMessage('Please add a search term', 'alert-danger');
    }
    // Clear field
    searchInput.value = '';


     // Search Reddit
  search(searchTerm).then(images => {
    
    let output = '<div class="card-columns">';
    console.log(images);
    images.forEach(image=>{
        let farmId=image.farm;
        let serverId=image.server;
        let id=image.id;
        let secret=image.secret;
      output += `
      <div>
      <a  href="https:farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg" data-lightbox="mygallery" data-title="${image.title}">
       <img src="https:farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg" />
       </a>
       </div>
      `;
    });

    output += `</div>`;
    document.getElementById('flickr').innerHTML=output;
  });
   
  
    e.preventDefault();
  });


  function search(searchTerm) {
      console.log(searchTerm);

    return fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6b9c83ee34555213e7c17585a2edc606&tags=${searchTerm}&per_page=30&page=2&format=json&nojsoncallback=1`
    )
    .then(res => res.json())
      .then(data => {
          console.log(data);
        return data.photos.photo;
      })
      .catch(err => console.log(err));
  }

    // Show Message Function
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes     using the ${ } syntax
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));


    // Get parent
    const searchContainer = document.getElementById('search-container');
    // Get form
    const search = document.getElementById('search');
    // Insert alert
    searchContainer.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }