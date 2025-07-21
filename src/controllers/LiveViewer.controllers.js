

const liverTrackData = async (req,res,next) => {
    const data = req.body;

    if (!data){
        return res.status(400).json({
            message: "data is required",
        });
    }
    try {
        console.log(data)
        res.status(200).json({
            message: "data received",
        });
    } catch (error) {
        console.log('error while recieving data')
    }
}

export default liverTrackData;