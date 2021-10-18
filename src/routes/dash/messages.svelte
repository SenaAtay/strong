<svelte:head>
    <title>Messages</title>
</svelte:head>

<h1>Messages</h1>



<script>

var myHeaders = new Headers();
myHeaders.append("token", "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDIxYzdhMjktNjMxMi00YThlLTk4OTQtZGEyZTc3NThiYWZmIn0sImlhdCI6MTYzNDUyMzc2OSwiZXhwIjoxNjM0NTI3MzY5fQ.C94-82dKLmICGrN1fOj5-y5Vlg_iVPFkuu1avAfj_yw\"");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "message": "yooo"
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://strengthn.herokuapp.com/user/messages/4", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
      
    
    </script>