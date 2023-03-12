const handleApiCall = async (req, res) => {
    const fetch = await import('node-fetch'); // Use dynamic import to load the module
    const USER_ID = "nomankhan";
    const PAT = "16a2e33a74dd4dfb90385d0202bde6a8";
    const APP_ID = "my-first-application";
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";
    const IMAGE_URL = req.body.input;
  
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });
  
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
  
    try {
      const response = await fetch.default(
        "https://api.clarifai.com/v2/models/" +
          MODEL_ID +
          "/versions/" +
          MODEL_VERSION_ID +
          "/outputs",
        requestOptions
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(400).json('unable to work with API');
    }
  };
  
  

const handleImage = (req, res, db) => {

    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(+entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}