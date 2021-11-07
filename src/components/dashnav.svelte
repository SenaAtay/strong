<script>
    import Signout from "../components/signout.svelte"
</script>
<nav>
  <ul>
    <li><a class = "dash" href = "/dash/dashboard">Dashboard</a></li>
    <li> <a href = "/dash/messages">Messages</a></li>
    <li><a href = "/dash/schedule">Schedule</a></li>
    <li><a href = "/dash/profile">Profile</a></li>
    <Signout/>

</ul>



</nav>

<style>
ul {
text-decoration: none!important;
list-style-type: none;
  margin: 0;
  padding: 0;


position: absolute;
width: 132px;
height: 25px;
left: 94px;
top: 370px;

font-family: Roboto;
font-weight: bold;
font-size: 25px;
line-height: 29px;


color: #FFFFFF;


}

li a{

    text-decoration: none!important;
    margin-bottom: 10px;
    line-height: 1.7em;
    color: white;
    

}



    
</style>