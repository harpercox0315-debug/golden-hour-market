// ----- User Setup -----
let currentUser = prompt("Choose your username:");
let wishlist = [];
let trades = []; // each trade: {name, desc, price, images:[], seller, status, chat:[], meetup:{lat,lng}}

// ----- DOM Elements -----
const itemGrid = document.getElementById("itemGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

// ----- Post Item -----
function postItem(){
  let name = document.getElementById("itemName").value;
  let desc = document.getElementById("itemDesc").value;
  let price = parseFloat(document.getElementById("itemPrice").value);
  let imgInput = document.getElementById("itemImg").value;
  let images = imgInput.split(",").map(s => s.trim()).filter(s => s);

  if(!name||!desc||!price||images.length===0){ alert("Fill all fields and at least one image URL"); return; }

  trades.push({
    name, desc, price, images,
    seller:currentUser,
    status:"available",
    chat:[],
    meetup:null
  });

  document.getElementById("itemName").value="";
  document.getElementById("itemDesc").value="";
  document.getElementById("itemPrice").value="";
  document.getElementById("itemImg").value="";

  renderItems();
}

// ----- Wishlist -----
function toggleWishlist(index){
  if(wishlist.includes(index)) wishlist = wishlist.filter(i=>i!==index);
  else wishlist.push(index);
  renderItems();
}

// ----- Buy Item -----
function buyItem(index){
  trades[index].status="sold";
  alert(`✅ You bought "${trades[index].name}"`);
  renderItems();
}

// ----- Chat System -----
function openChat(index){
  let item = trades[index];
  let msg = prompt(`Chat with seller (${item.seller}):\nType message or 'exit' to close.`);
  if(msg && msg.toLowerCase()!=="exit"){
    item.chat.push({user:currentUser, message:msg});
    alert("Message sent!");
    openChat(index);
  }
}

// ----- Meetup Map -----
function openMeetup(index){
  let item = trades[index];
  let lat = parseFloat(prompt("Enter meetup latitude:"));
  let lng = parseFloat(prompt("Enter meetup longitude:"));
  if(!lat || !lng){ alert("Invalid coordinates"); return; }
  item.meetup = {lat,lng};
  alert("Meetup location set!");
}

// ----- Render Items -----
function renderItems(){
  itemGrid.innerHTML="";

  let search = searchInput.value.toLowerCase();
  let sort = sortSelect.value;

  let filtered = trades.filter(item => item.name.toLowerCase().includes(search));
  if(sort==="low") filtered.sort((a,b)=>a.price-b.price);
  if(sort==="high") filtered.sort((a,b)=>b.price-a.price);

  filtered.forEach((item,index)=>{
    let carousel = `<img src="${item.images[0]}" id="img${index}" style="width:100%; height:220px; object-fit:cover;">`;
    if(item.images.length>1){
      carousel += `<div style="display:flex; justify-content:center; gap:5px; margin-top:5px;">` +
      item.images.map((img,i)=>`<div onclick="showPhoto(${index},${i})" style="width:20px;height:20px;background:white;border-radius:50%;cursor:pointer;"></div>`).join("") +
      `</div>`;
    }

    itemGrid.innerHTML+=`
      <div class="card">
        <div class="heart ${wishlist.includes(index)?"active":""}" onclick="toggleWishlist(${index})">♥</div>
        ${carousel}
        <div class="card-body">
          <h3>${item.name}</h3>
          <div>${item.desc}</div>
          <div class="price">$${item.price}</div>
          <div class="seller">Seller: ${item.seller}</div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="button" onclick="buyItem(${index})" ${item.status==="sold"?"disabled":""}>${item.status==="sold"?"SOLD":"Buy"}</button>
            <button class="button" onclick="openChat(${index})">Chat</button>
            <button class="button" onclick="openMeetup(${index})">Set Meetup</button>
          </div>
        </div>
      </div>
    `;
  });
}

// ----- Show Photo in Carousel -----
function showPhoto(itemIndex, photoIndex){
  document.getElementById(`img${itemIndex}`).src = trades[itemIndex].images[photoIndex];
}

// ----- Event Listeners -----
searchInput.addEventListener("input", renderItems);
sortSelect.addEventListener("change", renderItems);

// ----- Initial Render -----
renderItems();
