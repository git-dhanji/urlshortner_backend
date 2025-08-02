
import genAndSaveQr from "../features/genqrcode/geneAndSaveQr.js";

const testController = async (req, res) => {
    try {
        const { url, shortId } = req.body;
        const finalQr = await genAndSaveQr(url, shortId)
        return finalQr
    } catch (error) {
        throw new Error(error)
    }
}


export default testController;