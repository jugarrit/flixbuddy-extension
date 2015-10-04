<% if(connectedTo) { %>
	<img src="/images/connected_icon.png" alt="FlixBuddy" class="user-connected"/>
<% } else { %>
	<img src="/images/disconnected_icon.png" alt="FlixBuddy" class="user-connected"/>
<% } %>

<div class="user-section">
	<div class="user-name">
		<%= firstName %> <%= lastName %>
		<% if (!browsing && active) { %>
			<i class="fa fa-video-camera"></i>
		<% } else if(!active) { %>
			<span class='last-seen'> Last seen <%= lastSeen %> </span>
		<% } %>
	</div>
	<div class="user-status">
		<%= flickTitle %> 
		<% if (!browsing) { %>
			(<%= remaining %> remaining)
		<% } %>
	</div>
</div>
<% if(currentUserConnectedTo === appUserId) { %>
	<a href="#" class="disconnect" ><i class="fa fa-stop"></i> Stop Flixchatting </a>
<% } else if(connectedTo) { %>
	<span class="noop" ></i> Currently Flixchatting </span>
<% } else { %>
	<a href="#" class="connect" ><i class="fa fa-play"></i> Start Flixchatting </a>
<% } %>
