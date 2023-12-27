const playlist= require("../dataModels/Playlist.model");



const getplaylist = async (req, res) => {
    const playlistowner=req.user.name
    try {
      const playlist=await project.find({user_name:playlistowner})
      if(!playlist){
        res.status(404).json({message:"This user has no playlist"})
      }else{
        res.status(200).json(playlist)
      }
        } catch (error) {
      console.log("Error: ", error)
      res.status(400).json({error: error.message})
    }
  }


  const postplaylist = async (req, res, next) => {
    const { playlist_name, description, user_name } = req.body;
  
    console.log(playlist_name);
    console.log(description);
  
    const errors = [];
  
    if (!playlist_name || !description) {
      errors.push("All fields are required!");
    }
  
    if (errors.length > 0) {
      res.status(400).json({ error: errors });
    } else {            
          const newPlaylist = new playlist({
            project_name,
            description,
            user_name,
          });
          newPlaylist
            .save()
            .then(() => {
              res.json({
                message: "Playlist created",
              });
            })
            .catch(() => {
              errors.push("Please try again");
              res.status(400).json({ error: errors });
            });
        }
    
    };
  


    const updateplaylist = async (req, res) => {
        try {
          const { playlist_name, description } = req.body;    
          const playlistId = req.playlist.id
          const playlist = await playlist.findById(playlistId);
          console.log(playlist)
      
        if(playlist_name)
        {
          playlist.playlistname = playlist_name;
        }
      
        if(description)
        {
          playlist.description= description;
        }
           
          await playlist.save();
      
          res.json({ message: 'Playlist information updated successfully' });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      };
      


      const deleteproject = async (req, res) => {
        try {
          const playlistId = req.params.id;
          const playlistInfo = await playlist.findById(playlistId);
          console.log(playlistId);
      
          if (!playlistInfo) {
            return res.status(404).json({ error: "Playlist information not found" });
          }
      
          await playlistInfo.deleteOne({ _id: playlistId });
      
          res.json({ message: "Profile information deleted successfully" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: error.message });
        }
      };



      const postPlaylistIcon = async (req, res) => {
        try {
          if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
          }
          const photo = req.file.filename
          
          const playlistId = req.params.id;
          const playlistInfo = await project.findById(playlistId);
          console.log(playlistId)
     
          if (photo) {
            playlistInfo.icon = photo
          }
          await playlistInfo.save();
      
          res.json({ message: 'Playlist icon updated successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };


      module.exports = {
        getplaylist,
        postplaylist,
        updateplaylist,
        deleteproject,
        postPlaylistIcon
      };
      