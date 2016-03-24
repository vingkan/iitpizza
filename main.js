var PATH = 'https://iitpizza.firebaseio.com/';
var ROOM = 'ipro';
var SLICES = 24;
var PRICE = 26;

function updateOrder(roomID, id, status){
	var room = roomID || ROOM;
	var userID = id.toLowerCase();
	if(userID[0] === 'a'){
		userID = userID.substr(1);
	}
	var ref = PATH + room + '/' + userID;
	var order = new Firebase(ref);
	order.set(status);
}

function getRoomStatus(roomID){
	var room = roomID || ROOM;
	var ref = PATH + room;
	var roomData = new Firebase(ref);
	roomData.on('value', function(snapshot){
		var orders = snapshot.val();
		console.log(orders)
		var counter = 0;
		for(var person in orders){
			console.log(person)
			if(orders[person]){
				counter++;
			}
		}
		console.log(counter)
		updateRoomStatus({
			orders: counter
		})
	});
}

function updateRoomStatus(data){
	var spanOrders = document.getElementById('span-orders');
	var spanPrice = document.getElementById('span-price');
	var spanSlice = document.getElementById('span-slice');
	spanOrders.innerText = data.orders;
	spanPrice.innerText = (PRICE / data.orders).toFixed(2);
	spanSlice.innerText = Math.floor(SLICES / data.orders);

}