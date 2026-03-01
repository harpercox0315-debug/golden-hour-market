// -- User setup
let currentUser = prompt("Choose your username:");
let wishlist = [];
let trades = []; // each trade: {name, desc, price, images:[], seller, status, chat:[]}

// -- Functions
function postItem(){ /* post item to trades[] */ }
function renderItems(){ /* render multi-photo cards */ }
function toggleWishlist(index){ /* heart toggle */ }
function buyItem(index){ /* mark sold + payment modal */ }
function openChat(index){ /* mini chat modal per item */ }
function sendMessage(index, message){ /* push message to item.chat */ }
function renderMap(index){ /* Leaflet map modal for meetup */ }
