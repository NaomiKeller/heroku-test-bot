//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Database.js V1.0


// Event class 
// only used as a struct without any methods
class Event
{
    constructor(name, description, startTime, endTime, url)
    {
        this.name = name;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.url = url;
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
        if (newEvent instanceof Event || Object.keys(newEvent).length === 5)
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

    // list all events in the database
    // precondition: none
    // postcondition: an array of Event objects
    listEvent()
    {
        let array;
        let query = 'SELECT * FROM EVENT;';
        this.pool.query(query, (err, res) => {
            if(err) {
                throw err;
            }
            array = res.rows;
        console.log("inside func");
        console.log(array);    
        
        });

        return array;
    }

    test()
    {
        return "file";
    }
}


module.exports.Database = Database;
module.exports.Event = Event;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////