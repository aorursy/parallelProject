<!-- WTF ISUS ทำเร่น ไม่ใช่ ป่ดหัว -->
<html>
<body>

Welcome <?php echo $_POST["studentid"]; ?><br>

</body>
</html>

<?php
session_start();
$db_connection = mysqli_connect('localhost', 'newuser', '', 'parallel');

function login($studentid, $password)
{
    $result = false;

    // Check from DB that the username and password is valid or not
    // IF user is valid, retrieve user_id from DB
    If (USER_IS_VALID) {
        $_SESSION['studentid'] = $studentid;
        // $_SESSION['dte_activity'] = time();
        $_SESSION['timestamp'] = time();

        $result = true;
    }

    return $result;
}

function checkLogin() {
    $result = false;

    if (!empty($_SESSION['student'])) {
         // This means that somebody is already logged in
         $user_id = $_SESSION['studentid'];
         $dte_login = $_SESION['timestamp'];

         // We need to check if the user which is login is the same as the last user that used our website so we compare the dte_login value that we stored in session with what we have in DB
         $db_connection->query("SELECT `studentid` FROM `users` WHERE `studentid`={$studentid} AND `timestamp`={$timestamp};");             
         // If the above query return no result, it means that someone else logged in meanwhile and we have to log out the current user 

         if ($db_connection->num_rows>0) {
             // Now we need to check if his/her session is still valid or not
             $EXPIERY = 300; // in seconds (in this case, 5 minutes) 
             $now = time();
             if ($now-$_SESSION['dte_activity']<$EXPIERY) {
                 // The user session is still valid and we need to update database
                 $db_connection->query("UPDATE `users` SET `dte_activity`={$now} WHERE id={$student};");
                 $_SESSION['dte_activity'] = $now;

                 $result = true; // Means that someone is active
             } else {
                 session_destroy();
             }
         } else {
             session_destroy();
         }
    }

    return $result;
}
?>
