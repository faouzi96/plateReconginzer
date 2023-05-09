export async function image_to_base64(file: any) {
    return await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.onerror = (error) => {
            console.log(error)
        };
        fileReader.readAsDataURL(file);
    });
}