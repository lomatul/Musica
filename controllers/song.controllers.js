import song  from "../dataModels/Song.model.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { error } from "console";




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
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // const tempDir = path.join(__dirname, '../uploads');
    // const filePath = path.join(tempDir,  songInfo.songpath);
    // console.log(filePath);

    // fs.unlink(filePath, (err)=>{
    //     if(err){
    //         // return res.status(400).json({error:err.message});
    //         throw err
    //     }
    // });

    res.json({ message: "Song information deleted successfully" });
  } catch (error) {
    console.log(error);
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