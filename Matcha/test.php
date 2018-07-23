<?php
?>

<html>
<head>
</head>
<p>Chat script</p>
<body>
  <script>
  var conn = new WebSocket('ws://localhost:8200');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    console.log(e.data);
};
  </script>
</body>
</html>
