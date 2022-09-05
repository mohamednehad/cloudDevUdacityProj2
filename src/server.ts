import express, {Router, Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests

// Code start >>>>

  app.use(bodyParser.json());
  app.get('/filteredimage',async(req: Request,res: Response) => {
    const image_url = req.query.image_url.toString();
    if (!image_url){
      res.status(400).send("The URL provided for the image is needed/corrupted");
    }

    const filtered_image=await filterImageFromURL(image_url);
    res.status(200).sendFile(filtered_image, () => {
      console.log(filtered_image);
      deleteLocalFiles([filtered_image]);
    })
  });
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query >> implemented at line 17
  //    2. call filterImageFromURL(image_url) to filter the image >>  implemented at line 21
  //    3. send the resulting file in the response >> implemented in line 22
  //    4. deletes any files on the server on finish of the response >> implemented in line 24
  // QUERY PARAMATERS
  //    image_url: https://img.youm7.com/large/20220808120649649.jpg
  //    EB endpoint URL >> http://clouddevudacityproj2-dev2.us-east-1.elasticbeanstalk.com
  //    
  //
  //    Test EB URL with the image >> http://clouddevudacityproj2-dev2.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://img.youm7.com/large/20220808120649649.jpg
  //
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1



  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();