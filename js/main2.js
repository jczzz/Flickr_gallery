$(document).ready(function(){
    $('#search-form').on('submit', function(e){
        //let tag = e.target.value;
        const tag =$('#search-input').val();
        console.log(tag);
       
        getPhoto(tag);
        e.preventDefault();
});
});

function getPhoto(tag){

    //console.log(tag);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6b9c83ee34555213e7c17585a2edc606&tags="+tag+"&per_page=30&format=json&nojsoncallback=1",
        "method": "GET",
        "headers": {}
      }
      
      $.ajax(settings).done(function(data){
      
          console.log(data.photos.photo);
          let images = data.photos.photo;
      
          $.each(images, function(index,image){
             let farmId=image.farm;
             let serverId=image.server;
             let id=image.id;
             let secret=image.secret;
             //console.log(image);

             
             
             $("#repos").append(` 
                                <div class="gallery">
                               
                                  <a  href="https:farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg" data-lightbox="mygallery" data-title="${image.title}">
                                  <img src="https:farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg"  />
                                  </a>
                                  
                                  </div>
                                  `);
             

          });
      
      
      });
  
       $('#flickr').html(`<div id="repos" class="card-columns"></div>`);
  
  

}
  

