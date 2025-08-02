import qrcode from 'qrcode'
import { AppError } from './errorHandler.utils.js'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logo = path.resolve(__dirname, '../assets/logo.png')

export const generateQrCode = async ({ url, type = 'png', width = '200', errorCorrectionLevel = 'H', Fcolor, bgColor, margin = '2' }) => {
    if (!url) throw new AppError('while generating qr code url is must', 403);
    const qrCode = qrcode.toBuffer(url, {
        type: type,
        width: width,

        color: {
            dark: Fcolor,
            light: bgColor
        },
        margin: margin,
        errorCorrectionLevel: errorCorrectionLevel,
    });
    return qrCode;
}


// Helper function to generate QR code with logo and colors
export const generateCustomQrCode = async ({ url, logoPath = "", color = '#000000', bgColor = '#FFFFFF' }) => {
    try {
        // Generate basic QR code as a buffer
        const qrCodeBuffer = await generateQrCode({ url: url, Fcolor: color, bgColor });

        // Check if logo file exists
        if (!fs.existsSync(logoPath)) {
            logoPath = logo;
        }


        // Load the logo image
        const logoBuffer = fs.readFileSync(logoPath);

        // Resize logo and composite it onto the QR code
        const qrCodeImage = sharp(qrCodeBuffer);
        const qrCodeMetadata = await qrCodeImage.metadata();

        if (!qrCodeMetadata.width) {
            throw new Error('QR code width is undefined');
        }
        const logoSize = Math.floor(qrCodeMetadata.width * 0.2); // Logo size is 20% of QR code size

        const resizedLogoBuffer = await sharp(logoBuffer)
            .resize(logoSize, logoSize, { fit: 'contain' })
            .toBuffer();

        const finalQrCodeBuffer = await qrCodeImage
            .composite([{ input: resizedLogoBuffer, gravity: 'center' }])
            .toBuffer();


        return finalQrCodeBuffer;

    } catch (error) {
        console.error('Error generating QR code with logo:', error);
        throw error;
    }
}



