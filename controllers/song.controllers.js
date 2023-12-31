import song  from "../dataModels/Song.model.js";





export const getsong = async (req, res) => {
  
  const songowner=req.user.name
  try {
    const song=await song.find({user_name:songowner})
    if(!song){
      res.status(404).json({message:"This user has no project"})
    }else{
      res.status(200).json(song)
    }
      } catch (error) {
    console.log("Error: ", error)
    res.status(400).json({error: error.message})
  }
}




export const postSongFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }
   const audio = req.file.filename
   const {  songname, artistname, genre } = req.body;

   const newSong = new song({
    songname,
    artistname,
    genre,
    songpath:audio,
  });
  
  await newSong.save();

    res.status(200).json({ message: 'Audio updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updatesong = async (req, res) => {
  try {
    const { songname, artistname, genre } = req.body;
    const songId = req.params.id;

    // Rename the constant variable to avoid naming conflict
    const foundSong = await song.findById(songId);

    if (!foundSong) {
      return res.status(404).json({ msg: 'Song not found' });
    }

    if (songname) {
      foundSong.songname = songname;
    }

    if (artistname) {
      foundSong.artistname = artistname;
    }

    if (genre) {
      foundSong.genre = genre;
    }

    await foundSong.save();

    res.status(200).json({ message: 'Song information updated successfully' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};















export const deletesong = async (req, res) => {
  try {
    const songID = req.params.id;
    const songInfo = await song.findById(songID);
    console.log(songID);

    if (!songInfo) {
      return res.status(404).json({ error: "Song information not found" });
    }

    await songInfo.deleteOne({ _id: songID });

    res.json({ message: "Song information deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};




// export const postMultipleSongs = async (req, res) => {
//   try {
//     if (!req.files) {
//       return res.status(400).json({ message: 'No file provided' });
//     }

//     const song = req.files.map((file) => file.filename);
//     const songID = req.params.id;
//     const songInfo = await Song.findById(songID);
   
//     if (song) {
//       songInfo.images = songID.images.concat(photo);
//     }
//     await songInfo.save();

//     res.json({ message: 'Multiple images updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };







// const postMultipleAudios = async (req, res) => {
//   try {
//     if (!req.files) {
//       return res.status(400).json({ message: 'No file provided' });
//     }

//     const audio = req.files.map((file) => file.filename);
//     const songID = req.params.id;
//     const songInfo = await Song.findById(songID);
       
//     if (audio) {
//       songInfo.audios = user.audios.concat(audio);
//     }
//     await songInfo.save();

//     res.json({ message: 'Multiple audios updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const getMultipleAudios = async (req, res) => {
  try {

    const projectID = req.params.id;
    const projectInfo = await project.findById(projectID);
    const audios= projectInfo.audios

    res.json({ audios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





export const searchResult = async (req, res) => {
  try{
      const query= req.query.data

      const result = await song.find({$text : {$search: query}}).sort({score: { $meta: "textScore" }}).limit(20);

      if(result.length===0){
          return res.status(200).json({message:"No resluts found"});
      }
  
      return res.status(200).json({Result: result});
  }catch(error){
      console.log(error);
      res.status(400).json({error:error.message});
  }

}

export const searchbyartist = async (req, res) => {
  try{
      const artist= req.query.data

      const result = await song.find({artistname:artist});

      if(result.length===0){
          return res.status(200).json({message:"No resluts found"});
      }
  
      return res.status(200).json({Result: result});
  }catch(error){
      console.log(error);
      res.status(400).json({error:error.message});
  }

}