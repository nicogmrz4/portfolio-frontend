export function fileToBase64(file: File): FileReader {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return reader;
}