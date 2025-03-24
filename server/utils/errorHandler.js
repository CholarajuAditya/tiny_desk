const errorHandler = (err,req,res,next) => {
    res.status(500).json({message: err.message})
    console.log(err.message);
}

export {errorHandler}