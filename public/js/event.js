var eventObj = {};

function addEvent(form) {

    let request = new XMLHttpRequest();

    request.open("POST", "/create");
    request.responseType = 'text';
    request.setRequestHeader('Content-type', 'application/json');
    
    request.onload = function() {
        
        if (request.response === 'true')
            alert("Event Submitted!");
    };

    eventObj = {eventName: form.name.value, description: form.description.value, 
        start: form.startTime.value, end: form.endTime.value, url: form.url.value};

    eventObj.start = (new Date(eventObj.start)).getTime();
    eventObj.end = (new Date(eventObj.end)).getTime();

    if (isNaN(eventObj.start)) {

        alert("Start date invalid. Please try again.");

    } else {
        
        request.send(JSON.stringify({
            name: eventObj.eventName,
            description: eventObj.description, 
            start: eventObj.start, 
            end: eventObj.end, 
            url: eventObj.url
        }));

        return false;  
    }
}

function editEvent(form) { 

    let request = new XMLHttpRequest();

    request.open("POST", "/edit");
    request.responseType = 'text';
    request.setRequestHeader('Content-type', 'application/json');
    
    request.onload = function() {
        
        if (request.response === 'false')
            alert("Invalid Event ID");
        else 
            alert("Event Submitted! Your view has been refreshed.");
        
    };

    eventObj = {eventId: form.eventId.value, eventName: form.name.value, description: form.description.value, 
        start: form.startTime.value, end: form.endTime.value, url: form.url.value};
    
    eventObj.start = (new Date(eventObj.start)).getTime();
    eventObj.end = (new Date(eventObj.end)).getTime();

    if (isNaN(eventObj.start)) {

        alert("Start date invalid. Please try again.")

    } else {

        request.send(JSON.stringify({
            id: eventObj.eventId,
            name: eventObj.eventName,
            description: eventObj.description, 
            start: eventObj.start, 
            end: eventObj.end, 
            url: eventObj.url
        }));
        
    return false;  

    }
}

function listEvent()
{
    let request = new XMLHttpRequest();
    let eventArray = [];

    request.open("POST", "/cal");
    request.responseType = 'text';
    request.setRequestHeader('Content-type', 'application/json');
    
    request.onload = function() {
        
        if (request.response === 'empty')
        {
            alert("There are no events");
        }
        else 
        {
            eventArray = JSON.parse(request.response);

            // draw table
            var html = "<table border='1|1'>";

            html+="<tr>";
            html+="<th>Event Name</th>";
            html+="<th>Event ID</th>"; 
            html+="<th>Description</th>"; 
            html+="<th>Start Time</th>"; 
            html+="<th>End Time</th>"; 
            html+="<th>URL</th>";  
            html+="</tr>";

            for (var i=0; i<eventArray.length;i++) {
                var startTime, endTime;

                if (eventArray[i].startTime > 0) {
                    startTime = new Date(eventArray[i].startTime).toLocaleString('en-US', {timeZone: "America/New_York"}) + " ET";
                } else {
                    startTime = "No date";
                }

                if (eventArray[i].endTime > 0) {
                    endTime = new Date(eventArray[i].startTime).toLocaleString('en-US', {timeZone: "America/New_York"}) + " ET";
                } else {
                    endTime = "No date";
                }

                html+="<tr>";
                html+="<td>"+eventArray[i].name+"</td>";
                html+="<td>"+eventArray[i].id+"</td>";
                html+="<td>"+eventArray[i].description+"</td>";
                html+="<td>"+startTime+"</td>";
                html+="<td>"+endTime+"</td>";
                html+="<td>"+eventArray[i].url+"</td>";
                html+="</tr>";
            }
            html += "</table>";
            document.getElementById("jsTable").innerHTML = html;
        }
        
    };

    request.send(JSON.stringify({
        msg: "listEvent"
    }));

}


function deleteEvent(form)
{
    let request = new XMLHttpRequest();
    let eventId = form.eventId.value

    request.open("POST", "/delete");
    request.responseType = 'text';
    request.setRequestHeader('Content-type', 'application/json');
    
    request.onload = function() {
  
        if (request.response === 'true')
        {
            //reload page;
            window.location.reload();
        }
        else 
            alert("Invalid Event ID");
    };  

    request.send(JSON.stringify({
            id: eventId
    }));

    return false;   
}