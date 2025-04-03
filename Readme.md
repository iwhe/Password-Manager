## Share Password

### Frontend:::::::
Sharing Password
1. User click on share
2. Ask for user email to whom password is to be shared
3. Permission
3. API hits with password Id, user owner id, user shared with id, permission.
..............
4. Gets back response and notify user based on that 

### Backend::::::::
1. Get password Id, user owner id, user shared with id, and permission as a request.
2. Check password
3. Check if user owner id and user shared with id are same or not.
4. If not same then store the data in db.
5. Response
6. 

## Displaying Shared Password
### Frontend::
1. User click on Shared Passwords section
2. API hits with user id 
.........
3. Display list of share password with just site details.
4. When Opened/Clicked, Display password and trigger accessed model for viewed, 
5. if user has edit permission and make the edit successfully, then trigger edit model.

### Backend::
1. Request with user id and search for user in sharePassword model.
2. If user is found then check for permissions and check password details in password model with passwordId, and 
3. Response back


Your Passwords | Shared Passwords


{
    "statusCode": 201,
    "data": {
        "password": "675a706bd6f8b12ad143517e",
        "owner": "6757d09fe80a2bd990d95a07",
        "sharedWith": "67518dbd3c4c077dfe7ccf6a // bhupesh@gmail.commmm

        "permission": "View",
        "_id": "675ec6377a568b267ad585ab",
        "createdAt": "2024-12-15T12:06:15.353Z",
        "updatedAt": "2024-12-15T12:06:15.353Z",
        "__v": 0
    },
    "message": "Shared Password stored successfully",
    "success": true
}

