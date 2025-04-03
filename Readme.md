## Features for v1
<ol>
    <li>Two Factor Authentication with TOTP</li>
    <li>Create Password you would like to store and share</li>
    <li>Generate Random Password</li>
    <li>Store Password </li>
    <li>Share Password with access control among colleagues who use the platform</li>
    <li>Edit stored password</li>
    <li>Delete Password</li>
</ol>

## Tech Stack Used
### Frontend Development
<ul>
    <li>Vue.js</li>
    <li>Tailwind CSS</li>
</ul>

### Backend Development
<ul>
    <li>Node.js</li>
</ul>

### Database Management
<ul>
    <li>MongoDB</li>
</ul>

### API Testing
<ul>
    <li>Postman</li>
</ul>

## Execution of share password
### Share Password

#### Frontend:
1. User clicks on share
2. Ask the user to search for the user with an email
3. Displays a list of users that matches with searched query.
4. The user clicks on the 'Share' button along with the person they want to share with.
5. Asks for permission.
6. API hits with password ID, password owner ID, sharedUserID, and permission.
7. .............. backend ..............
8. Gets back response and notifies user based on that 

#### Backend:
1. Get password ID, password owner ID, sharedUserID, and permission as a request.
2. Check password
3. Check if the user owner id and user shared with id are same or not.
4. If not the same then store the data in the sharedPassword model in db.
5. Response

### Displaying Shared Password
#### Frontend:
1. User clicks on Shared Passwords section
2. API hits with user ID
3. .........backend .....
4. Display a list of shared passwords with just site details.
5. When Opened/Clicked, Display the password with full details. 
6. if user has edit permission and make the edit successfully, then trigger edit model.

#### Backend:
1. Request with userID and search for the user ({ sharedWith: userId }) in the sharePassword model.
2. If data with the respective userID is found, then retrieve list of data along with permission in response
3. Response back
4. ......
5. If user wants to access on any of the shared password, then look for a password detail with its ID in the Password model and retrieve it back in response.


##### "Your Passwords | Shared Passwords" are the primary tabs on our home page which can be accessed easily by just switching tabs for respective data.


