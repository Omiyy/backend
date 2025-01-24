const asyncHandler = (func)=>async (req,res,next)=>{
    try{
           const result =await func(req,res,next);
          

    }catch(err){
            res.status(err.code || 500).json({
                success : false,
                message: err.message
            })

    }

}

module.exports = asyncHandler;