import ImagePicker from 'react-native-image-picker';



// Function to get select an Image
export async function selectImage() {

    const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    
    ImagePicker.showImagePicker(options, (response) => {

        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const uri = response.uri;
          this.setState({
            selectedPictureUri: uri,
          });
          return uri
        }
        return -1
    });
}

// Function to upload an image
export async function uploadImage(imageName, uploadUri) {

    // const {imageName, uploadUri} = this.state;
    firebase
      .storage()
      .ref(imageName)
      .putFile(uploadUri)
      .then((snapshot) => {
        //You can check the image is now uploaded in the storage bucket
        console.log(`${imageName} has been successfully uploaded.`);
      })
      .catch((e) => console.log('uploading image error => ', e));
}

// Function to retrieve an image
export async function retrieveImage(imageName) {

    try {    // const {imageName} = this.state;
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
            .getDownloadURL()
            .then((url) => {
            //from url you can fetched the uploaded image easily
            this.setState({profileImageUrl: url});
        })
    } catch(e) {
        placeholder = 'gs://friends-of-the-urban-ff.appspot.com/placeholder.jpg'
        console.log('getting downloadURL of image error => ', e)
        this.setState({profileImageUrl: placeholder});
    }
}

// Function to delete an image
export async function deleteImage(imageName) {

    // const {imageName} = this.state;
    let imageRef = firebase.storage().ref('/' + imageName);
    imageRef
    .delete()
    .then(() => {
        console.log(`${imageName}has been deleted successfully.`);
    })
    .catch((e) => console.log('error on image deletion => ', e));
}
  

