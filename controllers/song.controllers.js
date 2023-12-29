import path from "path";
import bcrypt from "bcrypt";
import passport from "passport";
import song  from "../dataModels/Song.model.js";






const getsong = async (req, res) => {
  
  const songowner=req.user.name
  try {
    const project=await project.find({user_name:projectowner})
    if(!project){
      res.status(404).json({message:"This user has no project"})
    }else{
      res.status(200).json(project)
    }
      } catch (error) {
    console.log("Error: ", error)
    res.status(400).json({error: error.message})
  }
}



const getplaylist = async (req, res) => {
  
    const playlistowner=req.user.name
    try {
      const project=await project.find({user_name:projectowner})
      if(!project){
        res.status(404).json({message:"This user has no project"})
      }else{
        res.status(200).json(project)
      }
        } catch (error) {
      console.log("Error: ", error)
      res.status(400).json({error: error.message})
    }
  }

  


const postsong = async (req, res, next) => {
    const { project_name, description, user_name } = req.body;
  
    console.log(project_name);
    console.log(description);
  
    const errors = [];
  
    if (!project_name || !description) {
      errors.push("All fields are required!");
    }
  
    if (errors.length > 0) {
      res.status(400).json({ error: errors });
    } else {
 
      
         
          const newProject = new project({
            project_name,
            description,
            user_name,
          });
          newProject
            .save()
            .then(() => {
              res.json({
                message: "Project created",
              });
            })
            .catch(() => {
              errors.push("Please try again");
              res.status(400).json({ error: errors });
            });
        }
    
    };
  
  









const updateproject = async (req, res) => {
  try {
    const { project_name, description } = req.body;    
    const projectId = req.project.id
    const project = await project.findById(projectId);
    console.log(project)

  if(project_name)
  {
    project.project_name = project_name;
  }

  if(description)
  {
    project.description= description;
  }



    await project.save();

    res.json({ message: 'project information updated successfully' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};












const deleteproject = async (req, res) => {
  try {
    const projectID = req.params.id;
    const projectInfo = await project.findById(projectID);
    console.log(projectID);

    if (!projectInfo) {
      return res.status(404).json({ error: "Project information not found" });
    }

    await projectInfo.deleteOne({ _id: projectID });

    res.json({ message: "Profile information deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


const postProjectIcon = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }
    const photo = req.file.filename
    
    const projectID = req.params.id;
    const projectInfo = await project.findById(projectID);
    console.log(projectID)


    if (photo) {
      projectInfo.profile_image = photo
    }
    await projectInfo.save();

    res.json({ message: 'Profile image updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const postMultipleImages = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const photo = req.files.map((file) => file.filename);

    const projectID = req.params.id;
    const projectInfo = await project.findById(projectID);
   
    if (photo) {
      projectInfo.images = projectID.images.concat(photo);
    }
    await projectInfo.save();

    res.json({ message: 'Multiple images updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





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



const postMultipleAudios = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const audio = req.files.map((file) => file.filename);

    const projectID = req.params.id;
    const projectInfo = await project.findById(projectID);
   
    if (audio) {
      projectInfo.audios = user.audios.concat(audio);
    }
    await projectInfo.save();

    res.json({ message: 'Multiple audios updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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



