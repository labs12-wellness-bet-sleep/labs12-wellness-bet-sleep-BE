# BackEnd Server Documentation #


######### API Routes ##########


######### User Routes #########

# -------- /GET request --------
# /api/users -- grab all users in database
# /api/users/:id -- grab an individual user by id

# ---------/POST request ---------
# /api/users/register -- create/add a new user
# /api/users/login  -- login to website 



######### Group Routes #########

# -------- /GET request ---------
# /api/groups -- grab/display all groups in database
# /api/groups/:id -- grab/display a group by it's id
# /api/groups/:id/participant  -- grab/display a group and show all the participant


#--------- /POST request ---------
# /api/groups/create -- create a new group


#--------- /PUT request ----------
## /api/groups/:id -- edit existing group by id


#--------- /DELETE request --------
## /api/groups/:id -- delete existing group by id


########### Participant Routes #########

#----------- /GET request ------------
# /api/participant --- display all participants
# /api/participant/:id --- display a participant by id
# /api/participant/:id/groups --- display one or more groups for an individual participant


#----------- /POST request -----------
# /api/participant/add --- create/add a new particiapnt


#------------ /DELETE request ----------
# /api/participant/:id --- delete participant by its id