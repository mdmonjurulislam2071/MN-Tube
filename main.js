
const loadAPI=()=>{

   // fetch category API
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then(res=>res.json())
   .then(data=>loadCategory(data))


   // fetch videos api
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
   .then(res=>res.json())
   .then(data=>loadVideo(data))



}
const loadCategory=(data)=>{
  // console.log(data.categories)
   const btnSection=document.getElementById("btn-section");
   for (let x of data.categories){
    console.log(x.category)
   
    const div=document.createElement('div');
    div.innerHTML=`<button class="btn ">${x.category}</button>`;
    btnSection.appendChild(div);

   }
}

const loadVideo=(data)=>{

   const videoContainer=document.getElementById("video-container");
   for(let video of data.videos){
 
      const div=document.createElement('div');
      div.innerHTML=` <div class="card bg-base-100 w-80 h-80 shadow-sm">
  <figure class="relative">
    <img 
      src="${video.thumbnail}"
      alt="Shoes" />
      <p class="absolute bottom-2 right-2 bg-black rounded p-1 text-white text-sm">3 hours 56 min ago</p>
  </figure>

  <div class="card-body">
    
    
    <div class="flex gap-3 items-start ">

  <div class="avatar  ">
  <div class="ring-primary ring-offset-base-100 w-12  border-none rounded-full  ring-offset-2">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
  <h2 class="card-title ">${video.title}</h2>

   
    </div>

    <div class="flex  items-center  gap-2 ">
        <div>
            <p class="text-[#17171790]">${video.authors[0].profile_name}</p>
        </div>
        <img class=" w-6  "  src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="">

    </div>
   <p class="text-[#17171790]">91k views</p>

    
   
  </div>
</div>
`


videoContainer.append(div);


   }


}





loadAPI()