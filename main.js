
const removeActiveClass=()=>{
const activeButton=document.getElementsByClassName("active");


for(let btn of activeButton ){
  btn.classList.remove("active");

}
}






const loadAPI=()=>{

   // fetch category API
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then(res=>res.json())
   .then(data=>loadCategory(data))




}

const AllVideoLoad=(searchText=" ")=>{
  
   // fetch videos api
   fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
   .then(res=>res.json())
   .then(data=>{
    removeActiveClass()
    document.getElementById("btn-all").classList.add('active');
    loadVideo(data.videos)
   })

}


const loadCategory=(data)=>{
  // console.log(data.categories)
  
   const btnSection=document.getElementById("btn-section");
   for (let x of data.categories){
    console.log(x.category)
   
    const div=document.createElement('div');
    div.innerHTML=`<button id="btn-${x.category_id}"   onclick = "loadVideoByCategory(${x.category_id})" class="btn ">${x.category}</button>`;
    btnSection.appendChild(div);

   }
}

const loadVideo=(data)=>{

   const videoContainer=document.getElementById("video-container");


       if(data.length==0){
        videoContainer.innerHTML=`
 <div class="col-span-full flex flex-col py-16 justify-center items-center text-center">
  <img src="Icon.png" alt="">
   <h1 class="text-2xl font-bold ">OOPS!! Sorry There is no content Here</h1>

 </div>

 `
 return;
       }



   videoContainer.innerHTML=" ";
   
   for(let video of data){
 
     let verified_status;
      const div=document.createElement('div');
       
       if(video.authors[0].verified!==true){
        verified_status=" "
       }
       else{
        verified_status="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"
       }






      // Button color setting
      const colors = ["255,0,0","0,0,255","0,255,0","255,0,255","255,165,0","0,255,255","255,20,147","255,0,0","0,0,255","0,255,0","255,0,255","255,165,0","255,0,0","0,0,255","0,255,0","255,0,255","255,165,0"];

      const c1 = colors[Math.floor(Math.random() * colors.length)];
      const c2 = colors[Math.floor(Math.random() * colors.length)];



      div.innerHTML=` <div class="card bg-base-100 w-[300px] h-80 shadow-sm">
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
        <img class=" w-6  "  src="${verified_status}" alt="">

    </div>
   <p class="text-[#17171790]">91k views</p>

    

<!-- The button to open modal -->
<label  onclick=loadCideoDetails('${video.video_id}')     for="my_modal_6" class="btn   text-white bg-[linear-gradient(to_right,rgba(${c1},0.50),rgba(${c2},0.50))]   ">Show Details</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my_modal_6" class="modal-toggle" />
<div class="modal" role="dialog">
  <div  class="modal-box">
  
  <div id="detailId">
     
    </div>
   
    <div class="modal-action">
      <label for="my_modal_6" class="btn">Close!</label>
    </div>
  </div>
</div>








  </div>
  
</div>
`


videoContainer.append(div);


   }


}



const loadVideoByCategory=(id)=>{

  const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    removeActiveClass();
   const clickButton=document.getElementById(`btn-${id}`);
   clickButton.classList.add("active");
   console.log(clickButton);

    loadVideo(data.category)
  });
}



const loadCideoDetails=(videoId)=>{

  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
  .then(res=>res.json())
  .then((data)=>{

    console.log(data);
     const detailId=document.getElementById("detailId");

     detailId.innerHTML = "";
    
     const div=document.createElement('div');
      
     div.innerHTML=`<h3 class="text-lg font-bold">${data.video.title}</h3>
    <p class="py-4">${data.video.description}</p>`

    detailId.appendChild(div);

  })




}



document.getElementById("input-search").addEventListener('keyup',(e)=>{

  const input=e.target.value;
 AllVideoLoad(input);

})






AllVideoLoad()
loadAPI()
