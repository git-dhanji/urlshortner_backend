import uploadToS3 from "../../services/uploadToS3.js";
import { generateCustomQrCode } from "../../utils/qrCodeGenerator.js";



const genAndSaveQr = async (url, shortId) => {
    const qrBuffer = await generateCustomQrCode({ url });
    const saveOnS3 = await uploadToS3(qrBuffer, shortId);
    return String(saveOnS3);
}


export default genAndSaveQr;