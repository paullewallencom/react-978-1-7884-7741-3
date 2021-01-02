import fire from './firebase.js';

export function getSeats() {
    let seatArr = [];
    let rowArray = [];
    const noOfSeatsInARow = 5;

    return new Promise((resolve, reject) => {
        //iterate through seat array and create row wise groups/array
        const seatsRef = fire.database().ref('seats/').orderByChild("number");
        seatsRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                seatArr.push({
                    number: childData.number,
                    price: childData.price,
                    status: childData.status,
                    rowNo: childData.rowNo
                });
            });

            var groups = [], i;
            for (i = 0; i < seatArr.length; i += noOfSeatsInARow) {
                groups = seatArr.slice(i, i + noOfSeatsInARow);
                console.log(groups);
                rowArray.push({
                    id: i,
                    seats: groups
                })
            }
            console.log(rowArray);
            resolve(rowArray);
        }).catch(error => { reject(error) });
    })

}

export function bookSelSeats(seats) {
    console.log("book seats", seats);
    return new Promise((resolve, reject) => {
        //write logic for payment 
        seats.forEach(obj => {
            fire.database().ref('seats/').child("seat-" + obj.number)
                .update({ status: "booked" }).then(resolve(true)).catch(error => { reject(error) });
        })
    });


}
