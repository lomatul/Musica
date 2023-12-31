import Playlist from "../dataModels/Playlist.model.js";



export const getplaylist = async (req, res) => {
    const playlistowner=req.params.id;
    if(!playlistowner){
      return res.status(400).json({Error:"You are not Logged in. Login first"});
    }
    try {
      const playlist=await Playlist.find({user:playlistowner})
      if(!playlist){
        return res.status(404).json({message:"This user has no playlist"})
      }else{
        return res.status(200).json(playlist)
      }
        } catch (error) {
      console.log("Error: ", error)
      res.status(400).json({error: error.message})
    }
  }



  export const playlistsongs = async (req, res) => {
    const playlistid=req.params.id;
    if(!playlistid){
      return res.status(400).json({Error:"Playlist id not provided"});
    }
    try {
      const playlist =await Playlist.findById(playlistid)
      if(!playlist){
        return res.status(404).json({message:"playlist not found"})
      }else{
        const songs = playlist.songs;
        return res.status(200).json(songs);
      }
        } catch (error) {
      console.log("Error: ", error)
      res.status(400).json({error: error.message})
    }
  }




export  const postplaylist = async (req, res) => {
    const { playlistname, description } = req.body;
    const user=req.user.id;
    console.log(playlistname);
    console.log(description);
    console.log(user);
    const errors = [];
  
    if (!playlistname || !description) {
      errors.push("All fields are required!");
    }
    if(!user){
      return res.status(400).json({Error:"You are not Logged in. Login first"});
    }
  
    if (errors.length > 0) {
      res.status(400).json({ error: errors });
    } else {            
          const newPlaylist = new Playlist({
            playlistname,
            description,
            user,
            
          });
          newPlaylist
            .save()
            .then(() => {
              res.status(200).json({
                message: "Playlist created",
              });
            })
            .catch(() => {
              errors.push("Please try again");
              res.status(400).json({ error: errors });
            });
        }
    
    };
  


export const updateplaylist = async (req, res) => {
        try {
          const { playlistname, description } = req.body;    
          const playlistId = req.params.id
          const playlist = await Playlist.findById(playlistId);
          console.log(playlist)
          if(!playlist){
            return res.status(404).json({message:"No such playlist found"})
          }      
        if(playlistname)
        {
          playlist.playlistname = playlistname;
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
      


      export  const deleteplaylist = async (req, res) => {
        try {
          const playlistId = req.params.id;
          const playlistInfo = await Playlist.findById(playlistId);
          console.log(playlistId);
      
          if (!playlistInfo) {
            return res.status(404).json({ error: "Playlist information not found" });
          }
      
          await playlistInfo.deleteOne({ _id: playlistId });
      
          res.json({ message: "Playlist deleted successfully" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: error.message });
        }
      };



      export   const postPlaylistIcon = async (req, res) => {
        try {
          if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
          }
          const photo = req.file.filename
          
          const playlistId = req.params.id;
          const playlistInfo = await Playlist.findById(playlistId);
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



export const addsongtoplaylist = async(req, res) => {
  try{
    const playlistId = req.params.id;
    console.log("playlist", playlistId);
    const {Songs} = req.body;
    const playlistInfo = await Playlist.findById(playlistId);
    if (!playlistInfo) {
      return res.status(404).json({ error: "Playlist information not found" });
    }
    if(!playlistInfo.user==req.user.id){
      return res.status(404).json({ error: "Wrong Author" });
  }
    if (Array.isArray(Songs)) {
      const uniqueSongs = Songs.filter(song => !playlistInfo.songs.includes(song));
      playlistInfo.songs.push(...uniqueSongs);
    } else {
      if(playlistInfo.songs.includes(Songs)){
        return res.status(404).json({ error: "This song is already in your playlist" });
      }playlistInfo.songs.push(Songs)
    }
    await playlistInfo.save();
    return res.status(200).json({ message:"Songs added succesfully", Playlist:playlistInfo });
  }catch(error){
    console.log(error);
    res.status(400).json({error:error.message});
  }

}


export const removesong = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const { Songs } = req.body;
    const playlistInfo = await Playlist.findById(playlistId);

    if (!playlistInfo) {
      return res.status(404).json({ error: "Playlist information not found" });
    }

    if (!playlistInfo.user == req.user.id) {
      return res.status(404).json({ error: "Wrong Author" });
    }

    if (Array.isArray(Songs)) {
      const updatedSongs = playlistInfo.songs.filter(song => !Songs.includes(song));
      playlistInfo.songs = updatedSongs;
    } else {
      if (playlistInfo.songs.includes(Songs)) {
        playlistInfo.songs = playlistInfo.songs.filter(song => song !== Songs);
      } else {
        return res.status(404).json({ error: "This song is not in your playlist" });
      }
    }

    await playlistInfo.save();
    return res.status(200).json({ message: "Songs removed successfully", Playlist: playlistInfo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const searchResult = async (req, res) => {
  try{
      const query= req.query.data

      const result = await Playlist.find({$text : {$search: query}}).sort({score: { $meta: "textScore" }}).limit(20);

      if(result.length===0){
          return res.status(200).json({message:"No resluts found"});
      }
  
      return res.status(200).json({Result: result});
  }catch(error){
      console.log(error);
      res.status(400).json({error:error.message});
  }

}