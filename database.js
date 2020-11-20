//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Database.js V1.0


// Event class 
class Event
{
    constructor(name, description, startTime, endTime, url, id = null)
    {
       
        this.id = id;
        this.name = name;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.url = url;
        
    }

    toString()
    {
        let name = this.name;
        let description = this.description;
        let startTime = this.startTime;
        let endTime = this.endTime;
        let url = this.url;

        if (name === undefined)
            name = "";
        if (description === undefined)
            description = "";
        if (startTime === undefined || isNaN(startTime))
            startTime = "";
        else 
            startTime = new Date(this.startTime).toString();
       
        if (endTime === undefined || isNaN(endTime))
            endTime = "";
        else 
            startTime = new Date(this.startTime).toString();
       
        if (url === undefined)
            url = "";
        
        let string = `Event ID: ${this.id}\nEvent name: ${name}\nEvent description: ${description}\nEvent start time: ${startTime}\nEvent end time: ${endTime}\nEvent url: ${url}\n`;
        return string;
    }

    
}

class Subscription
{
    constructor(eventId, userId)
    {
        this.eventId = eventId;
        this.userId = userId;
    }

}

class Advertisement
{
    constructor(eventId, serverId, messageId)
    {
        this.eventId = eventId;
        this.serverId = serverId;
        this.messageId = messageId;
        
    }

}

// Database class
// 
class Database
{
    constructor()
    {
        const { Pool } = require ('pg');    
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        this.pool.connect((err, client, release) => 
        {
            if (err) {
                console.log('Error acquiring client', err.stack)
            }
        });
    }

    // create a event in the database
    // prcondition: an Event object 
    // postcondition: true for success and false for error
    createEvent (newEvent) 
    {
        if (newEvent instanceof Event)
        {
            
            let query = `INSERT INTO EVENT (event_name, event_description, event_start, event_end, event_url) 
                      VALUES (\'${newEvent.name}\', \'${newEvent.description}\', ${newEvent.startTime}, ${newEvent.endTime}, \'${newEvent.url}\');`;
            
            console.log(query);
            this.pool.query(query, (err, res) => {
                if(err) 
                {
                    throw err;
                    return false;
                }
     
            });

            return true;
        }
        else
        {
            return false;
        }
            
    }
/*
    async listEvent2()
    {
        let array;
        let query = 'SELECT * FROM EVENT;';
 
        await this.pool.query(query, (err, res) => {
            if(err) {
                throw err;
            }
            array = res.rows;
            console.log("inside query");
            console.log(array);    
               
        });
        console.log("inside func");
        console.log(array);    
        return array;
    }
    */


    // list all events in the database
    // precondition: none
    // postcondition: an array of Event objects
    listEvent()
    {
        return new Promise(resolve => {
            let array;
            let query = 'SELECT * FROM EVENT;';
 
            this.pool.query(query, (err, res) => {
                if(err) {
                    throw err;
                }
                array = res.rows;
                    
                resolve(array);
            });
        });     
    };

    // to get a single event 
    // precondition: event ID 
    // postcondition: event object
    getEvent(eventId)
    {
        return new Promise(resolve => {
            let event;
            let query = `SELECT * FROM EVENT
                         where event_id = ${Number(eventId)}`;
            console.log(query);
            this.pool.query(query, (err, res) => {
                if(err) {
                    throw err;
                }
                event = res.rows;
                console.log(`inside ` + event);   
                resolve(event);
            });
        });     
    };

    createAdvert(newAdvert)
    {
        if (newAdvert instanceof Advertisement)
        {
            
            let query = `INSERT INTO Advertisement (advert_messageid, advert_eventid, advert_serverid) 
                      VALUES (\'${advert_messageid}\', ${advert_eventid}, ${advert_serverid} );`;
            
            console.log(query);
            this.pool.query(query, (err, res) => {
                if(err) 
                {
                    console.error(err);
                    return false;
                }
     
            });

            return true;
        }
        else    
            return false;

    }

    createSub(newSub)
    {   
        if (newSub instanceof Subscription)
        {
            
            let query = `INSERT INTO SUBSCRIPTION (sub_eventId, sub_userId) 
                      VALUES (\'${newSub.eventId}\', \'${newSub.userId}\');`;
            
            console.log(query);
            this.pool.query(query, (err, res) => {
                if(err) 
                {
                    throw err;
                    return false;
                }
     
            });

            return true;
        }
        else
        {
            return false;
        } 
    }

    removeSub(existingSub)
    {
        
    }
}


module.exports.Database = Database;
module.exports.Event = Event;
module.exports.Subscription = Subscription;
module.exports.Advertisement = Advertisement;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////